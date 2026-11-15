# Open items (the "remind me later" list)

Source of truth for content: `search/assets/Mrigendra_Singh_Chauhan_Resume.pdf`.
Everything on the site is edited in `search/data.js`.

## Waiting on Mrigendra

| # | Item | Where it goes | Notes |
|---|---|---|---|
| 1 | **MBA decks**, exported as PDF (4–6 slides or one hero slide each) | Skills & tools › MBA projects & decks | Set `href` on each entry in `DECKS`. Placeholders are in place |
| 2 | **One-line story for each photo** | Images tab, lightbox | Fill `story` in `IMAGES`. Captions are neutral drafts |
| 3 | **Confirm 3 photo guesses** | Images, career stops | Street-play photo = Manthan'18 (used on the Bhopal stop). The "An evening out" photo was named `Eikcai1` but doesn't show EIKCAI. Who is the second person, and is it fine to publish? |
| 4 | **Missing photos** | UNB / Acadian forest, EIKCAI stall and products, ENGAGE screenshots, Consulting Club, Masters' Union | Placeholders until sent |
| 5 | **EIKCAI link** | Open-source / Skills | Store or Instagram |
| 6 | **Kaggle notebooks** | Open-source | Names and links worth showing as separate cards |
| 7 | **Rewrite the DRAFT lines** | JD-Fit-Check, Connect | "Why consulting / FoCoS", 90-day plans, culture tiles, side-project scopes and pricing |
| 8 | **First target company + its JD** | JD-Fit-Check | Add an entry to `FORECASTS`, share `?for=<key>` |
| 9 | **Domain name** | Deployment | e.g. `mrigendra.in`. Also set the absolute `og:image` URL in `index.html` |
| 10 | **LinkedIn / Instagram posts** worth showing | All, News-style cards | Both block automated reading |
| 11 | **Intro video** (optional, 45–60 s) | All | Landscape, clear audio |

## Decided

- Follow the PDF résumé. Wingwoman.sim and PG Senator are not on it, so they are not on the site.
- Forest: 2,400 ha research forest; the published simulation covers 122.5 ha. The site states both.
- Phone number is public (+91 84356 73237).
- ENGAGE links to the Google Workspace Marketplace listing.
- Name: **MriGoogle**, with a parody / not-affiliated notice in the corner and in the footer.

## Next build steps

1. Real AI for AI Mode and JD-Fit-Check (model API behind a small server function; key kept off the page).
2. Deploy to a public link (Vercel). Needs a go-ahead because it publishes the phone number and photos.
3. Light analytics only if wanted. The legal text currently promises none.
