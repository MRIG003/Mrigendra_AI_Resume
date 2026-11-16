# What is left to do

Source of truth for facts: `search/assets/Mrigendra_Singh_Chauhan_Resume.pdf`.
All site content is edited in `search/data.js`. Priority: **P1** blocks going public, **P2** makes it much better, **P3** nice to have.

## Resolved (Nov 16)

- Make.com CRM built together with teammate David Sathyan; card now credits him.
- Reservoir: Python and MATLAB both used, final execution in MATLAB; both numbers (44 MCM, 48.04 MCM) stay as they are for now.
- ENGAGE is the name, the repository is `Hum`. Zoom, Teams and Zoho support does **not** exist, so the site now says Google Meet only.
- Street-play photo = Manthan'18. The `Eikcai1` photo = Dropshipping Mela with Pratham Mittal. Permission granted for people shown.
- Photos added: UNB sign, UNB snowy path, Masters' Union event (23 Oct). Instagram `@mrig.ig.in` added to Connect.
- IITG role wording left to my judgement.

---

## A. Waiting on Mrigendra

### A1. Facts and conflicts to settle (P1)

| # | Item | Why it matters |
|---|---|---|
| 1 | **Résumé PDF still says** "one-link access across 4 platforms (Meet, Zoom, Teams, Zoho)". That contradicts what you told me, and the PDF is downloadable from the site. Reword to Google Meet only? | A recruiter will compare the résumé with the site |
| 2 | **GitHub README for `Hum`** says it runs beside Zoom, Teams and Zoho. Update it | Same mismatch, on GitHub |
| 3 | **Wingwoman.sim:** the Masters' Union photo is the founder fireside chat and startup challenge on Fri 23 Oct (poster names the founder of wingwomen.com). Your earlier Word résumé listed "1st place, Wingwoman.sim"; the PDF dropped it. Is this that event, did you place, which person are you, and should the line return to the résumé and site? | Currently held back to follow the PDF |
| 4 | **Perfora audit confidentiality.** The report contains Perfora's internal figures (monthly marketing spend, return rates, margins, traffic, revenue). Where did that data come from, and may it be shown publicly? Also the report's author line still reads "@Firstname Lastname" and it critiques the live store (cart bug, "FDA Approved" badge) | I used none of the figures on the site and told the AI never to quote them |
| 5 | **Cyclothon trophy photo:** which person are you? | Caption stays neutral until then |

### A2. Photos and material still missing (P2)

| Item | What to send |
|---|---|
| **EIKCAI** | Store or Instagram link, stall and product photos, a launch slide (the card currently uses the Dropshipping Mela photo) |
| **Climate risk across 244 markets** | One chart, map or slide from the ANU work (nothing confidential) |
| **Acadian forest fieldwork** | A fieldwork or data-visualisation image |
| **Consulting Club** | An event or team photo |
| **ENGAGE in a live meeting** | A screenshot of the host view or mood panel |
| **Other MBA decks** | PDFs, 4–6 slides each |
| **Kaggle notebooks** | Names and links worth showing |
| **LinkedIn posts, intro video** | Optional |

### A3. Your own words (P2)

- One to two lines of story for each photo (all stories are empty, 14 photos so far).
- Why Consulting, and why Founder's Office / CoS. 90-day plans and culture tiles in JD-Fit-Check.
- How you word "no full-time role yet".
- Side-project offers on Connect, and whether to state a price.
- What you changed in the Perfora redesign and why (conversion reasoning), at a level you are happy to make public.

### A4. Decisions (P1)

1. Go-ahead to publish publicly (phone, email, photos go on the open web).
2. Domain name.
3. First target company and its job description.
4. Keep the name "MriGoogle"? The notice reduces confusion but does not remove trademark risk.
5. Doodle: keep your photo as an "o", or add illustrated or seasonal versions.
6. AI cost: how many questions per visitor per day you will pay for.

---

## B. Build work for me

### B1. Real AI for the public site (P1)
Server function holding the key (entered through the secure form), per-visitor rate limits and a cost cap, prompt-injection protection, scripted answers as fallback. The artifact version uses each viewer's own Claude account and will not work on a public page.

### B2. Per-company forecast pages (P1 for your first application)
Shareable per-company links, a helper that reads the company site and JD and drafts the forecast for you to review, a tailored one-page résumé per company, "why this company" sections.

### B3. Deployment (P1)
Vercel, domain, social-preview image URL, robots and sitemap, security headers, a private staging link first. Split the 4.7 MB single file into normal files with lazy-loaded images.

### B4. Testing (P1)
Run the live AI for real (only simulated so far), a 15–20 question recruiter set re-run after every content change (including the ENGAGE "Google Meet only" and Perfora "no figures" rules), 3+ real JDs including a weak fit, prompt-injection attempts, browser tests into the repo.

### B5. Quality (P2)
Accessibility, a phone check of every tab in light and dark, Safari and Firefox, image performance, search and sharing tags.

### B6. Extras (P3)
Trending panel, People also search for, "Did you mean… Consultant?", voice search, videos carousel, date-based doodles, per-card "Ask AI" buttons.

---

## C. Legal and privacy (P1)

1. Name risk (A4.4).
2. Third-party material in previews: Perfora logo and product images, the Marketplace listing, Make.com screenshot, ANU banners, the Masters' Union event poster showing an external founder's photo and name, Dropshipping Mela photo (permission given for the people shown).
3. Public phone and email: expect spam. Consider a form.
4. Privacy text promises no analytics and no cookies. Keep it true or update it. Instagram link added (no tracking on this site).
5. Decide whether the repo `MRIG003/Mrigendra_AI_Resume` stays public.

## D. Profiles outside this site (P2)
GitHub bio still "An avid ML enthusiast"; Kaggle has no bio; LinkedIn headline and Featured link to the new site; Instagram bio link; update the résumé PDF if facts change and regenerate `search/resume-text.js`.

## E. Repo housekeeping (P3)
Archive the old `sample/` prototype, keep READMEs current, merge the working branch when ready.

---

## Suggested order

1. **Now:** settle A1.1 to A1.4, send EIKCAI and Climate-risk material, start the photo stories.
2. **Then:** I build B1 to B4 while you choose the domain and approve deployment.
3. **Before your first application:** B2 with the real company, section C settled.
4. **After launch:** polish, profile updates, extras.
