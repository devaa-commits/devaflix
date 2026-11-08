// DEVAFLIX content. Edit this file to add, reorder or update titles.
// category: ai | routing | hygiene | reputation | tooling | lab
// status: "Live" | "In progress" | "Prototype"
// top: 1-10 puts it in the Top 10 row; featured: true puts it in the hero rotation.
window.PORTFOLIO = {
  owner: {
    name: "Deva Anandhan",
    title: "GTM Engineer · Sales & RevOps, Vendasta",
    about: "I build the GTM automation and AI layer behind Vendasta's revenue engine and own the RevOps automation estate across Vendasta and Broadly by Vendasta. Lead routing, CRM hygiene, AI employees, listings and reputation ops, internal apps. Platform-native first, dry-run by default, every write logged.",
    links: [{ label: "GitHub", href: "https://github.com/devaa-commits" }]
  },

  units: [
    { id: "Vendasta", name: "Vendasta (channel)" },
    { id: "Broadly", name: "Broadly by Vendasta (direct SMB)" },
    { id: "Franchise", name: "franchise partner" }
  ],

  categories: [
    { id: "routing", look: "routing", name: "Lead Routing & Pipeline", short: "Lead Routing", row: "Lead Routing & Pipeline", early: true, sub: "the engine every inbound lead runs through" },
    { id: "ai", look: "ai", name: "AI Agents & LLM", short: "AI Agents", row: "AI Agents & AI Employees" },
    { id: "workforce", look: "workforce", name: "AI Workforce", short: "AI Workforce", row: "AI Workforce: The Cast", early: true, sub: "12 AI employees, scored hourly against their own rubrics" },
    { id: "hygiene", look: "hygiene", name: "Data Hygiene & CRM", short: "Data Hygiene", row: "Data Hygiene & CRM Cleanup" },
    { id: "reputation", look: "reputation", name: "Listings & Reputation", short: "Listings & Reviews", row: "Listings & Reputation Ops" },
    { id: "tooling", look: "tooling", name: "RevOps Tooling & Internal Apps", short: "RevOps Apps", row: "RevOps Tooling & Internal Apps" },
    { id: "lab", look: "lab", name: "Hackathon & Prototypes", short: "Hackathon", row: "Hackathon Originals & Pilots" }
  ],

  profiles: [
    { id: "all", villain: "madara", img: "assets/profiles/madara.jpg", credit: { by: "JoeInQueens", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:NYCC_2011_-_Madara_Uchiha_(6272588773).jpg" }, villainName: "Madara", name: "Everything", sub: "Full catalog", initial: "D", color: "linear-gradient(135deg,#e50914,#831010)", view: "all" },
    { id: "vmf", villain: "eren", img: "assets/profiles/eren.jpg", credit: { by: "GabboT", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:Cosplay_of_Eren_Yeager.jpg" }, villainName: "Eren", name: "Vendasta", sub: "Vendasta channel", initial: "V", color: "linear-gradient(135deg,#0077b6,#03045e)", view: "unit:Vendasta" },
    { id: "prbs", villain: "blackbeard", img: "assets/profiles/blackbeard.jpg", credit: { by: "stupid systemus", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Otakon_2013_-_Blackbeard_Cosplayer.jpg" }, villainName: "Blackbeard", name: "Broadly", sub: "Broadly direct", initial: "B", color: "linear-gradient(135deg,#f48c06,#9d0208)", view: "unit:Broadly" },
    { id: "ai", villain: "ultron", img: "assets/profiles/ultron.jpg", credit: { by: "Pat Loika", license: "CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Cosplay_Ultron_Dragon_Con_2013.jpg" }, villainName: "Ultron", name: "AI Lab", sub: "Agents & LLMs", initial: "AI", color: "linear-gradient(135deg,#f72585,#3a0ca3)", view: "cat:ai" },
    { id: "kids", villain: "loki", img: "assets/profiles/loki.jpg", credit: { by: "William Tung", license: "CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:WonderCon_2015_-_Loki_cosplay_-_without_background.jpg" }, villainName: "Loki", name: "Data Nerds", sub: "Hygiene & CRM", initial: "Δ", color: "linear-gradient(135deg,#52b788,#081c15)", view: "cat:hygiene" }
  ],

  // Extra themed rows on the Home view (unit rows only show on Home)
  rows: [
    { title: "Built for Vendasta", unit: "Vendasta" },
    { title: "Built for Broadly", unit: "Broadly" },
    { title: "Claude Code Plugins", tag: "plugin" },
    { title: "Apps Script Originals", tag: "apps-script" },
    { title: "Partner Specials: Franchise", unit: "Franchise" }
  ],

  projects: [
    {
      id: "lead-routing-engine", title: "Lead Routing Engine", top: 1, featured: true,
      category: "routing", unit: "Vendasta + Broadly", status: "Live", year: "2026",
      role: "Owner & operator: routing logic, AI employees, monitoring and scorecard",
      logline: "Every inbound lead tiered, researched, ICP-scored, owned and opp'd in about three minutes, with five AI employees on the line.",
      problem: "Leads arrive from 7+ conversion points: demo forms, webinars, content, Yext, MatchCraft, paid social and the Broadly demo form. Each one needs a tier, an ICP score, the right owner, an opportunity and sometimes a handoff to Broadly. A human queue takes hours and routes inconsistently.",
      how: "V.10.AI.8 Auto Assign runs on every new Vendasta company. It holds 2 minutes, then Enrichy Rich researches the lead and The Hams-Tier sizes it (with an employee-count fallback and retry). A conversion-point router and three segment × tier checks (Direct Enterprise, Vertical, High-tier Agency) run next, then Point Guard scores ICP fit. The lead is assigned to an AE, to SanDRa's AI-caller lanes or to round-robin, and a Marketing- or Sales-Led opportunity is created. SMB-classified leads are handed to Broadly by webhook, where the Direct Point Guard scores paid-social leads into Kixie powerlists. The Error Watcher monitors it, the routing funnel measures it, and the Scorecards grade every AI employee hourly.",
      stack: ["Vendasta Automations", "AI Workforce (5 AI employees)", "Vendasta CRM", "Kixie", "Google Chat", "Cloud Functions"],
      tags: ["agents"],
      impact: [
        { v: "2,117", l: "inbound leads a month" },
        { v: "110", l: "routing-related automations owned (71 Vendasta / 39 Broadly)" },
        { v: "93.2%", l: "of graded leads land with the right owner" },
        { v: "4,129", l: "Broadly paid-social leads scored a month" }
      ],
      episodes: [
        { t: "The Gatekeeper", d: "The Hams-Tier sizes 2,118 leads a month at 97.5% tier accuracy and a 36s median. Six employee-count branches back it up when the tier is missing." },
        { t: "Research & ICP", d: "Enrichy Rich builds the profile and Point Guard scores agency, ISV and franchise fit, writing an AI ICP score and reasoning note to the CRM." },
        { t: "The Router", d: "Seven conversion-point branches and three segment × tier checks send each lead to an AE, an AI caller lane or round-robin, then create the right opportunity." },
        { t: "The Handoff", d: "SMB leads leave Vendasta for Broadly by webhook, so the channel team only works channel deals." },
        { t: "AI Caller Lanes", d: "SanDRa calls lower-tier leads, with a fallback to Kixie powerlists when it can't connect." },
        { t: "Guardrails", d: "15-minute error alerts, an hourly AI employee scorecard, and a funnel that tags every leak by cause." }
      ]
    },
    {
      id: "revops-ai-team", title: "RevOps AI Team", top: 2, featured: true,
      category: "ai", unit: "Vendasta + Broadly", status: "Prototype", year: "2026",
      logline: "A whole RevOps analyst workload rebuilt as seven proposal-only AI employees, each named after an anime hero.",
      problem: "When the RevOps analyst seat went empty, CRM hygiene, monthly audits, pipeline cleanup and automation audits all landed on one person. Their Jira history held 241 issues in four months, mostly spam and dupe checks.",
      how: "Mined the old Jira tickets, SOP docs, workbooks and a recorded walkthrough to scope seven workstreams, then gave each to a scheduled bot. Every bot is read-only and sends proposals for approval. Each has a signed-off process doc.",
      stack: ["Grok Bot routines", "Vendasta CRM MCP", "LightDash", "Jira", "Partner Center", "Automations API"],
      tags: ["agents"],
      impact: [
        { v: "290K+", l: "Vendasta companies scanned" },
        { v: "95%", l: "dupe-pair agreement with answer key, 0 false positives" },
        { v: "684", l: "stale (90d+) opportunities surfaced" },
        { v: "38", l: "cloned Broadly automations found by the audit bot" }
      ],
      episodes: [
        { t: "Naruto: Duplicates", d: "Daily dupe sweep that matched 77 of 81 pairs from the hand-built answer key." },
        { t: "Mikasa: General Hygiene", d: "Weekday digest plus a check for unassigned companies every 2 hours, across 291K companies." },
        { t: "Zoro: Pipeline Cleanup", d: "Finds opportunities stuck over 90 days, broken down by pipeline." },
        { t: "L, Spike & Edward: The Auditors", d: "Monthly lead-pool audit, quarterly delinquent-partner audit (30 mis-routed of 2,936), and validation of injected lead uploads." },
        { t: "Senku: Automation Audit", d: "Lists 606 Vendasta automations and catches Zapier and copy-paste sprawl in Broadly." },
        { t: "The Spec Room", d: "Seven automation build specs with flowcharts, plus a Jira epic with 7 stories. Live fixes run on smart lists and bulk audits stay as scripts." }
      ]
    },
    {
      id: "debug-agent", title: "AI Chatbot Debug Agent", top: 3, featured: true,
      category: "ai", unit: "Franchise", status: "Live", year: "2026",
      logline: "Paste a Jira key. Three minutes later you have a diagnosis, a prompt fix and a QA verdict.",
      problem: "Each AI-receptionist bug ticket took 2–4+ hours of manual cross-checking across Jira, the conversation inbox, GCP logs and the assistant config.",
      how: "A 9-step multi-agent pipeline pulls the ticket, conversation, config and callable functions. An analyzer agent classifies the issue as prompt, dev or automation. A prompt-fixer agent proposes a minimal patch, a QA agent writes acceptance criteria, and a tester validates against live calls. A FastAPI server streams progress over SSE to a React dashboard.",
      stack: ["Python", "FastAPI + SSE", "React", "Multi-model LLM routing", "MCP", "Jira API", "GCP Logging"],
      tags: ["agents"],
      impact: [
        { v: "~95%", l: "less debug time (4h+ → 60–180s)" },
        { v: "110+", l: "production runs on partner tickets" },
        { v: "10", l: "audit files saved per run" }
      ],
      episodes: [
        { t: "Pilot: Citizen Developer RFC", d: "Mapped how debugging was done across four systems and wrote the RFC and Phase 1 spec." },
        { t: "Hackathon Cut", d: "Shipped the end-to-end pipeline and live dashboard for the March 2026 hackathon." },
        { t: "Production Season", d: "Ran on real partner tickets from March to August 2026. Prompt surgery on booking, lead capture and fee-disclosure modules." }
      ]
    },
    {
      id: "automation-builder", title: "Vendasta Automation Builder", top: 4, featured: true,
      category: "lab", unit: "Vendasta", status: "Prototype", year: "2026",
      logline: "Describe the workflow in plain English. Get back a validated Vendasta automation, never a silently broken webhook.",
      problem: "Automations that touch outside systems (webhooks, API, Zapier, QuickBooks, ServiceMonster) fail silently. Payload keys must be declared by hand and field names differ for every action.",
      how: "A Claude Code plugin with 7 skills. It plans first, researches the external payload and auth, asks for every input in one batch, and builds through a guarded Automata MCP CLI in a stopped state only. It then validates and previews, and falls back to driving Partner Center through Claude in Chrome when the token is read-only.",
      stack: ["Claude Code plugin", "Automata MCP", "Python CLI", "Claude in Chrome", "GitHub Actions"],
      tags: ["plugin", "agents"],
      impact: [
        { v: "227/227", l: "tests passing" },
        { v: "7.1 → 9.5", l: "QA score across iterations" },
        { v: "115+", l: "triggers catalogued" },
        { v: "131", l: "actions catalogued" }
      ],
      episodes: [
        { t: "The Catalog", d: "Harvested a live trigger and action catalog from prod Vendasta, with exact input keys and gates." },
        { t: "Plan, Don't Publish", d: "Plan spec for approval, batched input questions, stopped-state builds only." },
        { t: "Hackathon Week", d: "v0.3.2 → v0.4.1 in two days, with 4 teammate-reported bugs fixed and the demo video shipped." }
      ]
    },
    {
      id: "rep-onboarding", title: "AI Reputation One-Click Onboarding", top: 5, featured: true,
      category: "reputation", unit: "Broadly", status: "Live", year: "2026",
      logline: "A 30-minute, 16-task setup checklist became a 2-minute hands-off launch.",
      problem: "Every AI Reputation Specialist setup meant about 16 manual tasks across 6 phases, hundreds of times a month.",
      how: "One guarded command reads the Task Manager intake, deploys a tailored review-response persona, enables auto-response and the default template, creates the review-request automation, and completes the tasks with audit-ready notes. Dry-run by default, two-key live writes, idempotent, and wrapped in a small web UI.",
      stack: ["Python", "FastAPI", "Task Manager API", "AI Assistants API", "Reputation API"],
      impact: [
        { v: "15×", l: "faster: ~2 min vs ~30 min per account" },
        { v: "~93%", l: "less setup time" },
        { v: "100%", l: "success on first live batch" }
      ],
      episodes: [
        { t: "Mapping the Checklist", d: "Broke the 16 tasks into what an API can do and what needs a human." },
        { t: "Safety Rails", d: "Dry-run by default, a two-key guard, and an explicit --arm flag before anything customer-facing goes live." },
        { t: "Launch Day", d: "Onboarded 5 real accounts end-to-end in one session with zero rework." }
      ]
    },
    {
      id: "error-watcher", title: "Automation Error Watcher", top: 6,
      category: "tooling", unit: "Vendasta + Broadly", status: "Live", year: "2026",
      logline: "When a revenue automation breaks at 3 a.m., Google Chat knows by 3:15, and someone owns it.",
      problem: "Errors in revenue-critical automations (lead routing, AI outbound, the Broadly handoff, dialer powerlists) went unnoticed until leads were lost.",
      how: "An Apps Script polls Automata every 15 minutes for errored steps across a watchlist. It follows each automation's live version through the versioning API, de-dupes alerts, and posts one enriched Chat message per error. Errors are logged to a Sheet, and a web app gives the team status, notes, owners, trends and a heatmap.",
      stack: ["Google Apps Script", "Automata API", "Service-account JWT", "Google Chat", "Sheets", "Chart.js"],
      tags: ["apps-script"],
      impact: [
        { v: "30", l: "revenue automations watched (9 Vendasta / 21 Broadly)" },
        { v: "15 min", l: "detection window" },
      ],
      episodes: [
        { t: "Silent Failures", d: "Replaced clicking through the Activity tab of each automation." },
        { t: "The Watchlist", d: "Picked the 30 automations that actually move revenue across both account." },
        { t: "The Audit Room", d: "A Vendasta-themed audit dashboard with accountability per owner." }
      ]
    },
    {
      id: "request-hub", title: "RevOps Request Hub", top: 8, featured: true,
      category: "tooling", unit: "Vendasta + Broadly", status: "Live", year: "2026",
      logline: "One form to route them all: from Zapier sprawl to auto-assigned Jira tickets.",
      problem: "RevOps intake ran on several Zapier-backed forms and a Zapier portal, with free-text partner fields and manual triage.",
      how: "A Vendasta Vibe app embeds a single branded Partner Center form with 8 request types and a business/account picker. Each submission updates the requester's CRM contact, which fires an automation that calls a Supabase Edge Function. The function stores the request and creates a REVOPS Jira ticket, auto-assigned from a request-type × BU matrix, then posts to the team Chat space.",
      stack: ["Vendasta Vibe", "Partner Center Forms", "Vendasta Automations", "Supabase Edge Functions", "Jira REST", "Google Chat"],
      impact: [
        { v: "3 → 1", l: "intake forms consolidated" },
        { v: "8", l: "request types auto-routed" },
        { v: "0", l: "Zapier dependencies left" }
      ],
      episodes: [
        { t: "The Twist", d: "An audit of the old Zapier portal found its 3 forms connected to nothing, so submissions had been going nowhere." },
        { t: "Leaving Zapier", d: "Scoped as 1 epic and 15 tickets to move intake fully onto the platform." },
        { t: "The Matrix", d: "An assignment table keyed by request type × business unit, so routing changes need no code." },
        { t: "Go-Live", d: "Form live on 2026-10-23, replacing three per-type forms." }
      ]
    },
    {
      id: "ai-scorecards", title: "AI Workforce Scorecards", top: 7, featured: true,
      category: "ai", unit: "Vendasta + Broadly", status: "Live", year: "2026",
      logline: "Performance reviews for the AI employees, every hour.",
      problem: "No one could tell whether each AI employee (outbound SDR, writer, ICP scorer, enrichment, tiering) was hitting its targets.",
      how: "A Node service signs in with Vendasta and Broadly service accounts, pulls automation step activity into an incremental cache, and runs one calculator per AI employee with its own KPIs and rubric. GitHub Actions refreshes it hourly into Supabase, and a GitHub Pages dashboard shows results and trends.",
      stack: ["Node.js", "Automata API", "Supabase", "GitHub Actions", "GitHub Pages"],
      impact: [
        { v: "13", l: "AI employees scored" },
        { v: "98.2%", l: "Hams-Tier tier accuracy on 1,710 leads" },
        { v: "Hourly", l: "refresh, ~4 min per run" }
      ],
      episodes: [
        { t: "Rubrics", d: "Gave each AI employee its own KPI, target and grading rubric." },
        { t: "Always On", d: "Hourly GitHub Actions refresh with an incremental activity cache." },
        { t: "Next: Dashboard Hub", d: "A 6-tab RevOps hub with an issue inbox, alerts and owners. About 70% built.", }
      ]
    },
    {
      id: "listings-pipeline", title: "Listings Pipeline", top: 10,
      category: "reputation", unit: "Broadly", status: "Live", year: "2026",
      logline: "The listings team's overdue queue, turned into Google-ready bulk uploads automatically.",
      problem: "Google Business Profile listings were built by hand from task queues. Overdues piled up, and businesses already on Google got duplicated.",
      how: "Pulls the Listings Team queue from Task Manager, fetches NAP, hours and categories, and writes the 34-column GBP bulk-upload CSVs. A headless Google check sorts each business into NEW, DUPLICATE or MANUAL CHECK and writes the outcome back to the task. Packaged as a Claude Code plugin, so teammates just say “run the Broadly overdues”.",
      stack: ["Python", "Playwright", "Task Manager API", "Listing Products API", "Claude Code plugin"],
      tags: ["plugin"],
      impact: [
        { v: "9", l: "teammates running it" },
        { v: "51", l: "GBP-ready listings from one team run" },
        { v: "~950", l: "request-access rows auto-classified" }
      ],
      episodes: [
        { t: "v1: CSV Generator", d: "Task queue → GBP bulk CSV, standard and service-area formats." },
        { t: "Duplicate Radar", d: "Automated Google search classifies businesses before upload." },
        { t: "The Plugin", d: "Packaged for the whole team in a private plugin marketplace." }
      ]
    },
    {
      id: "dupe-checker", title: "Duplicate Checker", top: 9,
      category: "hygiene", unit: "Vendasta", status: "Live", year: "2026",
      logline: "Four Costcos walk into a CRM. Only one walks out.",
      problem: "Reps deduped new companies with a 7-step manual search. Upstream automations kept creating duplicates, splitting activity and causing commission disputes.",
      how: "A daily sweep of yesterday's new Vendasta companies. It matches on fuzzy name, phone, normalized domain and email, applies the SOP scenario rules, and scores the surviving account by paid account, then opportunities, activity, contacts and age. Proposals go out as CSVs, dry-run only. Shipped as an installable Claude Code plugin with offline rule tests.",
      stack: ["Python", "Vendasta CRM APIs", "Claude Code plugin"],
      tags: ["plugin"],
      impact: [
        { v: "~85", l: "new companies checked daily" },
        { v: "~4 min", l: "per daily run" },
        { v: "288K", l: "company records in scope" }
      ],
      episodes: [
        { t: "The Rulebook", d: "Turned the dupe-management SOP's five scenarios into code." },
        { t: "Who Survives?", d: "Scoring that picks the main account." },
        { t: "Plugin Drop", d: "/dupe-checker:dupe-check, installable by any teammate." }
      ]
    },
    {
      id: "gtm-docs", title: "GTM Automation Knowledge Base",
      category: "tooling", unit: "Vendasta + Broadly + Yesware", status: "Live", year: "2026",
      logline: "Every live automation and AI employee across three businesses, documented, flowcharted and risk-flagged.",
      problem: "Hundreds of live automations had no single source of truth. Owners were unknown, test flows were left on.",
      how: "Captured every active automation and AI employee from Partner Center. Each got a Markdown doc with owner, process, a Mermaid flowchart, Jira-mapped change history, dependencies and known issues. Published to the team's Git docs site.",
      stack: ["Partner Center", "Automations API", "Markdown + Mermaid", "Docusaurus", "Jira"],
      impact: [
        { v: "382", l: "docs generated" },
        { v: "314", l: "automations documented (Vendasta + Broadly)" },
        { v: "56", l: "AI employees documented" },
        { v: "3", l: "business units covered" }
      ],
      episodes: [
        { t: "The Audit", d: "A read-only capture of every turned-on automation across Vendasta, Broadly and Yesware." },
        { t: "Docs in Git", d: "One doc per automation, with flowcharts and change history." },
        { t: "Risk Register", d: "Unowned automations, live test flows, logic bugs and overlaps, all called out." },
        { t: "Prequel: Fleet Dossier", d: "An earlier inventory of 472 Vendasta automations, with 54 live ones documented in depth." }
      ]
    },
    {
      id: "gtm-ai-org", title: "The GTM AI Org", featured: true,
      category: "ai", unit: "Vendasta + Broadly", status: "In progress", progress: 65, year: "2026",
      logline: "Seventeen AI agents. Ninety-seven automations decoded. One GTM engineer.",
      problem: "The automation library had grown over four years across many authors, with no map, no dedupe guards and hidden risks. Requests got built ad hoc instead of scoped.",
      how: "A Claude Code workspace that runs as an org chart: one chief, four team managers and thirteen workers, with skills for BigQuery-safe queries, catalog lookup and Vendasta RPC. Every request flows REQUEST → PROBLEM → OPTIONS through review gates. Agents are read-only, and live writes need explicit flags.",
      stack: ["Claude Code agents & skills", "Automata", "BigQuery", "Vendasta CRM APIs", "Atlassian MCP", "GitHub MCP"],
      tags: ["agents"],
      impact: [
        { v: "17", l: "agents in the org" },
        { v: "97", l: "Vendasta automations decoded" },
        { v: "318", l: "task definitions catalogued" },
        { v: "28", l: "risks registered" }
      ],
      episodes: [
        { t: "Day Zero", d: "Org, context brief, 90-day goals and KPI ledger, set up the day before starting as GTM Engineer." },
        { t: "Decoding Automata", d: "Knowledge base with an index, dependency graph, six family syntheses and a pattern library." },
        { t: "Build Packages", d: "Every request is scoped before anything gets built." }
      ]
    },
    {
      id: "lead-funnel", title: "Where 2,117 Leads Go",
      category: "routing", unit: "Vendasta", status: "Live", year: "2026",
      logline: "A lead routing scorecard that follows every lead from creation to the right owner.",
      problem: "Leaders saw routing accuracy but not where leads leaked before they ever reached a rep.",
      how: "Reconciled the warehouse against the CRM and walked the funnel stage by stage. Each drop-off is tagged by cause: input, system, rep/pool, or by design.",
      stack: ["BigQuery", "Vendasta CRM", "Lightdash", "HTML"],
      impact: [
        { v: "2,117", l: "leads traced" },
        { v: "93.2%", l: "of graded leads with the right owner" },
        { v: "469", l: "warehouse↔CRM gaps found" }
      ],
      episodes: [
        { t: "The Funnel", d: "2,117 created → 1,577 routable → 783 graded → 730 correctly owned." },
        { t: "Blame the Cause", d: "Each leak tagged so the right team fixes it." }
      ]
    },
    {
      id: "auto-assign-decode", title: "Auto Assign: Decoded",
      category: "routing", unit: "Vendasta + Broadly", status: "Live", year: "2026",
      logline: "A 159-step lead-routing automation, finally readable on one page.",
      problem: "The live Vendasta Auto Assign automation decides every lead's owner, pipeline and probability, but no one could read it end to end.",
      how: "Reverse-engineered the live automation from Partner Center captures and diffed it against V.9. Drew all 7 stages and 159 steps: AI tiering, conversion-point router, Direct Enterprise → SMB transfer to Broadly, Vertical, agency scoring and four AI-caller lanes. Ends in a routing outcomes table (segment × tier × country → owner, pipeline, probability).",
      stack: ["Automata", "HAR analysis", "Flowcharting"],
      impact: [{ v: "159", l: "steps mapped" }, { v: "7", l: "routing stages" }, { v: "1", l: "real change found vs V.9" }],
      episodes: [
        { t: "What Changed?", d: "Lead tier now comes from employee count instead of fixed values." },
        { t: "The Map", d: "Every lane, from AI tiering to the SMB handoff to Broadly." }
      ]
    },
    {
      id: "sales-org-map", title: "Sales Org & Pipeline Map",
      category: "routing", unit: "Vendasta + Broadly + Yesware", status: "Live", year: "2026",
      logline: "Every sales team across three businesses, mapped to its motion.",
      problem: "No single view tied sales teams to motions, pipelines and the automations that feed them.",
      how: "Combined Partner Center Sales Teams, live automations and the org chart to map each team to Channel / Vertical / Direct Enterprise × Acquisition / Expansion / Retention, including how Broadly pipelines work.",
      stack: ["Partner Center", "Vendasta Automations", "CRM"],
      episodes: [{ t: "Teams × Motions", d: "One grid for Vendasta, Broadly and Yesware." }]
    },
    {
      id: "referral-program", title: "Referral Partner Program",
      category: "routing", unit: "Vendasta + Broadly", status: "In progress", progress: 85, year: "2026",
      logline: "Signed agreement in, assigned opportunity out, and the referrer gets paid.",
      problem: "The restarted partner referral program ran on memory and spreadsheets, from signed agreement through to the quarterly payout.",
      how: "Chained automations A1–A8 link Vendasta automations, Apps Script, Forms, Sheets and Chat. A signed agreement tags the partner, and multi-referral forms are split into one row per company. Each company is pre-checked against the right CRM (Vendasta or Broadly) for dupes, activity and ICP fit. Approval cards go to Google Chat. On approval, the company and opportunity are created and tagged, an AE is assigned, and duplicate auto-assigned opps are closed.",
      stack: ["Google Apps Script", "Vendasta Automations", "CRM & Opportunities APIs", "Google Forms/Sheets", "Google Chat"],
      tags: ["apps-script"],
      impact: [
        { v: "8", l: "automations chained end-to-end" },
        { v: "2", l: "business units on one form" },
        { v: "E2E", l: "passed on a test partner" }
      ],
      episodes: [
        { t: "A1–A4: Intake", d: "Agreement webhook, then form splitting." },
        { t: "A5–A6: Pre-check & Approval", d: "CRM checks and Chat approval cards." },
        { t: "A7–A8: Create & Assign", d: "Tagging, Affiliate ID, AE assignment, and duplicate-opp cleanup." },
        { t: "Coming Soon: A9", d: "Contract tracking, plus a Vibe app on Supabase for Phase 2." }
      ]
    },
    {
      id: "gmr-resellers", title: "Reseller Import",
      category: "routing", unit: "Vendasta", status: "Live", year: "2026",
      logline: "Ninety resellers, zero duplicates, every write snapshotted.",
      problem: "A reseller prospect list needed loading into Vendasta without dupes, and the matching lead-pool accounts needed reassigning to the right rep.",
      how: "Dupe-checked the list with the Duplicate Checker rules and enriched it with Clay. A guarded push then reassigns lead-pool accounts, tags existing ones, and creates new companies with linked contacts. Every record is snapshotted before it is written.",
      stack: ["Python", "Clay", "Vendasta CRM APIs"],
      impact: [
        { v: "63", l: "accounts updated & routed" },
        { v: "17", l: "net-new companies created" },
        { v: "74", l: "dialer-ready rows" }
      ],
      episodes: [{ t: "Snapshot, Then Write", d: "Every change is reversible from the pre-write snapshot." }]
    },
    {
      id: "crm-hygiene", title: "Segment & Tier Fixer",
      category: "hygiene", unit: "Vendasta", status: "Live", year: "2026",
      logline: "A daily manual review of thousands of rows, cut to about 20.",
      problem: "Free-text Segment and Lead Tier values on Vendasta companies broke routing and reporting.",
      how: "Maps non-approved segments to the approved list and recomputes tier from the tier table (billed clients, employees). Results split into safe auto-update CSVs and human-review CSVs.",
      stack: ["Python", "Vendasta CRM export"],
      impact: [
        { v: "6,379", l: "companies processed" },
        { v: "5,609", l: "tier fixes ready to bulk-apply" },
        { v: "1,339", l: "segments routed to review" }
      ],
      episodes: [{ t: "Auto vs Review", d: "Confident fixes get bulk-applied. Ambiguous ones go to a human." }]
    },
    {
      id: "review-closer", title: "Review Response Auto-Closer",
      category: "reputation", unit: "Marketing Services", status: "Live", year: "2026",
      logline: "The AI already answered the review. This closes the ticket.",
      problem: "The reputation team opened every review-response task by hand to check whether a reply was already posted, and most already were.",
      how: "Searches two task queues by ReviewID, batch-reads the reviews, and closes only tasks with a live posted reply, children before parents. Each review is re-read just before closing and every close is verified. Dry-run mode, append-only log.",
      stack: ["Python", "Task Manager API", "Reputation ReviewService API"],
      impact: [
        { v: "2,071", l: "tasks auto-closed" },
        { v: "52", l: "logged runs" }
      ],
      episodes: [{ t: "Trust but Verify", d: "Never closes a task whose reply is pending or failed." }]
    },
    {
      id: "nbly-audit", title: "Who Touched the Bot?",
      category: "hygiene", unit: "Franchise", status: "Live", year: "2026",
      logline: "A forensic sweep of 4,000 franchise AI receptionists before a central prompt push.",
      problem: "Central prompt pushes risked overwriting changes franchisees had made themselves, and no one could see who had edited what.",
      how: "Sweeps every chat and voice receptionist config concurrently and resumably, and classifies editors as automation, partner staff or client using IAM roles. Knowledge sources carry no author, so a per-brand cohort fingerprint flags the ones that look client-typed.",
      stack: ["Python", "AI Assistants API", "IAM API", "ThreadPool concurrency"],
      tags: ["agents"],
      impact: [
        { v: "4,008", l: "accounts swept" },
        { v: "438", l: "client-modified bots protected" }
      ],
      episodes: [{ t: "Cohort Fingerprinting", d: "A source that recurs across a brand was pushed centrally. A unique one was typed by the client." }]
    },
    {
      id: "rbw-provisioning", title: "Franchise Bulk Provisioning",
      category: "tooling", unit: "Franchise", status: "Live", year: "2026",
      logline: "Three hundred franchise locations stood up in one run. No clicks, no stray emails.",
      problem: "Onboarding hundreds of franchise accounts meant manual setup across six-plus Partner Center screens per account.",
      how: "Resumable scripts create each account group with NAP and categories, set custom IDs, and create the owner user with no welcome email. They also upload logos, set hours and connect the integration. Follow-up scripts handle welcome emails, branded sender domains and post-rebrand name syncs.",
      stack: ["Python", "Account Group API", "Platform Users API", "Integrations API", "Email-domain API"],
      impact: [
        { v: "~300", l: "accounts provisioned" },
        { v: "~300", l: "name re-syncs after rebrand" }
      ],
      episodes: [{ t: "Quiet Launch", d: "Users created without emails, which went out only when the partner was ready." }]
    },
    {
      id: "calendar-bot", title: "Calendar Bot",
      category: "ai", unit: "Internal", status: "Live", year: "2026",
      logline: "Every meeting ends with tickets, not just good intentions.",
      problem: "Action items from Meet calls got lost in long transcripts, especially across an IST night shift.",
      how: "An hourly Apps Script finds Meet events that ended recently, reads the transcript, and asks Claude (or Gemini) for a structured summary, decisions, owners, due dates and risks. It writes a notes Doc and can open one Jira ticket per action item. Rolled out to the team with a 15-minute setup guide.",
      stack: ["Google Apps Script", "Claude API", "Gemini", "Calendar/Drive/Docs", "Jira REST"],
      tags: ["apps-script", "agents"],
      impact: [{ v: "~15 min", l: "teammate setup" }, { v: "1/hr", l: "auto-processing during shift" }],
      episodes: [{ t: "Team Rollout", d: "Teammates copy a template and add their own key." }]
    },
    {
      id: "levi", title: "Levi: AI Receptionist Advisor",
      category: "lab", unit: "Franchise", status: "Prototype", year: "2026",
      logline: "Talk to your AI receptionist's manager in plain English.",
      problem: "Business owners running AI receptionists can't measure performance, spot problems or tune behaviour. That opacity drives churn.",
      how: "A FastAPI platform with health trends, conversation sync, a deploy gate with rollback, alerts, experiments and a streamed advisor chat. Specialist agents cover revenue leaks, conversation coaching, knowledge gaps and compliance (HIPAA, TCPA, Fair Housing).",
      stack: ["Python", "FastAPI", "Gemini 2.5", "React", "SQLite"],
      tags: ["agents"],
      impact: [{ v: "$1.45M", l: "sized ARR opportunity (estimate)" }, { v: "4", l: "specialist agents" }],
      episodes: [{ t: "Hackathon Pitch", d: "Built on the Debug Agent's analyzer, fixer and QA agents." }]
    },
    {
      id: "voice-prompts", title: "Prompt Surgery",
      category: "ai", unit: "Franchise", status: "Live", year: "2026",
      logline: "Production prompt fixes for franchise AI receptionists and voice agents.",
      problem: "Booking, lead-capture and fee-disclosure behaviour drifted on partner voice and chat agents.",
      how: "Rewrote and patched prompt modules for specific partner tickets, much of it found and validated through the Debug Agent pipeline.",
      stack: ["Prompt engineering", "Voice AI", "AI Assistants"],
      tags: ["agents"],
      episodes: [
        { t: "Appointment Booking", d: "Fixed availability and confirmation logic." },
        { t: "Lead Capture & Fees", d: "Made default lead capture and fee disclosure consistent." }
      ]
    },
    {
      id: "morning-recap", title: "Morning Recap",
      category: "lab", unit: "Partner", status: "In progress", progress: 30, year: "2026",
      logline: "Yesterday's AI calls, digested into one 7 a.m. email, with an upsell nudge.",
      problem: "A home-services customer wanted one daily digest of non-urgent Voice AI calls instead of a stream of alerts.",
      how: "Feasibility checked against the live Automata catalog of 261 task definitions. Two build paths are specced: native no-code (~1 day) or a small script (~3 days, recommended).",
      stack: ["Automata", "Voice AI", "AI Assistant CRM capability"],
      episodes: [{ t: "Build Spec", d: "Schedule trigger, plus CRM data capability with date filtering." }]
    },
    {
      id: "gtm-blueprint", title: "GTM Blueprint",
      category: "routing", unit: "Vendasta", status: "In progress", progress: 25, year: "2026",
      logline: "The plan for an AI-run sales floor.",
      problem: "SDR follow-up, pipeline hygiene and SLA enforcement relied on rep discipline.",
      how: "A roadmap with three parts. An AI SDR productivity system turns call transcripts into JSON insights, CRM updates and draft follow-ups with confidence scores. A pipeline health engine adds stage criteria, aging timers and stall alerts. The third part is SLA enforcement.",
      stack: ["CRM", "Transcription", "LLM layer"],
      episodes: [
        { t: "AI SDR Copilot", d: "Call → insight → CRM update → follow-up draft." },
        { t: "Pipeline Health Engine", d: "Aging timers, stall alerts and a health score." }
      ]
    },
    {
      id: "tat-dashboard", title: "AI Setup TAT Dashboard",
      category: "tooling", unit: "Broadly", status: "Prototype", year: "2026",
      logline: "How long does an AI setup really take? Measured subtask by subtask.",
      problem: "AI employee and receptionist setups had no turnaround or time-to-value visibility.",
      how: "Pulls setup projects (14 subtasks each) and their task history, then computes turnaround and time-to-value per phase and assignee.",
      stack: ["Python", "Task Manager API", "HTML dashboard"],
      episodes: [{ t: "Per-Phase TAT", d: "Shows which of the 14 steps is the bottleneck." }]
    },
    {
      id: "wdg-campaigns", title: "Franchise Campaign Engine",
      category: "tooling", unit: "Franchise", status: "In progress", progress: 20, year: "2026",
      logline: "Ninety franchise inboxes, one standardized campaign engine.",
      problem: "Monthly emails for about 90 locations were run by hand, and CRM imports overwrote tags.",
      how: "Scoping a platform-native automation against a Python script approach.",
      stack: ["Vendasta CRM", "Email campaigns", "Automations"],
      episodes: [{ t: "Scoping", d: "Platform build estimated at about 1 week." }]
    },
    {
      id: "apps-script-classics", title: "Apps Script Anthology",
      category: "tooling", unit: "Internal", status: "Live", year: "2025",
      logline: "The early automations that started it all.",
      problem: "Manual QA logging, campaign reviews and notification routing.",
      how: "A collection of Google Apps Script automations: Project Comments Automation, QA Error Log Engine, Automation Campaign Review, and a Gmail-to-Chat notifier.",
      stack: ["Google Apps Script", "Sheets", "Gmail", "Google Chat"],
      tags: ["apps-script"],
      episodes: [
        { t: "Project Comments Automation", d: "Automated project comment workflows." },
        { t: "QA Error Log Engine", d: "Structured QA error logging." },
        { t: "Campaign Review & Gmail→Chat", d: "Review sheets and inbox-to-Chat alerts." }
      ]
    }
  ]
};
