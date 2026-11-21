/* Social integration: YouTube Shorts (click-to-play) and Facebook Page feed.
   Shared by index.html and gallery.html. No tracking scripts load until a visitor clicks a video. */
(function () {
  var LINKS = {
    facebook: "https://www.facebook.com/profile.php?id=61582908533946",
    youtube: "https://www.youtube.com/@d_d_coastal_calm",
    youtubeShorts: "https://www.youtube.com/@d_d_coastal_calm/shorts",
    booking: "https://letsbook.me/booking/ddcoastalcalmresort"
  };

  // TODO: replace each "TODO_..." id with the real YouTube video id after the Shorts are uploaded.
  // Until then, clicking a card opens the YouTube channel's Shorts tab instead of playing inline.
  var SHORTS = [
    { id: "TODO_YT_ID_SUNSET",    title: "Sunset moments at the infinity pool", poster: "assets/videos/shorts/02_sunset_moments.webp" },
    { id: "TODO_YT_ID_LOUNGE",    title: "Tour of our lounge, restaurant and bar", poster: "assets/videos/shorts/01_lounge_restaurant_bar_tour.webp" },
    { id: "TODO_YT_ID_JACUZZI",   title: "Our oceanview jacuzzi and pool at dusk", poster: "assets/videos/shorts/04_jacuzzi_and_pool.webp" },
    { id: "TODO_YT_ID_GOODVIBES", title: "Good vibes and happy faces with our team", poster: "assets/videos/shorts/05_good_vibes_happy_faces.webp" },
    { id: "TODO_YT_ID_CHRISTMAS", title: "Christmas lights at the resort", poster: "assets/videos/shorts/03_christmas_lights.webp" }
  ];

  function isPlaceholder(id) { return !id || id.indexOf("TODO") === 0; }

  function renderShorts(container) {
    var limit = parseInt(container.getAttribute("data-limit") || "0", 10) || SHORTS.length;
    SHORTS.slice(0, limit).forEach(function (s) {
      var fig = document.createElement("figure");
      fig.className = "short-card";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "short-facade";
      btn.setAttribute("aria-label", "Play video: " + s.title);
      btn.innerHTML = '<img src="' + s.poster + '" alt="" loading="lazy" decoding="async" width="540" height="960" />' +
        '<span class="short-play" aria-hidden="true"></span>';
      btn.addEventListener("click", function () {
        if (isPlaceholder(s.id)) { window.open(LINKS.youtubeShorts, "_blank", "noopener"); return; }
        var wrap = document.createElement("div");
        wrap.className = "short-frame";
        wrap.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(s.id) +
          '?autoplay=1&rel=0&playsinline=1" title="' + s.title.replace(/"/g, "&quot;") +
          '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ' +
          'referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
        btn.replaceWith(wrap);
      });
      var cap = document.createElement("figcaption");
      var link = isPlaceholder(s.id) ? LINKS.youtubeShorts : "https://www.youtube.com/shorts/" + encodeURIComponent(s.id);
      cap.innerHTML = s.title + ' · <a href="' + link + '" target="_blank" rel="noopener">Watch on YouTube</a>';
      fig.appendChild(btn);
      fig.appendChild(cap);
      container.appendChild(fig);
    });
  }

  function renderFacebookFeed(container) {
    var width = Math.max(180, Math.min(500, Math.floor(container.clientWidth || 340)));
    var height = parseInt(container.getAttribute("data-height") || "640", 10);
    var src = "https://www.facebook.com/plugins/page.php?href=" + encodeURIComponent(LINKS.facebook) +
      "&tabs=timeline&width=" + width + "&height=" + height +
      "&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false";
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "D&D Coastal Calm Resort on Facebook";
    iframe.width = width;
    iframe.height = height;
    iframe.loading = "lazy";
    iframe.setAttribute("scrolling", "no");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share");
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    container.insertBefore(iframe, container.firstChild);
  }

  document.querySelectorAll("[data-shorts-grid]").forEach(renderShorts);
  document.querySelectorAll("[data-fb-feed]").forEach(renderFacebookFeed);
})();
