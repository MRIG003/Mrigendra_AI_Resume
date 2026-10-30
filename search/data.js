// All site content lives here. Edit this file, not app.js, to change what the page says.
// Lines marked DRAFT are placeholders written for the sample; rewrite them in your own words.

window.PROFILE = {
  name: "Mrigendra Singh Chauhan",
  query: "Mrigendra Singh Chauhan",
  tagline: "Making the complex simple.",
  role: "Strategy & research · Masters' Union '28",
  bullets: [
    ["3 countries", "of research: IIT Guwahati, UNB Canada, ANU Australia"],
    ["Springer-published", "forest carbon forecasts to 2075"],
    ["₹1.3L in 40 days", "founding EIKCAI, concept to market in 23"]
  ],
  facts: [
    ["Now", "PGP Technology & Business Management, Masters' Union (2026–28)"],
    ["Education", "M.Tech, IIT Guwahati · B.Tech, UIT RGPV"],
    ["Research", "UNB, Canada (Mitacs) · ANU, Australia"],
    ["Seeking", "Consulting · Founder's Office / Chief of Staff"],
    ["Hometown", "Bhopal, Madhya Pradesh"]
  ],
  stats: [["₹1.3L", "in 40 days"], ["244", "markets ranked"], ["97.5%", "NASA match"], ["8/470", "MUCC core"]],
  links: {
    email: "mrigendra.chauhan2028@mastersunion.org",
    linkedin: "https://www.linkedin.com/in/mrigendra-singh",
    github: "https://github.com/MRIG003",
    kaggle: "https://www.kaggle.com/mrigendrachauhan",
    medium: "https://medium.com/@mrigendraschauhan",
    paper: "https://doi.org/10.1007/s41748-025-00817-6"
  }
};

// Web results on the All tab (keep to 3)
window.RESULTS = [
  { site: "LinkedIn", url: "linkedin.com › in › mrigendra-singh", href: "https://www.linkedin.com/in/mrigendra-singh",
    title: "Mrigendra Singh Chauhan · Consulting Club Core Member", snippet: "MBA 2026–28, Masters' Union. M.Tech, IIT Guwahati.",
    chips: ["ANU award", "Mitacs award", "MUCC 8/470+"] },
  { site: "Springer", url: "doi.org › 10.1007 › s41748-025-00817-6", href: "https://doi.org/10.1007/s41748-025-00817-6",
    title: "Carbon Sequestration Potential of Acadian Forests", snippet: "LiDAR-initialised ecosystem model, simulated 2021–2075.",
    chips: ["Earth Systems and Environment", "2025", "2nd author"] },
  { site: "GitHub", url: "github.com › MRIG003", href: "https://github.com/MRIG003",
    title: "MRIG003 · ENGAGE, ML experiments, MU résumé template", snippet: "Meeting companion for Meet, Zoom, Teams and Zoho.",
    chips: ["10 repos", "99.8% chess CNN", "BERT 96%"] }
];

// Chatbot knowledge base (AI Mode + AI Overview). The real build replaces this with an LLM grounded in résumé files.
window.KB = [
  { q: "What's his strongest project?", icon: "🌏", k: ["strongest", "best", "proud", "project", "anu", "244", "climate", "market sizing", "scenario"],
    a: "At ANU he ranked 244 countries by climate risk under 1.5°C and 2.7°C pathways and found a 5× swing in population at risk (2B → 0.4B). Policymakers got a ranked, decision-ready view instead of a report.",
    s: ["Résumé › ANU internship"] },
  { q: "Why Consulting and Founder's Office?", icon: "🧭", k: ["founder", "office", "why", "cos", "chief", "consulting", "interest"],
    a: "His best work has been taking an ambiguous problem, structuring it, and making it decision-ready, then shipping. EIKCAI went from concept to market in 23 days; ANU turned 244 countries into one ranking.",
    s: ["Résumé › Summary", "JD-Fit-Check"] },
  { q: "Does he have full-time work experience?", icon: "💼", k: ["full-time", "fulltime", "job", "experience", "work", "corporate", "years"],
    a: "Not yet. His experience is research in India, Canada and Australia, plus ventures at Masters' Union. He lists this openly as the \"chance of rain\" in his fit forecast.",
    s: ["Résumé › Internships", "JD-Fit-Check › Gaps"] },
  { q: "What tools does he use?", icon: "🛠️", k: ["tools", "stack", "excel", "sql", "python", "power bi", "software", "tech", "skills"],
    a: "Excel, Power BI, SQL, Python (Pandas, NumPy), R and Google Earth Engine for analysis. Claude, Lovable, Vercel, Render, Supabase, n8n and Make for building.",
    s: ["Skills-&-tools"] },
  { q: "Has he published research?", icon: "📄", k: ["publish", "paper", "springer", "research", "journal", "publication"],
    a: "Yes. He is second author on a 2025 paper in Earth Systems and Environment (Springer) on carbon sequestration in Canada's Acadian forests, built during his Mitacs internship at UNB.",
    s: ["Publications"] },
  { q: "Has he led people?", icon: "🚴", k: ["lead", "leadership", "team", "manage", "people", "cyclothon", "senator"],
    a: "He was Overall Coordinator of the PRAYATNA Cyclothon at IIT Guwahati (180+ cyclists, ₹65K from ASACS, Monster Energy onboarded) and served as PG Senator.",
    s: ["Résumé › Leadership"] },
  { q: "What has he built with AI?", icon: "🤖", k: ["ai", "built", "build", "engage", "app", "product", "ml", "open source", "github"],
    a: "ENGAGE, a no-sign-up meeting companion for Meet, Zoom, Teams and Zoho with live polls, Q&A and a host mood view. Also a chess-board reader (99.8% accuracy) and a BERT text classifier (96%).",
    s: ["Open-source"] },
  { q: "Can I hire him for a side project?", icon: "🤝", k: ["hire", "side", "freelance", "project", "contract", "help"],
    a: "Yes. He takes on short side projects: market sizing and research sprints, AI automations and tools, climate and ESG analysis, and data prototypes. The Connect tab has a brief form.",
    s: ["Connect"] }
];

// Stops on the Maps tab, in route order
window.STOPS = [
  { id: "bhopal", name: "Bhopal", place: "Madhya Pradesh, India", when: "2015–2021", layer: "foundations", coords: [77.41, 23.26],
    title: "Foundations", photo: "UIT RGPV / street play",
    text: "CBSE schooling, then B.Tech in Civil Engineering at UIT RGPV (82.6%). Rural surveys under Unnat Bharat Abhiyan, and a street play at Manthan'18.",
    result: ["96.9", "GATE percentile"] },
  { id: "guwahati", name: "Guwahati", place: "Assam, India", when: "2022–2024", layer: "leadership", coords: [91.74, 26.14],
    title: "IIT Guwahati", photo: "IITG campus / Cyclothon",
    text: "M.Tech in Earth System Science on an MoE scholarship (85.6%). PG Senator. Ran the PRAYATNA Cyclothon: ₹65K from ASACS, Monster Energy onboarded.",
    result: ["180+", "cyclists mobilised"] },
  { id: "fredericton", name: "Fredericton", place: "New Brunswick, Canada", when: "Jan–May 2024", layer: "research", coords: [-66.64, 45.96],
    title: "Mitacs Globalink · UNB", photo: "UNB / Acadian forest",
    text: "Reverse-engineered an undocumented Harvard ecosystem model, calibrated it with LiDAR data, and forecast 3 carbon pools to 2075. Published in Springer's Earth Systems and Environment.",
    result: ["97.5%", "match to NASA MODIS"] },
  { id: "canberra", name: "Canberra", place: "ACT, Australia", when: "Jun–Aug 2024", layer: "research", coords: [149.13, -35.28],
    title: "ANU Future Research Talent", photo: "ANU / Canberra",
    text: "One of 70 selected in India. Scenario analysis of 1.5°C vs 2.7°C pathways across 244 countries, ranked into a decision-ready view for policymakers.",
    result: ["5×", "swing in population at risk"] },
  { id: "gurugram", name: "Gurugram", place: "Haryana, India", when: "2026 → now", layer: "ventures", coords: [77.03, 28.46],
    title: "Masters' Union", photo: "Masters' Union / EIKCAI stall",
    text: "PGP in Technology & Business Management on scholarship. Founded EIKCAI, shipped ENGAGE, joined the Consulting Club core team (8 of 470+), won Wingwoman.sim.",
    result: ["₹1.3L", "revenue in 40 days"] }
];

// Images tab. Set src to a file path (e.g. "img/anu.jpg") when photos arrive; write the story in your words.
window.IMAGES = [
  { src: null, caption: "Headshot", story: "" },
  { src: null, caption: "IIT Guwahati campus", story: "" },
  { src: null, caption: "PRAYATNA Cyclothon", story: "" },
  { src: null, caption: "UNB, Fredericton", story: "" },
  { src: null, caption: "Acadian forest fieldwork", story: "" },
  { src: null, caption: "ANU, Canberra", story: "" },
  { src: null, caption: "EIKCAI stall", story: "" },
  { src: null, caption: "EIKCAI products", story: "" },
  { src: null, caption: "Wingwoman.sim win", story: "" },
  { src: null, caption: "Consulting Club", story: "" },
  { src: null, caption: "Manthan'18 street play", story: "" },
  { src: null, caption: "ENGAGE in a live meeting", story: "" }
];

// Skills-&-tools tab: each skill points to where it was used
window.SKILLS = [
  { group: "Business", icon: "🧭", items: [
    ["Problem structuring (MECE, issue trees)", "MUCC, case competitions"], ["Hypothesis-driven analysis", "ANU, UNB"],
    ["Market sizing", "ANU · 244 markets"], ["Opportunity assessment", "ANU · mitigation targeting"],
    ["Scenario analysis", "ANU · 1.5°C vs 2.7°C"], ["Cost-benefit analysis", "Reservoir model · 5 crops"],
    ["Resource allocation", "Reservoir · 44 MCM threshold"], ["Stakeholder management", "Cyclothon · ASACS, Monster Energy"] ] },
  { group: "Analytics", icon: "📊", items: [
    ["Excel & MS 365", ""], ["Power BI", ""], ["SQL", ""], ["Python (Pandas, NumPy)", "UNB, ML builds"],
    ["R", ""], ["Machine learning", "Chess CNN 99.8%, BERT 96%"], ["Google Earth Engine", "NASA workshop, research"] ] },
  { group: "AI & building", icon: "⚡", items: [
    ["Claude · ChatGPT · Gemini", "Daily"], ["Lovable · Vercel · Render", "ENGAGE, Perfora redesign"],
    ["Supabase", ""], ["n8n · Make", "Make.com CRM"], ["Shopify", "EIKCAI store"] ] }
];

// MBA projects and decks. Add the PPT/PDF link in href when ready.
window.DECKS = [
  { title: "EIKCAI: launch & go-to-market", tags: ["GTM", "Pricing", "Execution"], text: "Concept to market in 23 days; ₹1.3L in 40 days; top 15 of 40 teams.", href: null },
  { title: "Wingwoman.sim: winning pitch", tags: ["Entrepreneurship", "Pitching"], text: "1st place at the Business Club's external entrepreneurship event, Oct 2026.", href: null },
  { title: "Climate risk across 244 markets", tags: ["Market sizing", "Scenario analysis"], text: "Decision-ready ranking for mitigation investment, from the ANU internship.", href: null },
  { title: "Reservoir release & storage optimisation", tags: ["Cost-benefit", "Optimisation"], text: "5 crops, 9,848 hectares, 10 periods; 44 MCM sustainable-supply threshold.", href: "https://github.com/MRIG003/Optimization-of-Reservoir-Release-and-Storage-Scheduling" },
  { title: "Perfora landing page redesign", tags: ["Vibe-coding", "Vercel"], text: "Redesigned and shipped a landing page from idea to deployment.", href: null },
  { title: "Make.com CRM", tags: ["Automation", "No-code"], text: "Lightweight CRM built on Make.com, idea to deployment.", href: null }
];

// Open-source tab
window.REPOS = [
  { name: "Hum (ENGAGE)", lang: "JavaScript", kind: "Product", text: "Meeting engagement layer beside Meet, Zoom, Teams and Zoho: polls, Q&A, host mood view, no sign-up.", href: "https://github.com/MRIG003/Hum" },
  { name: "MastersUnion_ResumeFormat", lang: "TeX", kind: "Tool", text: "One-page LaTeX résumé template for Masters' Union students, tuned for consulting roles.", href: "https://github.com/MRIG003/MastersUnion_ResumeFormat" },
  { name: "HELPMEHUMANIZE", lang: "Prompting", kind: "Tool", text: "Prose-craft rewriter that improves clarity and voice while preserving facts.", href: "https://github.com/MRIG003/HELPMEHUMANIZE" },
  { name: "Mrigendra_AI_Resume", lang: "JavaScript", kind: "Product", text: "This site: an interactive AI résumé in a search-engine theme.", href: "https://github.com/MRIG003/Mrigendra_AI_Resume" },
  { name: "Chess-Pieces-Position-Prediction_using_FEN", lang: "Jupyter", kind: "ML", text: "Keras CNN with PCA reading chess positions from images: 99.8% accuracy (9 errors in 4,000).", href: "https://github.com/MRIG003/Chess-Pieces-Position-Prediction_using_FEN" },
  { name: "Text_Classification_with_Tensorflow_using_BERT", lang: "Jupyter", kind: "ML", text: "Fine-tuned BERT on 10K+ Quora questions to flag insincere ones: 96% validation accuracy.", href: "https://github.com/MRIG003/Text_Classification_with_Tensorflow_using_BERT" },
  { name: "Optimization-of-Reservoir-Release-and-Storage-Scheduling", lang: "Python", kind: "Research", text: "Multi-crop irrigation allocation for a non-perennial river reservoir in the Rabi season.", href: "https://github.com/MRIG003/Optimization-of-Reservoir-Release-and-Storage-Scheduling" },
  { name: "Image-Annotation-without-using-Object-Detection-Model", lang: "Python", kind: "ML", text: "OpenCV algorithm that removes specific annotations from images without re-annotating.", href: "https://github.com/MRIG003/Image-Annotation-without-using-Object-Detection-Model" },
  { name: "Pets_Classification_using_cifar10", lang: "Jupyter", kind: "ML", text: "TensorFlow image classifier on CIFAR-10.", href: "https://github.com/MRIG003/Pets_Classification_using_cifar10" },
  { name: "Kaggle notebooks", lang: "Kaggle", kind: "ML", text: "Notebooks and badges on Kaggle.", href: "https://www.kaggle.com/mrigendrachauhan/code" }
];

// Publications tab
window.PAPERS = [
  { title: "Exploring the Multifaceted Carbon Sequestration Potential of Acadian Forests: A Detailed Study Integrating LiDAR Data and Environmental Influences",
    authors: "CS Utla, MS Chauhan, BK Yadav, A Dashora, R Mishra, Y Zhang", venue: "Earth Systems and Environment (Springer)", year: "2025", type: "Journal",
    href: "https://doi.org/10.1007/s41748-025-00817-6", doi: "10.1007/s41748-025-00817-6",
    figures: [["55 yrs", "simulated, 2021–2075"], ["3 pools", "AGB, BGB, soil carbon"], ["2048", "projected biomass drop"]] },
  { title: "Modelling Tree Environment Interaction for Prediction of Forest Ecosystem Production",
    authors: "MS Chauhan", venue: "M.Tech thesis, IIT Guwahati", year: "2024", type: "Thesis", href: null },
  { title: "Flood Susceptibility Mapping of Ballia District, Uttar Pradesh",
    authors: "MS Chauhan et al.", venue: "RCRM-2024, IIT Guwahati & IIT Jammu", year: "2024", type: "Conference", href: null },
  { title: "Physio-chemical and Bacteriological Quality Assessment of Surface Water",
    authors: "MS Chauhan", venue: "B.Tech thesis, UIT RGPV", year: "2021", type: "Thesis", href: null }
];
window.WRITING = [
  { title: "What Would It Cost to Own the Earth?", when: "Jul 2025", href: "https://medium.com/@mrigendraschauhan/what-would-it-cost-to-own-the-earth-1ba0d6d29825" },
  { title: "Investing in a Sustainable Future: Climate Change, ESG and Global Cooperation", when: "Dec 2024", href: "https://medium.com/@mrigendraschauhan/investing-in-a-sustainable-future-the-intersection-of-climate-change-esg-and-global-cooperation-323ea018182f" },
  { title: "Discovering Data: Crafting Your Personal Understanding", when: "Aug 2023", href: "https://medium.com/@mrigendraschauhan/discovering-data-crafting-your-personal-understanding-69e502023938" }
];

window.AWARDS = [
  ["Oct 2026", "1st place · Wingwoman.sim"], ["2026", "MUCC core team · 8 of 470+"], ["Sep 2026", "Bloomberg ESG certificate"],
  ["Jun 2024", "ANU Future Research Talent · 1 of 70"], ["Jan 2024", "Mitacs Globalink Research Award"],
  ["2022–24", "MoE PG scholarship, IIT Guwahati"], ["Feb 2022", "GATE 96.9 percentile"]
];

// Connect tab: side projects (DRAFT scopes)
window.OFFERS = [
  { icon: "📐", title: "Market sizing & research sprint", text: "Size a market, map scenarios, and hand back a one-page decision memo." },
  { icon: "⚡", title: "AI automations & tools", text: "n8n / Make workflows, lightweight CRMs, landing pages shipped on Vercel." },
  { icon: "🌱", title: "Climate & ESG analysis", text: "Carbon accounting inputs, climate-risk views, ESG research." },
  { icon: "📊", title: "Data & ML prototypes", text: "Python notebooks, Power BI dashboards, quick ML proofs of concept." }
];

// JD-Fit-Check: one forecast per target. Add companies later and share ?for=<key>.
window.HOURLY = [
  { t: "2017", icon: "partly", label: "B.Tech", v: 62 }, { t: "2022", icon: "sun", label: "GATE", v: 70 },
  { t: "2023", icon: "sun", label: "IITG", v: 74 }, { t: "Jan 24", icon: "sun", label: "UNB", v: 80 },
  { t: "Jun 24", icon: "sun", label: "ANU", v: 85 }, { t: "Oct 25", icon: "sun", label: "Paper", v: 87 },
  { t: "2026", icon: "wind", label: "EIKCAI", v: 84 }, { t: "Now", icon: "sun", label: "MU", v: 90 }
];
window.FORECASTS = {
  consulting: {
    tabLabel: "Consulting", company: "Strategy consulting", role: "Associate Consultant / Business Analyst", city: "India",
    temp: 86, condition: "Mostly sunny", hi: 92, lo: 72,
    headline: "Structured, hypothesis-driven and numerate. Client-facing reps are still building.",
    why: ["Problems with no obvious answer and a deadline", "Turning analysis into one decision a client can act on", "Learning many industries fast"], // DRAFT
    days: [
      { d: "Week 1", icon: "partly", t: "Ramp on the industry; draft the issue tree", hi: 80, lo: 66 },
      { d: "Week 2", icon: "sun", t: "Market sizing and data pulls to test hypotheses", hi: 86, lo: 72 },
      { d: "Day 30", icon: "sun", t: "Own one workstream's analysis and exhibits", hi: 88, lo: 74 },
      { d: "Day 60", icon: "partly", t: "Present a module to the client team", hi: 86, lo: 72 },
      { d: "Day 90", icon: "sun", t: "A scenario model that changes a client decision", hi: 92, lo: 76 }
    ],
    details: [
      ["UV index", "Very high", "MECE structuring, market sizing, scenarios"],
      ["Visibility", "244 markets", "Ranked into one decision-ready view"],
      ["Wind", "Fast", "Consulting Club core team · 8 of 470+"],
      ["Pressure", "Steady", "Case wins: Wingwoman.sim 1st"],
      ["Humidity", "High", "Comfortable in ambiguity: undocumented model rebuilt"],
      ["Chance of rain", "40%", "No prior client-facing consulting role"]
    ],
    culture: [["Pace", "Fast", "23-day launch"], ["Rigour", "High", "Peer-reviewed paper"], ["Teams", "Global", "3 countries"], ["Feedback", "Welcomes it", "Iterated EIKCAI weekly"]]
  },
  focos: {
    tabLabel: "FoCoS", company: "Founder's Office / Chief of Staff", role: "Founder's Office Associate · CoS", city: "Startups in India",
    temp: 90, condition: "Clear skies", hi: 95, lo: 76,
    headline: "Structures the unstructured, then ships. Built and sold a product in 40 days.",
    why: ["Sitting where strategy meets execution", "Owning the problems nobody owns yet", "Building with founders, not just advising them"], // DRAFT
    days: [
      { d: "Week 1", icon: "partly", t: "Shadow founders; read every dashboard and doc", hi: 82, lo: 68 },
      { d: "Week 2", icon: "sun", t: "Map the top 3 open problems as issue trees", hi: 88, lo: 72 },
      { d: "Day 30", icon: "sun", t: "Ship a sizing model for the next bet", hi: 90, lo: 76 },
      { d: "Day 60", icon: "wind", t: "Run one cross-functional launch end to end", hi: 92, lo: 78 },
      { d: "Day 90", icon: "sun", t: "Own a recurring founder review and its numbers", hi: 95, lo: 80 }
    ],
    details: [
      ["UV index", "Extreme", "Market sizing and scenario modelling"],
      ["Wind", "23 days", "Concept to market at EIKCAI"],
      ["Visibility", "3 countries", "Research in India, Canada, Australia"],
      ["Pressure", "180+", "Cyclists, sponsors and volunteers coordinated"],
      ["Air quality", "Good", "Builds with AI: ENGAGE, automations"],
      ["Chance of rain", "30%", "No full-time startup role yet"]
    ],
    culture: [["Ownership", "High", "Founded EIKCAI"], ["Speed", "Fast", "Idea → live product"], ["Ambiguity", "Thrives", "No-docs model rebuilt"], ["Range", "Wide", "Research → GTM → AI"]]
  }
};

// Keyword scoring for the "paste a JD" box. The real build sends the JD to an LLM instead.
window.JD_SIGNALS = {
  match: {
    "market sizing": "Market sizing: 244-market risk ranking", "scenario": "Scenario analysis: 1.5°C vs 2.7°C",
    "research": "Research in 3 countries, published", "excel": "Excel and Power BI", "sql": "SQL", "python": "Python",
    "stakeholder": "Stakeholder management: ASACS, sponsors, 180+ cyclists", "launch": "Launched EIKCAI in 23 days",
    "go-to-market": "GTM: ₹1.3L in 40 days", "gtm": "GTM: ₹1.3L in 40 days", "strategy": "Consulting Club core team",
    "esg": "Bloomberg + IIM-B ESG", "climate": "Climate risk modelling", "sustainab": "Sustainability research",
    "cross-functional": "Cross-functional execution: Cyclothon", "problem solving": "MECE and issue trees", "structur": "MECE and issue trees",
    "ai": "Built ENGAGE and AI automations", "data": "Data analysis: Python, SQL, Earth Engine", "founder": "Founder of EIKCAI",
    "ownership": "Owned EIKCAI end to end", "ambigu": "Rebuilt an undocumented model", "fast-paced": "23-day launch"
  },
  gap: {
    "years of experience": "Full-time years of experience", "3+ years": "3+ years full-time", "5+ years": "5+ years full-time",
    "java": "Java", "react": "Production React", "sales quota": "Quota-carrying sales", "cfa": "CFA",
    "investment banking": "Investment banking", "people management": "Managing direct reports", "chartered": "CA qualification"
  }
};
