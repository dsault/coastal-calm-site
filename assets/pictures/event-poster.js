(function () {
  var parts = window.__EVENT_POSTER_PARTS || [];
  if (!parts.length) return;
  var src = "data:image/jpeg;base64," + parts.join("");
  document.querySelectorAll("img[data-event-poster]").forEach(function (img) {
    img.src = src;
  });
})();
