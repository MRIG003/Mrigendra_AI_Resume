// All site content lives here. Edit this file, not app.js, to change what the page says.

window.PROFILE = {
  name: "Mrigendra Singh Chauhan",
  query: "mrigendra singh chauhan",
  tagline: "Making the complex simple.",
  summary:
    "Strategy-focused problem solver with research across 3 countries (India, Canada, Australia). " +
    "Published in a Springer journal, founded EIKCAI (₹1.3L revenue in 40 days), and now a PGP candidate " +
    "at Masters' Union aiming for Founder's Office and Consulting roles.",
  facts: [
    ["Now", "PGP Technology & Business Management, Masters' Union (2026–28)"],
    ["Education", "M.Tech, IIT Guwahati · B.Tech, UIT RGPV"],
    ["Research", "UNB, Canada (Mitacs) · ANU, Australia"],
    ["Founded", "EIKCAI, astro & demi-fine jewellery"],
    ["Seeking", "Founder's Office · Consulting"],
    ["Hometown", "Bhopal, Madhya Pradesh"]
  ],
  stats: [
    ["₹1.3L", "revenue in 40 days"],
    ["244", "countries risk-ranked"],
    ["97.5%", "match to NASA benchmark"],
    ["3", "countries of research"]
  ],
  links: {
    email: "mrigendra.chauhan2028@mastersunion.org",
    linkedin: "https://www.linkedin.com/in/mrigendra-singh",
    github: "https://github.com/MRIG003",
    medium: "https://medium.com/@mrigendraschauhan",
    paper: "https://doi.org/10.1007/s41748-025-00817-6"
  }
};

// Search results on the "All" tab
window.RESULTS = [
  {
    site: "LinkedIn", url: "linkedin.com › in › mrigendra-singh",
    title: "Mrigendra Singh Chauhan · Consulting Club Core Member · Masters' Union",
    snippet: "MBA 2026–28, Masters' Union · Future Research Talent Award (ANU) · Mitacs Globalink Research Award · M.Tech, IIT Guwahati.",
    href: "https://www.linkedin.com/in/mrigendra-singh"
  },
  {
    site: "Springer", url: "doi.org › 10.1007 › s41748-025-00817-6",
    title: "Exploring the Multifaceted Carbon Sequestration Potential of Acadian Forests",
    snippet: "Earth Systems and Environment, Oct 2025. Utla, Chauhan, Yadav, Dashora, Mishra, Zhang. LiDAR-initialised ecosystem modelling of carbon pools to 2075.",
    href: "https://doi.org/10.1007/s41748-025-00817-6"
  },
  {
    site: "Masters' Union", url: "mastersunion.org › projects › eikcai",
    title: "EIKCAI: from concept to market in 23 days, ₹1.3L in 40",
    snippet: "Founded and led an astro and demi-fine jewellery brand in the Dropshipping Challenge. Ranked top 15 of 40 teams.",
    href: "#news"
  },
  {
    site: "GitHub", url: "github.com › MRIG003",
    title: "MRIG003: ENGAGE meeting companion, ML experiments, MU résumé template",
    snippet: "No-sign-up meeting layer for Meet, Zoom, Teams and Zoho. Chess-board reader at 99.8% accuracy. BERT classifier at 96%.",
    href: "https://github.com/MRIG003"
  },
  {
    site: "Medium", url: "medium.com › @mrigendraschauhan",
    title: "What Would It Cost to Own the Earth? · Mrigendra Singh Chauhan",
    snippet: "A back-of-envelope sizing that ends at $5 quadrillion a year, and an argument for stewardship over ownership.",
    href: "https://medium.com/@mrigendraschauhan/what-would-it-cost-to-own-the-earth-1ba0d6d29825"
  }
];

// Chatbot knowledge base. The real build replaces this with an LLM grounded in the résumé files.
window.KB = [
  { q: "What's his strongest project?", k: ["strongest", "best", "proud", "project", "anu", "244"],
    a: "At ANU he ranked 244 countries by climate risk under 1.5°C and 2.7°C pathways and found a 5× swing in population at risk (2B → 0.4B). Policymakers got a ranked, decision-ready view instead of a report.",
    s: ["Résumé › ANU internship"] },
  { q: "Why Founder's Office?", k: ["founder", "office", "why", "cos", "chief"],
    a: "His best work has been taking an ambiguous, undocumented problem and making it decision-ready, then shipping. EIKCAI went from concept to market in 23 days and made ₹1.3L in 40 days.",
    s: ["Résumé › EIKCAI", "Résumé › Summary"] },
  { q: "Does he have full-time work experience?", k: ["full-time", "fulltime", "job", "experience", "work", "corporate", "years"],
    a: "Not yet. His experience is research in India, Canada and Australia, plus ventures at Masters' Union. He states this openly in the forecast's \"chance of rain\".",
    s: ["Résumé › Internships", "Weather › Gaps"] },
  { q: "What tools does he use?", k: ["tools", "stack", "excel", "sql", "python", "power bi", "software", "tech"],
    a: "Excel, Power BI, SQL, Python (Pandas, NumPy), R and Google Earth Engine for analysis. Claude, Lovable, Vercel, Render, Supabase, n8n and Make for building.",
    s: ["Résumé › Skills"] },
  { q: "Has he published research?", k: ["publish", "paper", "springer", "research", "journal"],
    a: "Yes. He is second author on a 2025 paper in Earth Systems and Environment (Springer) on carbon sequestration in Canada's Acadian forests, built during his Mitacs internship at UNB.",
    s: ["Scholar tab", "Résumé › Publications"] },
  { q: "Has he led people?", k: ["lead", "leadership", "team", "manage", "people", "cyclothon", "senator"],
    a: "He was Overall Coordinator of the PRAYATNA Cyclothon at IIT Guwahati (180+ cyclists, ₹65K from ASACS, Monster Energy onboarded) and served as PG Senator.",
    s: ["Résumé › Leadership"] },
  { q: "What did he build with AI?", k: ["ai", "built", "build", "engage", "app", "product", "ml"],
    a: "ENGAGE, a no-sign-up meeting companion for Meet, Zoom, Teams and Zoho with live polls, Q&A and a host mood view. Also a chess-board reader (99.8% accuracy) and a BERT text classifier (96%).",
    s: ["Résumé › Projects", "GitHub"] },
  { q: "Is he open to relocation?", k: ["relocat", "location", "move", "city", "remote", "where"],
    a: "That isn't in my notes yet, so I won't guess. Email him and he'll answer directly.",
    s: [] }
];

// Stops on the Earth tab, in route order
window.STOPS = [
  { id: "bhopal", name: "Bhopal", place: "Madhya Pradesh, India", when: "2015–2021", layer: "foundations", coords: [77.41, 23.26],
    title: "Foundations", photo: "UIT RGPV / street play",
    text: "CBSE schooling, then B.Tech in Civil Engineering at UIT RGPV (82.6%). Rural surveys under Unnat Bharat Abhiyan, and a street play at Manthan'18.",
    result: ["96.9", "GATE percentile, top 3.1%"] },
  { id: "guwahati", name: "Guwahati", place: "Assam, India", when: "2022–2024", layer: "leadership", coords: [91.74, 26.14],
    title: "IIT Guwahati", photo: "IITG campus / Cyclothon",
    text: "M.Tech in Earth System Science on an MoE scholarship (85.6%). PG Senator. Ran the PRAYATNA Cyclothon: ₹65K from ASACS, Monster Energy onboarded.",
    result: ["180+", "cyclists mobilised"] },
  { id: "fredericton", name: "Fredericton", place: "New Brunswick, Canada", when: "Jan–May 2024", layer: "research", coords: [-66.64, 45.96],
    title: "Mitacs Globalink · UNB", photo: "UNB / Acadian forest",
    text: "Reverse-engineered an undocumented Harvard ecosystem model, calibrated it with LiDAR data, and forecast 3 carbon pools to 2075. Published in Springer's Earth Systems and Environment.",
    result: ["97.5%", "correlation with NASA MODIS"] },
  { id: "canberra", name: "Canberra", place: "ACT, Australia", when: "Jun–Aug 2024", layer: "research", coords: [149.13, -35.28],
    title: "ANU Future Research Talent", photo: "ANU / Canberra",
    text: "One of 70 selected in India. Scenario analysis of 1.5°C vs 2.7°C pathways across 244 countries, ranked into a decision-ready view for policymakers.",
    result: ["5×", "swing in population at risk"] },
  { id: "gurugram", name: "Gurugram", place: "Haryana, India", when: "2026 → now", layer: "ventures", coords: [77.03, 28.46],
    title: "Masters' Union", photo: "Masters' Union / EIKCAI stall",
    text: "PGP in Technology & Business Management on scholarship. Founded EIKCAI, shipped ENGAGE, joined the Consulting Club core team (8 of 470+), won Wingwoman.sim.",
    result: ["₹1.3L", "revenue in 40 days"] }
];

window.SCHOLAR = [
  { title: "Exploring the Multifaceted Carbon Sequestration Potential of Acadian Forests: A Detailed Study Integrating LiDAR Data and Environmental Influences",
    meta: "CS Utla, MS Chauhan, BK Yadav, A Dashora, R Mishra, Y Zhang · Earth Systems and Environment, 2025 · Springer",
    href: "https://doi.org/10.1007/s41748-025-00817-6" },
  { title: "Modelling Tree Environment Interaction for Prediction of Forest Ecosystem Production",
    meta: "MS Chauhan · M.Tech thesis, IIT Guwahati, 2024", href: null },
  { title: "Flood Susceptibility Mapping of Ballia District, Uttar Pradesh",
    meta: "MS Chauhan et al. · RCRM-2024, IIT Guwahati & IIT Jammu", href: null },
  { title: "Physio-chemical and Bacteriological Quality Assessment of Surface Water",
    meta: "MS Chauhan · B.Tech thesis, UIT RGPV, 2021", href: null }
];

window.NEWS = [
  { src: "Masters' Union", when: "Oct 2026", title: "Wins 1st place at Wingwoman.sim, the Business Club's entrepreneurship event" },
  { src: "Bloomberg for Education", when: "Sep 2026", title: "Earns the Bloomberg ESG certificate" },
  { src: "Masters' Union", when: "2026", title: "Selected to the Consulting Club core team: 8 of 470+ students" },
  { src: "Springer", when: "Oct 2025", title: "Forest carbon paper published in Earth Systems and Environment" },
  { src: "ANU", when: "Jun 2024", title: "One of 70 students in India chosen for the Future Research Talent Award" },
  { src: "Mitacs", when: "Jan 2024", title: "Receives the Globalink Research Award, Shastri Indo-Canadian Institute" },
  { src: "IIT Guwahati", when: "Jan 2023", title: "Leads PRAYATNA Cyclothon with 180+ riders" }
];

window.IMAGES = [
  "Headshot", "IIT Guwahati campus", "PRAYATNA Cyclothon", "UNB, Fredericton", "Acadian forest fieldwork",
  "ANU, Canberra", "EIKCAI stall", "EIKCAI products", "ENGAGE screenshots", "Wingwoman.sim win", "Consulting Club", "Manthan'18 street play"
];

// Career "hourly" strip on the Weather tab. Same for every company.
window.HOURLY = [
  // v = how much each stop raised the "temperature" (rough momentum score for the chart)
  { t: "2017", icon: "partly", label: "B.Tech", v: 62 },
  { t: "2022", icon: "sun", label: "GATE 96.9", v: 70 },
  { t: "2023", icon: "sun", label: "IITG", v: 74 },
  { t: "Jan 24", icon: "sun", label: "UNB", v: 80 },
  { t: "Jun 24", icon: "sun", label: "ANU", v: 85 },
  { t: "Oct 25", icon: "sun", label: "Paper", v: 87 },
  { t: "2026", icon: "wind", label: "EIKCAI", v: 84 },
  { t: "Now", icon: "sun", label: "MU", v: 90 }
];

// One entry per company you apply to. Open the site with ?for=<key>, e.g. ?for=climate-startup
window.COMPANIES = {
  default: {
    company: "Your company", role: "Founder's Office Associate", city: "Your HQ",
    temp: 84, condition: "Mostly sunny", hi: 92, lo: 70,
    headline: "Strong fit for a fast-growing team that needs someone to structure the unstructured.",
    days: [
      { d: "Week 1", icon: "partly", t: "Learn the business: shadow founders, read every dashboard", hi: 80, lo: 65 },
      { d: "Week 2", icon: "sun", t: "Map the top 3 open problems as issue trees", hi: 85, lo: 70 },
      { d: "Day 30", icon: "sun", t: "Ship a market-sizing model for the next bet", hi: 90, lo: 74 },
      { d: "Day 60", icon: "wind", t: "Run one cross-functional launch end to end", hi: 92, lo: 76 },
      { d: "Day 90", icon: "sun", t: "Own a recurring founder review and its numbers", hi: 94, lo: 80 }
    ],
    details: [
      ["UV index", "Very high", "Market sizing: 244 markets ranked"],
      ["Wind", "23 days", "Concept to market at EIKCAI"],
      ["Visibility", "3 countries", "Research in India, Canada, Australia"],
      ["Pressure", "180+", "Cyclists and sponsors coordinated"],
      ["Humidity", "High", "Comfort with ambiguity: undocumented model rebuilt"],
      ["Chance of rain", "30%", "No full-time corporate role yet"]
    ]
  },
  "climate-startup": {
    company: "Sample climate-tech startup", role: "Founder's Office Associate", city: "Bengaluru",
    temp: 91, condition: "Clear skies", hi: 95, lo: 78,
    headline: "Rare overlap: climate research depth plus a founder's bias to ship.",
    days: [
      { d: "Week 1", icon: "sun", t: "Read the carbon methodology; meet every team lead", hi: 88, lo: 72 },
      { d: "Week 2", icon: "sun", t: "Size the next market with scenario analysis", hi: 90, lo: 76 },
      { d: "Day 30", icon: "sun", t: "Investor-ready climate risk view for the board", hi: 93, lo: 78 },
      { d: "Day 60", icon: "partly", t: "Pilot launch with one enterprise customer", hi: 92, lo: 77 },
      { d: "Day 90", icon: "sun", t: "Own the ESG and impact reporting cadence", hi: 95, lo: 80 }
    ],
    details: [
      ["UV index", "Extreme", "Scenario modelling: 1.5°C vs 2.7°C, 244 countries"],
      ["Wind", "23 days", "Concept to market at EIKCAI"],
      ["Visibility", "2075", "Published carbon forecasts to 2075"],
      ["Air quality", "Good", "Bloomberg ESG + IIM-B ESG certified"],
      ["Humidity", "High", "Undocumented Harvard model rebuilt and calibrated"],
      ["Chance of rain", "20%", "No full-time startup role yet"]
    ]
  },
  "consulting-firm": {
    company: "Sample strategy consulting firm", role: "Associate Consultant", city: "Gurugram",
    temp: 82, condition: "Partly cloudy", hi: 88, lo: 68,
    headline: "Hypothesis-driven and structured; client-facing reps are still building.",
    days: [
      { d: "Week 1", icon: "partly", t: "Ramp on the industry; build the client's issue tree", hi: 78, lo: 64 },
      { d: "Week 2", icon: "sun", t: "Market sizing and data pulls for the hypothesis", hi: 84, lo: 70 },
      { d: "Day 30", icon: "sun", t: "Own one workstream's analysis and exhibits", hi: 86, lo: 72 },
      { d: "Day 60", icon: "partly", t: "Present a module to the client team", hi: 84, lo: 70 },
      { d: "Day 90", icon: "sun", t: "Scenario model that changes a client decision", hi: 88, lo: 74 }
    ],
    details: [
      ["UV index", "Very high", "MECE structuring, issue trees, market sizing"],
      ["Wind", "Fast", "Consulting Club core team (8 of 470+)"],
      ["Visibility", "244 markets", "Decision-ready ranking for policymakers"],
      ["Pressure", "Steady", "Case competitions: Wingwoman.sim winner"],
      ["Humidity", "Medium", "Stakeholder management across 3 countries"],
      ["Chance of rain", "40%", "No prior client-facing consulting role"]
    ]
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
    "cross-functional": "Cross-functional execution: Cyclothon", "problem solving": "MECE and issue trees",
    "ai": "Built ENGAGE and AI automations", "data": "Data analysis: Python, SQL, Earth Engine", "founder": "Founder of EIKCAI"
  },
  gap: {
    "years of experience": "Full-time years of experience", "3+ years": "3+ years full-time", "5+ years": "5+ years full-time",
    "java": "Java", "react": "Production React", "sales quota": "Quota-carrying sales", "cfa": "CFA",
    "investment banking": "Investment banking", "people management": "Managing direct reports", "chartered": "CA qualification"
  }
};
