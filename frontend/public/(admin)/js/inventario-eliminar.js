(function () {
  var tbody = document.getElementById("delTableBody");
  var search = document.getElementById("delSearch");
  var master = document.getElementById("delMaster");
  var bulkBtn = document.getElementById("delBulkBtn");
  var countEl = document.getElementById("delSelectedCount");
  var btnAll = document.getElementById("delSelectAll");
  var btnClear = document.getElementById("delClearSel");

  if (!tbody || typeof getAdminInventory !== "function") return;

  var selected = {};

  function visibleRows() {
    var q = search ? search.value.trim().toLowerCase() : "";
    return getAdminInventory().filter(function (r) {
      if (!q) return true;
      return (
        String(r.sku).toLowerCase().indexOf(q) !== -1 ||
        String(r.name).toLowerCase().indexOf(q) !== -1
      );
    });
  }

  function selectedCount() {
    var n = 0;
    for (var k in selected) {
      if (selected[k]) n++;
    }
    return n;
  }

  function syncBulkUi() {
    var n = selectedCount();
    if (countEl) countEl.textContent = n + (n === 1 ? " seleccionado" : " seleccionados");
    if (bulkBtn) bulkBtn.disabled = n === 0;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render() {
    var rows = visibleRows();
    tbody.innerHTML = "";
    var visIds = rows.map(function (r) {
      return r.id;
    });

    if (rows.length === 0) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td colspan="5" style="color: var(--dash-muted); font-size: 0.9rem;">No hay productos que coincidan.</td>';
      tbody.appendChild(tr);
      if (master) master.checked = false;
      if (master) master.disabled = true;
      syncBulkUi();
      return;
    }
    if (master) master.disabled = false;

    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      var checked = !!selected[row.id];
      tr.innerHTML =
        '<td><input type="checkbox" class="del-row-cb" data-id="' +
        row.id +
        '" ' +
        (checked ? "checked" : "") +
        '></td><td>' +
        escapeHtml(row.sku) +
        "</td><td>" +
        escapeHtml(row.name) +
        "</td><td>" +
        escapeHtml(categoryLabel(row.category)) +
        "</td><td>" +
        escapeHtml(String(row.stock)) +
        "</td>";
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll(".del-row-cb").forEach(function (cb) {
      cb.addEventListener("change", function () {
        var id = parseInt(cb.getAttribute("data-id"), 10);
        selected[id] = cb.checked;
        if (!cb.checked && master) master.checked = false;
        syncMasterState(visIds);
        syncBulkUi();
      });
    });

    syncMasterState(visIds);
    syncBulkUi();
  }

  function syncMasterState(visIds) {
    if (!master) return;
    var allOn =
      visIds.length > 0 &&
      visIds.every(function (id) {
        return selected[id];
      });
    master.checked = allOn;
  }

  if (master) {
    master.addEventListener("change", function () {
      var rows = visibleRows();
      rows.forEach(function (r) {
        selected[r.id] = master.checked;
      });
      render();
    });
  }

  if (search) {
    search.addEventListener("input", function () {
      render();
    });
  }

  if (btnAll) {
    btnAll.addEventListener("click", function () {
      visibleRows().forEach(function (r) {
        selected[r.id] = true;
      });
      render();
    });
  }

  if (btnClear) {
    btnClear.addEventListener("click", function () {
      selected = {};
      render();
    });
  }

  if (bulkBtn) {
    bulkBtn.addEventListener("click", function () {
      var ids = Object.keys(selected)
        .filter(function (k) {
          return selected[k];
        })
        .map(function (k) {
          return parseInt(k, 10);
        });
      if (ids.length === 0) return;
      var msg =
        "¿Eliminar " +
        ids.length +
        (ids.length === 1 ? " producto" : " productos") +
        " del inventario de sesión?";
      if (!window.confirm(msg)) return;
      var rows = getAdminInventory().filter(function (r) {
        return ids.indexOf(r.id) === -1;
      });
      setAdminInventory(rows);
      selected = {};
      window.location.href = "inventario.html";
    });
  }

  render();
})();
