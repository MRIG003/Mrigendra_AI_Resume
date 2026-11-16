# What is left to do

Source of truth for facts: `search/assets/Mrigendra_Singh_Chauhan_Resume.pdf`.
All site content is edited in `search/data.js`. Priority: **P1** blocks going public, **P2** makes it much better, **P3** nice to have.

## Already done (for reference)

Home page, doodle, 9 tabs, working keyword search, AI Mode and JD forecast (live in the Claude artifact, scripted elsewhere), globe tour, photos, phone, ENGAGE, Reservoir, Perfora and Make.com cards, legal notice, résumé PDF.

---

## A. Waiting on Mrigendra

### A1. Facts to confirm (P1: wrong facts hurt in interviews)

| # | Question | Why it matters |
|---|---|---|
| 1 | **Make.com CRM:** the public scenario page lists the creator as David Sathyan. Template you adapted, shared account, or built from scratch? Is it running (preview shows "Inactive")? What does each "Update a Row" do? | The card must not claim more than is true |
| 2 | **Reservoir:** résumé says "44 MCM sustainable-supply threshold"; the infographic says lowest cost at 48.04 MCM. How do they relate? GitHub repo is tagged Python, infographic says MATLAB: which is the code in? | An interviewer will ask |
| 3 | **ENGAGE:** Marketplace listing says Google Meet side panel only. Does the Zoom/Teams/Zoho support exist in the installed version or only the Render app? | The card currently says "also works beside Zoom, Teams and Zoho" |
| 4 | **Perfora:** it is a concept pitch, not their live store. Has the brand seen it? Is there a GitHub repo? What did you change and why (conversion reasoning)? | Their logo and product photos appear in the preview |
| 5 | **Name of the app:** ENGAGE or Hum (repo is `Hum`)? | Consistency across résumé, site, GitHub |
| 6 | **Résumé vs site wording:** confirm "Content Executive, Red Ribbon Club" and "Branch Representative" are how you want the IITG roles described | Replaced the earlier PG Senator line |

### A2. Photos (P1 for the guesses, P2 for the new ones)

| # | Item | Status |
|---|---|---|
| 1 | Confirm **street-play photo** is Manthan'18 | Used on the Bhopal stop as a guess |
| 2 | **"An evening out"** photo (file was named `Eikcai1`): is it right, who is the other person, may it be published? | Held in Images with a neutral caption |
| 3 | **Cyclothon trophy photo:** which person is you; are the others fine being shown? | Caption is neutral |
| 4 | New photos: **UNB Fredericton, Acadian forest fieldwork, EIKCAI stall and products, Consulting Club, Masters' Union campus, ENGAGE in a live meeting** | Placeholders |
| 5 | Permission for people clearly visible (ANU professor, Cyclothon riders) | Not asked yet |

### A3. Cards still empty (P2)

| Card | What to send |
|---|---|
| **EIKCAI: launch & go-to-market** | Store or Instagram link, 1–2 product or stall photos, a slide of the launch numbers |
| **Climate risk across 244 markets** | A chart, map or slide from the ANU work (nothing confidential) |
| MBA decks in general | PDFs, 4–6 slides or one hero slide each |

### A4. Your own words (P2: these make it sound like you)

| Item | Where |
|---|---|
| One to two lines of story for **each photo** (currently empty) | Images tab, lightbox |
| "Why Consulting" and "Why Founder's Office / CoS" | JD-Fit-Check, both forecasts |
| 90-day plans and culture tiles | JD-Fit-Check |
| The honest-gaps wording ("no full-time role yet") | JD-Fit-Check, AI Mode |
| Side-project offers, scope and whether to state a price | Connect |
| Tagline check: "Making the complex simple." | Everywhere |

### A5. Links and assets (P2)

Kaggle notebook names and links, LinkedIn posts worth featuring, Instagram content (both block automated reading), optional 45–60 s intro video, EIKCAI link, GitHub repo links for Perfora and Make if they exist.

### A6. Decisions (P1)

1. **Go-ahead to deploy publicly.** This publishes your phone, email and photos.
2. **Domain name** (for example `mrigendra.in`).
3. **First target company and its job description** (builds the first real forecast).
4. **Keep the name "MriGoogle"?** The corner notice reduces confusion but does not remove trademark risk. Alternative: a name without "Google".
5. **Doodle idea:** keep your photo as an "o", or add illustrated or seasonal variants.
6. **AI cost and limits:** how many questions per visitor per day you are happy to pay for.

---

## B. Build work for me

### B1. Make the AI real for the public site (P1)

| # | Task |
|---|---|
| 1 | Server function (Vercel) that holds the model API key and calls Claude with the résumé as grounding. The artifact version uses each viewer's own Claude account and will **not** work on a public page |
| 2 | Per-visitor rate limiting, a daily cost cap, abuse and prompt-injection filtering, request size limits |
| 3 | Store the key through the secure credential form, never in the page or repo |
| 4 | Keep the scripted answers as an offline fallback |
| 5 | Log questions only if you want that, and update the privacy text if so (it currently promises no analytics) |

### B2. Per-company forecast pages (P1 for your first application)

| # | Task |
|---|---|
| 1 | Shareable per-company links (the artifact cannot use `?for=`; on the real site use `/for/<company>` or a query) |
| 2 | Company research helper: read the company site and JD, fill the forecast and culture tiles, you review before sending |
| 3 | A tailored one-page résumé per company (MU format skill is available) |
| 4 | "Why this company" and "how I'd work with the founders" sections inside the forecast |

### B3. Deployment (P1)

Deploy on Vercel, connect the domain, set the absolute social-preview image URL, add `robots.txt` and a sitemap, security headers and a content-security policy, a custom 404, and a staging link to review before going public. The 3 MB single-file artifact should become normal files with lazy-loaded images for speed.

### B4. Testing (P1)

| # | Task |
|---|---|
| 1 | **Run the live AI for real.** Only a simulated host has been tested so far |
| 2 | Write 15–20 recruiter-style questions with expected answers and re-run them after every content change, to catch invented facts |
| 3 | Test with 3+ real JDs, including a weak fit; check scores are honest |
| 4 | Try to break it: "ignore your instructions", JD containing instructions, off-topic requests |
| 5 | Add the browser smoke tests I used into the repo as one script |

### B5. Quality passes (P2)

| # | Task |
|---|---|
| 1 | Accessibility: contrast, keyboard path through every tab, screen-reader announcements for chat and forecast |
| 2 | Visual review of every tab on a real phone, in light and dark (only widths and a few screens checked) |
| 3 | Safari and Firefox checks; reduced-motion check |
| 4 | Performance: image sizes, lazy loading, font loading |
| 5 | SEO and sharing: page title and description, structured data for a person, social preview |

### B6. Features to decide on (P3)

"Trending" panel on All, "People also search for" links, a "Did you mean… Consultant?" nudge, voice search button, a Videos carousel for your intro, date-based doodles, per-card "Ask AI about this" buttons, a short interview-ready "30-second pitch" button.

---

## C. Legal, privacy and reputation (P1)

| # | Item |
|---|---|
| 1 | Decide on the name risk (A6.4). The notice is not legal advice |
| 2 | Third-party material in previews: Perfora's logo and product images, the Google Workspace Marketplace listing, Make.com screenshot, ANU banners and the professor in the award photo. Get comfortable or get permission |
| 3 | Phone and email are public: expect spam and cold calls. Consider a separate number or a contact form instead |
| 4 | The privacy text says no analytics and no cookies. Keep it true or update it |
| 5 | The repo `MRIG003/Mrigendra_AI_Resume` contains your phone and photos: decide whether it stays public |

## D. Profiles to align (P2, outside this site)

GitHub bio still says "An avid ML enthusiast"; Kaggle has no bio; LinkedIn headline and Featured link should point to the new site; Medium bio is fine ("Making the complex simple."); update the résumé PDF if any fact above changes and regenerate `search/resume-text.js`.

## E. Repo housekeeping (P3)

Remove or archive the older `sample/` prototype, keep `search/README.md` current, merge the working branch when ready, add a short GitHub README with a link to the live site.

---

## Suggested order

1. **This week:** answer A1 and A2 confirmations, send the EIKCAI and Climate-risk material, write the photo stories (A4).
2. **Then:** I build B1 to B4 (real AI, tests), you pick the domain and approve deployment.
3. **Before your first application:** B2 with the real target company, C items settled.
4. **After launch:** B5 polish, D profile updates, B6 extras.
