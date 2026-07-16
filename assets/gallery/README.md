# Gallery Photos

Drop new photos for the website gallery into this folder.

## How to add a new photo

1. Upload your image file into this `assets/gallery/` folder  
   (via GitHub website → Add file → Upload files, or via git)

2. Open `gallery.html` in the root of the repository

3. Find the `galleryImages` list near the bottom of the file and add a new entry, for example:

```js
{ src: "assets/gallery/your-photo-name.jpg", caption: "Short description" },
```

4. Commit the changes. Cloudflare will automatically update the live website.

**Tips**
- Use `.jpg`, `.jpeg`, or `.png`
- Keep file names simple (no spaces if possible, or use hyphens)
- Recommended size: under 1–2 MB for fast loading
