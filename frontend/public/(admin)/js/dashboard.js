(function () {
  var app = document.getElementById("dashApp");
  var menuBtn = document.getElementById("dashMenuBtn");
  var overlay = document.getElementById("dashOverlay");
  var sidebar = document.getElementById("dashSidebar");

  if (!app || !menuBtn || !overlay) return;

  function setOpen(open) {
    app.classList.toggle("sidebar-open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  }

  menuBtn.addEventListener("click", function () {
    setOpen(!app.classList.contains("sidebar-open"));
  });

  overlay.addEventListener("click", function () {
    setOpen(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  if (sidebar) {
    sidebar.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 768px)").matches) setOpen(false);
      });
    });
  }
})();
