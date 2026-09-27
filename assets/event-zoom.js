(function () {
  var posters = document.querySelectorAll(".event-logo");
  if (!posters.length) return;

  var zoom = document.createElement("div");
  zoom.id = "event-zoom";
  zoom.hidden = true;
  zoom.innerHTML = '<button type="button" id="event-zoom-close" aria-label="Close">\u00d7</button><img id="event-zoom-img" alt="" />';
  document.body.appendChild(zoom);
  var img = document.getElementById("event-zoom-img");

  function openZoom(el) {
    img.src = el.currentSrc || el.src;
    img.alt = el.alt || "Event poster";
    zoom.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeZoom() {
    zoom.hidden = true;
    document.body.style.overflow = "";
  }

  posters.forEach(function (el) {
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("title", "Tap to enlarge");
    el.addEventListener("click", function () { openZoom(el); });
    el.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openZoom(el);
      }
    });
  });
  document.getElementById("event-zoom-close").onclick = closeZoom;
  zoom.addEventListener("click", function (e) { if (e.target === zoom) closeZoom(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeZoom(); });
})();
