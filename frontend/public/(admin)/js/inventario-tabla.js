(function () {
  var tbody = document.getElementById("invTableBody");
  var search = document.getElementById("invSearch");
  var countEl = document.getElementById("invCount");
  if (!tbody || typeof getAdminInventory !== "function") return;

  function statusBadges(row) {
    var parts = [];
    if (row.hidden) parts.push('<span class="dash-badge dash-badge--muted">Oculto</span>');
    else parts.push('<span class="dash-badge dash-badge--ok">Visible</span>');
    if (!row.catalog) parts.push(' <span class="dash-badge dash-badge--pending">Fuera de catálogo</span>');
    if (row.stock <= 5) parts.push(' <span class="dash-badge dash-badge--warn">Stock bajo</span>');
    return parts.join(" ");
  }

  function rowMatches(row, q) {
    if (!q) return true;
    var s = q.toLowerCase();
    return (
      String(row.sku).toLowerCase().indexOf(s) !== -1 ||
      String(row.name).toLowerCase().indexOf(s) !== -1 ||
      String(row.category).toLowerCase().indexOf(s) !== -1 ||
      String(categoryLabel(row.category)).toLowerCase().indexOf(s) !== -1
    );
  }

  function render() {
    var q = search ? search.value.trim() : "";
    var rows = getAdminInventory().filter(function (r) {
      return rowMatches(r, q);
    });
    tbody.innerHTML = "";
    if (countEl) countEl.textContent = rows.length + (rows.length === 1 ? " producto" : " productos");

    if (rows.length === 0) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td colspan="7" style="color: var(--dash-muted); font-size: 0.9rem;">No hay productos que coincidan.</td>';
      tbody.appendChild(tr);
      return;
    }

    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        escapeHtml(row.sku) +
        "</td><td>" +
        escapeHtml(row.name) +
        "</td><td>" +
        escapeHtml(categoryLabel(row.category)) +
        "</td><td>" +
        escapeHtml(formatCOP(row.price)) +
        "</td><td>" +
        escapeHtml(String(row.stock)) +
        '</td><td style="white-space: normal;">' +
        statusBadges(row) +
        '</td><td class="dash-table__actions">' +
        '<a href="inventario-actualizar.html?id=' +
        encodeURIComponent(row.id) +
        '">Editar</a> ' +
        '<a href="inventario-eliminar.html">Eliminar</a>' +
        "</td>";
      tbody.appendChild(tr);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  if (search) {
    search.addEventListener("input", function () {
      render();
    });
  }

  render();
})();
