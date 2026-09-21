document.getElementById("year").textContent = new Date().getFullYear();
const foodImages = [
  { src: "assets/gallery/77f6562d-9c1e-4b44-a29b-41f0f42cc156.jpg", caption: "Grilled steak with mashed potato and fresh salad" },
  { src: "assets/gallery/ea127f2b-21a8-48b5-99b6-c63e3c2670cb.jpg", caption: "D&D Special Pizza – loaded with toppings" },
  { src: "assets/gallery/3a6ba756-8d3b-4aa4-99f0-14fb407df770.jpg", caption: "Hawaiian pizza – ham, pineapple & melted cheese" },
  { src: "assets/gallery/76649d57-a12e-4f69-9b7a-3410c7950117.jpg", caption: "Breaded porkchop with potato wedges and salad" },
  { src: "assets/gallery/d8b1f814-5d0b-4c64-8b1a-d5d9a2a2230a.jpg", caption: "Crispy breaded chicken with fries and salad" },
  { src: "assets/gallery/17d22207-f941-4db6-931d-7f057a96ebc9.jpg", caption: "Spaghetti in rich tomato sauce with cherry tomatoes" },
  { src: "assets/gallery/83a3ad32-b88c-4e0a-951d-fdb7b25ef6ef.jpg", caption: "Aglio e olio – garlic, chili & herbs" },
  { src: "assets/gallery/4b53a93b-9a97-48e9-ba10-9b5d5d63c9b7.jpg", caption: "Breakfast – omelet, bacon and fresh apple" },
  { src: "assets/gallery/20429669-bc8d-463a-b726-5412b0cfb4a3.jpg", caption: "Fresh mango shakes – a local favorite" }
];
const foodGrid = document.getElementById("food-photos");
foodImages.forEach((item, index) => {
  const img = document.createElement("img");
  img.src = item.src; img.alt = item.caption; img.loading = "lazy"; img.style.cursor = "pointer";
  img.addEventListener("click", () => openLightbox(index)); foodGrid.appendChild(img);
});
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
let currentIndex = 0;
function openLightbox(index) { currentIndex = index; updateLightbox(); lightbox.classList.add("open"); document.body.style.overflow = "hidden"; }
function closeLightbox() { lightbox.classList.remove("open"); document.body.style.overflow = ""; }
function updateLightbox() { const item = foodImages[currentIndex]; lightboxImage.src = item.src; lightboxImage.alt = item.caption; lightboxCaption.textContent = item.caption; }
function showPrev() { currentIndex = (currentIndex - 1 + foodImages.length) % foodImages.length; updateLightbox(); }
function showNext() { currentIndex = (currentIndex + 1) % foodImages.length; updateLightbox(); }
document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-prev").addEventListener("click", showPrev);
document.getElementById("lightbox-next").addEventListener("click", showNext);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
});
function toggleHeroSound() {
  const video = document.getElementById("heroVideo");
  const icon = document.getElementById("soundIcon");
  if (video.muted) { video.muted = false; icon.textContent = "\uD83D\uDD0A"; }
  else { video.muted = true; icon.textContent = "\uD83D\uDD07"; }
}
const commentsList = document.getElementById("comments-list");
const commentForm = document.getElementById("comment-form");
const commentThanks = document.getElementById("comment-thanks");
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
function addCommentCard(name, from, text) {
  const article = document.createElement("article");
  article.className = "comment-card";
  article.innerHTML =
    '<div class="comment-stars" aria-label="Guest comment">\u2605\u2605\u2605\u2605\u2605</div>' +
    "<p>\u201C" + escapeHtml(text) + "\u201D</p>" +
    "<footer><strong>" + escapeHtml(name) + "</strong><span>" +
    (from ? escapeHtml(from) : "Guest") +
    "</span></footer>";
  commentsList.prepend(article);
}
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("comment-name").value.trim();
  const from = document.getElementById("comment-from").value.trim();
  const text = document.getElementById("comment-text").value.trim();
  if (!name || !text) return;
  addCommentCard(name, from, text);
  commentForm.reset();
  commentThanks.classList.add("show");
  commentThanks.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
