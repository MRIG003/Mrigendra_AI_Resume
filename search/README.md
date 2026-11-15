# MriGoogle (search/)

A personal résumé site styled as a search engine. Plain HTML, CSS and JavaScript: no build step.

```bash
cd search && python3 -m http.server 8080   # then open http://localhost:8080
```

## Where things live

| File | What it holds |
|---|---|
| `data.js` | **All content**: profile, photos, stops, skills, repos, papers, forecasts, chatbot answers |
| `app.js` | Behaviour: home page, search, AI Mode, JD-Fit-Check, globe, lightbox |
| `styles.css` | Look and feel, light and dark |
| `index.html` | Page structure, legal dialog |
| `img/` | Optimised photos (WebP) + `og.jpg` social preview |
| `assets/` | Résumé PDF |
| `vendor/` | d3, topojson and the world map, bundled so the globe works offline |

## Common edits

- **Add a photo:** save a WebP (long edge ≤ 1600 px, plus a 640 px `-thumb`) in `img/`, then add an entry to `IMAGES` in `data.js`.
- **Add a company forecast:** copy an entry in `FORECASTS`, edit it, and share `index.html?for=<key>`.
- **Change what the chatbot can say:** edit `KB`. Replace with a real model later; keep answers limited to the résumé.

## Legal

The name nods to Google but the site uses its own wordmark, fonts, icons and code. A corner notice and the footer state that it is an independent parody, not affiliated with Google LLC. Keep both when editing.
