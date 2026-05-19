(function () {
  var KEY = "er_admin_inventory_v1";

  var DEFAULT = [
    { id: 1, sku: "ER-001", name: "Camisa Casual Azul", category: "camisas", description: "Camisa de algodón con diseño moderno.", price: 45000, stock: 15, catalog: true, hidden: false },
    { id: 2, sku: "ER-002", name: "Pantalón Jean Clásico", category: "pantalones", description: "Jean de corte recto y resistente.", price: 89000, stock: 20, catalog: true, hidden: false },
    { id: 3, sku: "ER-003", name: "Vestido Floral Verano", category: "vestidos", description: "Vestido ligero para días soleados.", price: 120000, stock: 10, catalog: true, hidden: false },
    { id: 4, sku: "ER-004", name: "Zapatillas Deportivas", category: "zapatos", description: "Cómodas para actividades diarias.", price: 150000, stock: 25, catalog: true, hidden: false },
    { id: 5, sku: "ER-005", name: "Camisa Formal Blanca", category: "camisas", description: "Camisa elegante para ocasiones formales.", price: 65000, stock: 12, catalog: false, hidden: false },
    { id: 6, sku: "ER-006", name: "Pantalón Chino Beige", category: "pantalones", description: "Versátil para look casual o semiformal.", price: 75000, stock: 18, catalog: true, hidden: false },
    { id: 7, sku: "ER-007", name: "Vestido Cóctel Negro", category: "vestidos", description: "Corte entallado para eventos nocturnos.", price: 195000, stock: 6, catalog: true, hidden: true }
  ];

  function read() {
    try {
      var raw = sessionStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return null;
  }

  window.getAdminInventory = function () {
    var data = read();
    if (!data || !Array.isArray(data)) {
      data = DEFAULT.map(function (row) {
        return Object.assign({}, row);
      });
      sessionStorage.setItem(KEY, JSON.stringify(data));
    }
    return data;
  };

  window.setAdminInventory = function (arr) {
    sessionStorage.setItem(KEY, JSON.stringify(arr));
  };

  window.nextAdminInventoryId = function () {
    var rows = window.getAdminInventory();
    var max = 0;
    for (var i = 0; i < rows.length; i++) {
      if (rows[i].id > max) max = rows[i].id;
    }
    return max + 1;
  };

  window.formatCOP = function (n) {
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
  };

  window.categoryLabel = function (slug) {
    var map = {
      camisas: "Camisas",
      pantalones: "Pantalones",
      vestidos: "Vestidos",
      zapatos: "Zapatos",
      accesorios: "Accesorios"
    };
    return map[slug] || slug;
  };
})();
