(function () {
  var select = document.getElementById("updSelect");
  var form = document.getElementById("updProductForm");
  if (!select || !form || typeof getAdminInventory !== "function") return;

  var sku = document.getElementById("updSku");
  var name = document.getElementById("updName");
  var category = document.getElementById("updCategory");
  var desc = document.getElementById("updDesc");
  var price = document.getElementById("updPrice");
  var stock = document.getElementById("updStock");
  var catalog = document.getElementById("updCatalog");
  var hidden = document.getElementById("updHidden");

  function fillOptions() {
    var rows = getAdminInventory();
    select.innerHTML = "";
    if (rows.length === 0) {
      var opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No hay productos";
      select.appendChild(opt);
      form.querySelectorAll("input, select, textarea, button").forEach(function (el) {
        if (el !== select && el.type !== "submit") el.disabled = true;
      });
      var submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      return;
    }
    rows.forEach(function (r) {
      var o = document.createElement("option");
      o.value = String(r.id);
      o.textContent = r.sku + " — " + r.name;
      select.appendChild(o);
    });
  }

  function loadSelected() {
    var id = parseInt(select.value, 10);
    var rows = getAdminInventory();
    var row = null;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        row = rows[i];
        break;
      }
    }
    if (!row) return;
    if (sku) sku.value = row.sku;
    if (name) name.value = row.name;
    if (category) category.value = row.category;
    if (desc) desc.value = row.description || "";
    if (price) price.value = String(row.price);
    if (stock) stock.value = String(row.stock);
    if (catalog) catalog.checked = !!row.catalog;
    if (hidden) hidden.checked = !!row.hidden;
  }

  function applyQueryId() {
    var params = new URLSearchParams(window.location.search);
    var raw = params.get("id");
    if (raw === null || raw === "") return;
    var num = parseInt(raw, 10);
    if (isNaN(num)) return;
    if (select.querySelector('option[value="' + num + '"]')) {
      select.value = String(num);
      loadSelected();
    }
  }

  fillOptions();
  loadSelected();
  applyQueryId();

  select.addEventListener("change", loadSelected);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var id = parseInt(select.value, 10);
    if (isNaN(id)) return;
    var rows = getAdminInventory();
    var idx = -1;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id === id) {
        idx = i;
        break;
      }
    }
    if (idx === -1) return;

    var priceNum = parseInt(price && price.value, 10);
    var stockNum = parseInt(stock && stock.value, 10);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Indica un precio válido.");
      return;
    }
    if (isNaN(stockNum) || stockNum < 0) stockNum = 0;

    rows[idx] = Object.assign({}, rows[idx], {
      name: name ? name.value.trim() : rows[idx].name,
      category: category ? category.value : rows[idx].category,
      description: desc ? desc.value.trim() : "",
      price: priceNum,
      stock: stockNum,
      catalog: catalog ? !!catalog.checked : rows[idx].catalog,
      hidden: hidden ? !!hidden.checked : rows[idx].hidden
    });
    setAdminInventory(rows);
    alert("Cambios guardados (solo en esta sesión del navegador).");
  });
})();
