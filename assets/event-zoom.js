(function () {
  var posters = document.querySelectorAll(".event-logo");
  if (!posters.length) return;

  var css = document.createElement("style");
  css.textContent =
    ".event-card .event-layout, .card > .event-layout { grid-template-columns: minmax(240px, 1fr) minmax(380px, 1.3fr); align-items: start; }" +
    ".event-logo { max-width: 720px !important; width: 100%; cursor: zoom-in; box-shadow: 0 8px 24px rgba(25,67,94,0.16); }" +
    "@media (max-width: 720px) { .event-logo { max-width: 100% !important; } }" +
    "#event-zoom[hidden] { display: none; }" +
    "#event-zoom { position: fixed; inset: 0; z-index: 200; background: rgba(10,22,34,0.94); display: flex; align-items: center; justify-content: center; padding: 1.25rem; cursor: zoom-out; }" +
    "#event-zoom img { max-width: 96vw; max-height: 96vh; width: auto; height: auto; border-radius: 8px; box-shadow: 0 12px 40px rgba(0,0,0,0.45); }" +
    "#event-zoom button { position: absolute; top: 12px; right: 16px; background: #fff; color: #153047; border: 0; width: 2.4rem; height: 2.4rem; border-radius: 999px; font-size: 1.6rem; line-height: 1; cursor: pointer; }";
  document.head.appendChild(css);

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
