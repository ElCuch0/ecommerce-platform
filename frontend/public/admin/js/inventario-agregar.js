(function () {
  var form = document.getElementById("addProductForm");
  var dropzone = document.getElementById("addDropzone");
  var fileInput = document.getElementById("addFiles");
  var fileList = document.getElementById("addFileList");
  var toggleWarehouse = document.getElementById("addToggleWarehouse");
  var stockGroup = document.getElementById("addStockGroup");
  var stockInput = document.getElementById("addStock");

  if (!form || typeof getAdminInventory !== "function") return;

  var stagedFiles = [];

  function syncWarehouseUi() {
    if (!stockGroup || !toggleWarehouse) return;
    stockGroup.style.display = toggleWarehouse.checked ? "block" : "none";
    if (stockInput) stockInput.disabled = !toggleWarehouse.checked;
  }

  if (toggleWarehouse) {
    toggleWarehouse.addEventListener("change", syncWarehouseUi);
    syncWarehouseUi();
  }

  function renderFileList() {
    if (!fileList) return;
    fileList.innerHTML = "";
    stagedFiles.forEach(function (entry, index) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(entry.name));
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Quitar " + entry.name);
      btn.innerHTML =
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6"/></svg>';
      btn.addEventListener("click", function () {
        stagedFiles.splice(index, 1);
        renderFileList();
      });
      li.appendChild(btn);
      fileList.appendChild(li);
    });
  }

  function addFilesFromList(list) {
    for (var i = 0; i < list.length; i++) {
      stagedFiles.push({ name: list[i].name });
    }
    renderFileList();
  }

  if (dropzone && fileInput) {
    dropzone.addEventListener("click", function () {
      fileInput.click();
    });
    dropzone.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        fileInput.click();
      }
    });
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files.length) addFilesFromList(fileInput.files);
      fileInput.value = "";
    });
    ["dragenter", "dragover"].forEach(function (ev) {
      dropzone.addEventListener(ev, function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    });
    dropzone.addEventListener("drop", function (e) {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files) addFilesFromList(e.dataTransfer.files);
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("addName");
    var category = document.getElementById("addCategory");
    var desc = document.getElementById("addDesc");
    var price = document.getElementById("addPrice");
    var catalog = document.getElementById("addCatalog");
    var hidden = document.getElementById("addHidden");

    if (!name || !category || !price) return;
    if (!name.value.trim() || !category.value) {
      alert("Completa nombre y categoría.");
      return;
    }
    var priceNum = parseInt(price.value, 10);
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Indica un precio válido.");
      return;
    }

    var stockNum = 0;
    if (toggleWarehouse && toggleWarehouse.checked && stockInput) {
      stockNum = parseInt(stockInput.value, 10);
      if (isNaN(stockNum) || stockNum < 0) stockNum = 0;
    }

    var id = nextAdminInventoryId();
    var sku = "ER-" + String(id).padStart(3, "0");
    var rows = getAdminInventory();
    rows.push({
      id: id,
      sku: sku,
      name: name.value.trim(),
      category: category.value,
      description: desc ? desc.value.trim() : "",
      price: priceNum,
      stock: stockNum,
      catalog: catalog ? !!catalog.checked : true,
      hidden: hidden ? !!hidden.checked : false
    });
    setAdminInventory(rows);
    window.location.href = "inventario.html";
  });
})();
