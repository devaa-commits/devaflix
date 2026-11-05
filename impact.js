// DEVAFLIX impact model, poster art and AI Workforce cast.
// Every number here is either MEASURED (from logs/run outputs), MODELED (volume measured,
// minutes-per-task assumed) or PROJECTED (both assumed, for pilots). Edit freely.
//
// model: volume per period × (manualMin − autoMin) → hours saved per year.
//   per: "day" (×250 workdays) | "week" (×52) | "month" (×12) | "year" | "once" (one-time)
// FTE equivalent = hours ÷ fteHours.
window.IMPACT = {
  fteHours: 1800,

  projects: {
    "lead-routing-engine": {
      scene: "router", ai: 5,
      tat: { before: "Hours in a manual triage queue", after: "~3 min (2-min hold + 36s AI tiering)" },
      model: { per: "month", volume: 2117, unit: "inbound leads", manualMin: 10, autoMin: 0.5, basis: "modeled",
        notes: ["Volume: 2,117 leads created Aug 31 to Sep 29 (warehouse).", "Manual: about 10 min per lead to research, size, ICP-score, assign an owner and create the opp.", "Auto: about 30s of human time per lead on average, for exceptions and unassigned alerts."] }
    },
    "revops-ai-team": {
      scene: "squad", ai: 7,
      stills: [3, 5, 6, 7].map(n => ({ src: `assets/stills/flow-${n}-${["duplicate-check", "general-hygiene", "pipeline-cleanup", "lead-pool-audit", "delinquent-partners", "injected-lead-uploads", "automation-audit"][n - 1]}.jpg`, cap: ["Naruto: duplicate check", "Mikasa: general hygiene", "Zoro: pipeline cleanup", "L: lead-pool audit", "Spike: delinquent partners", "Edward: injected lead uploads", "Senku: automation audit"][n - 1] })),
      tat: { before: "Monthly / quarterly manual audits", after: "Daily digest + every-2-hour checks" },
      model: { per: "year", volume: 723, unit: "hygiene tickets", manualMin: 90, autoMin: 15, basis: "projected",
        notes: ["Volume: 241 Jira issues in 4 months from the analyst's history, ×3 for a year.", "Manual: about 90 min per ticket (pull, check, fix, document).", "Auto: about 15 min left for a human to approve the bot's proposal."] }
    },
    "debug-agent": {
      scene: "bug", ai: 4,
      tat: { before: "2–4+ hours per ticket", after: "60–180 seconds" },
      model: { per: "year", volume: 240, unit: "chatbot bug tickets", manualMin: 180, autoMin: 3, basis: "measured",
        notes: ["Volume: 110+ saved runs over about 5.5 months, annualized.", "Manual: 3 h, the midpoint of the 2–4+ h baseline in the hackathon deck.", "Auto: about 3 min per pipeline run."] }
    },
    "automation-builder": {
      scene: "builder", ai: 1,
      tat: { before: "~4 h per external-connection build + debugging", after: "~45 min, validated draft" },
      model: { per: "month", volume: 4, unit: "external automations built", manualMin: 240, autoMin: 45, basis: "projected",
        notes: ["Pilot. Assumes 4 external-connection builds a month across the team.", "Manual includes rework after silent payload-key failures."] }
    },
    "rep-onboarding": {
      scene: "stars", ai: 1, stills: [{ src: "assets/stills/rep-deck.jpg", cap: "Executive briefing deck" }],
      tat: { before: "~30 min, 16 tasks over 6 phases", after: "~2 min, one command" },
      model: { per: "month", volume: 200, unit: "AI Reputation setups", manualMin: 30, autoMin: 2, basis: "modeled",
        notes: ["Minutes are measured on 5 live accounts (30 → 2).", "Volume of about 200 setups a month is the deck's illustrative figure."] }
    },
    "error-watcher": {
      scene: "radar", tat: { before: "Days, or only once leads were lost", after: "≤ 15 min to Google Chat" },
      model: { per: "day", volume: 30, unit: "automations checked", manualMin: 2, autoMin: 0, basis: "modeled",
        notes: ["30 watched automations, each needing about a 2-min Activity-tab check every workday."] }
    },
    "request-hub": {
      scene: "ticket",
      tat: { before: "Manual triage; 3 forms went nowhere", after: "Instant Jira ticket, auto-assigned" },
      model: { per: "month", volume: 60, unit: "RevOps requests", manualMin: 12, autoMin: 0, basis: "modeled",
        notes: ["Assumes about 60 requests a month.", "Manual: read, decide owner, create ticket, notify (~12 min)."] }
    },
    "ai-scorecards": {
      scene: "gauge", ai: 12, tat: { before: "Never measured", after: "Re-scored every hour" },
      model: { per: "month", volume: 12, unit: "AI employee audits", manualMin: 180, autoMin: 0, basis: "modeled",
        notes: ["12 AI employees, each needing about a 3-hour monthly log pull and rubric review if done by hand."] }
    },
    "listings-pipeline": {
      scene: "pin",
      tat: { before: "Overdue queue, ~15 min per listing", after: "~1 min per listing, batch" },
      model: { per: "month", volume: 250, unit: "GBP listings", manualMin: 15, autoMin: 1, basis: "modeled",
        notes: ["Team runs produce about 50–80 listings each; assumes about 250 a month.", "Manual: pull NAP and hours, build the row, search Google for duplicates, update the task."] }
    },
    "dupe-checker": {
      scene: "merge", tat: { before: "7-step manual search per company", after: "~4 min for the whole day's batch" },
      model: { per: "day", volume: 85, unit: "new companies", manualMin: 4, autoMin: 0.35, basis: "modeled",
        notes: ["Volume is measured (about 85 a day).", "Manual: about 4 min for the 7-step search.", "Auto: about 30 min a day spent reviewing the ~25 flagged rows."] }
    },
    "gtm-docs": {
      scene: "docs",
      tat: { before: "~1.5 h to document one automation", after: "382 docs in ~2 days" },
      model: { per: "once", volume: 382, unit: "automation & AI employee docs", manualMin: 90, autoMin: 3, basis: "modeled",
        notes: ["One-time. Manual: open the canvas, trace steps, map Jira history, draw the flowchart."] }
    },
    "gtm-ai-org": { scene: "org", ai: 17 },
    "lead-funnel": {
      scene: "funnel", tat: { before: "One headline number", after: "Every drop-off tagged by cause" }
    },
    "auto-assign-decode": { scene: "decode" },
    "sales-org-map": { scene: "map" },
    "referral-program": {
      scene: "handshake",
      tat: { before: "Spreadsheets + memory, days", after: "Same-day approval card → assigned opp" },
      model: { per: "month", volume: 20, unit: "referrals", manualMin: 45, autoMin: 5, basis: "projected",
        notes: ["Assumes about 20 referrals a month once the program is running.", "Manual: CRM check, approval chase, create, tag and assign."] }
    },
    "gmr-resellers": {
      scene: "crate",
      tat: { before: "~15 min per reseller", after: "One guarded push" },
      model: { per: "once", volume: 93, unit: "resellers", manualMin: 15, autoMin: 1, basis: "modeled", notes: ["One-time import: dupe check, enrich, create or reassign."] }
    },
    "crm-hygiene": {
      scene: "tiers",
      tat: { before: "Thousands of rows to eyeball", after: "~20 rows for human review" },
      model: { per: "month", volume: 6958, unit: "flagged fields", manualMin: 0.5, autoMin: 0.02, basis: "modeled",
        notes: ["1,340 segment + 5,618 tier issues found per pass.", "Assumes a monthly pass at about 30s each by hand."] }
    },
    "review-closer": {
      scene: "review",
      tat: { before: "Open every task to check", after: "Batch-closed, verified" },
      model: { per: "year", volume: 19500, unit: "review tasks", manualMin: 1.5, autoMin: 0, basis: "modeled",
        notes: ["Measured: 2,071 tasks closed in about 5.5 weeks, annualized.", "Manual: about 1.5 min to open, check the reply and close."] }
    },
    "nbly-audit": {
      scene: "fingerprint",
      tat: { before: "~3 min per account by hand", after: "4,008 accounts in one sweep" },
      model: { per: "once", volume: 4008, unit: "AI receptionist configs", manualMin: 3, autoMin: 0, basis: "modeled", notes: ["One-time audit before a central prompt push."] }
    },
    "rbw-provisioning": {
      scene: "houses",
      tat: { before: "~20 min across 6+ screens per account", after: "Batch, resumable" },
      model: { per: "once", volume: 300, unit: "franchise accounts", manualMin: 20, autoMin: 0.5, basis: "modeled", notes: ["One-time provisioning of about 300 locations."] }
    },
    "calendar-bot": {
      scene: "calendar", ai: 1,
      tat: { before: "Notes written next day, or never", after: "Within the hour" },
      model: { per: "week", volume: 8, unit: "meetings", manualMin: 15, autoMin: 0, basis: "modeled", notes: ["Per user. About 8 meetings a week, 15 min each to write up notes and tickets."] }
    },
    "levi": { scene: "headset", ai: 5 },
    "voice-prompts": { scene: "wave" },
    "morning-recap": { scene: "mail" },
    "gtm-blueprint": { scene: "blueprint" },
    "tat-dashboard": { scene: "clock" },
    "wdg-campaigns": {
      scene: "mail",
      model: { per: "month", volume: 90, unit: "location campaigns", manualMin: 20, autoMin: 1, basis: "projected", notes: ["About 90 locations, each about 20 min by hand every month."] }
    },
    "apps-script-classics": { scene: "code" }
  },

  // AI Workforce cast: 30-day volumes from the Scorecards (Oct 2026). manualMin = what a person would
  // spend on one unit, used to express each AI employee's output as human-equivalent hours.
  cast: [
    { key: "hamstier", name: "The Hams-Tier", partner: "Vendasta", role: "Lead tier classifier", glyph: "tiers", vol: 2118, unit: "leads tiered", kpi: "97.5% tier accuracy · 36s median", manualMin: 3,
      does: "Sizes every new inbound lead so routing can use the tier. It's the gatekeeper at the top of Auto Assign." },
    { key: "enrichy", name: "Enrichy Rich", partner: "Vendasta", role: "Lead researcher", glyph: "search", vol: 2220, unit: "leads researched", kpi: "2.2K leads profiled a month", manualMin: 10,
      does: "Researches each lead from public data and Google Business Profile, and builds the company and contact profile." },
    { key: "pointguard", name: "Point Guard", partner: "Vendasta", role: "ICP lead scorer", glyph: "target", vol: 805, unit: "leads scored", kpi: "99.9% valid ICP score · 5/5 targets", manualMin: 8,
      does: "Researches agency, ISV and franchise leads on the web and returns an ICP score and reasoning." },
    { key: "aurora", name: "Aurora", partner: "Vendasta", role: "Chat receptionist", glyph: "chat", vol: 144, unit: "conversations scored", kpi: "75% inquiries answered (target 70%)", manualMin: 8,
      does: "Vendasta's web chat receptionist on vendasta.com and the Snapshot app." },
    { key: "sandra", name: "SanDRa", partner: "Vendasta", role: "Voice SDR & receptionist", glyph: "phone", vol: 144, unit: "calls scored", kpi: "Calls inbound leads and books demos", manualMin: 10,
      does: "AI voice SDR that calls inbound leads in the routing lanes and books demos." },
    { key: "patch", name: "Patch", partner: "Vendasta", role: "Conversation insights", glyph: "wave", vol: 529, unit: "calls analysed", kpi: "4/5 targets met", manualMin: 15,
      does: "Reads partner call transcripts, judges sentiment and risk, and writes a short report." },
    { key: "iris", name: "Iris", partner: "Vendasta", role: "AI BDR", glyph: "pen", vol: 57, unit: "drafts written", kpi: "Personalised outbound drafts", manualMin: 10,
      does: "Writes personalised outbound emails and LinkedIn messages." },
    { key: "prbs-pointguard", name: "Point Guard (Direct)", partner: "Broadly", role: "Direct SMB lead scorer", glyph: "target", vol: 4129, unit: "leads scored", kpi: "97–98% consistent scoring", manualMin: 5,
      does: "Scores every paid-social lead for Direct SMB fit before it goes to the Kixie powerlists." },
    { key: "prbs-charlie", name: "Charlie", partner: "Broadly", role: "AI sales assistant", glyph: "bolt", vol: 6078, unit: "requests handled", kpi: "93% reopened tasks closed", manualMin: 3,
      does: "Broadly's sales-ops helper: closes reopened tasks, analyses closed-lost deals and checks SMB meetings." },
    { key: "prbs-icp", name: "ICP Classifier", partner: "Broadly", role: "ICP classifier (testing)", glyph: "search", vol: 768, unit: "companies classified", kpi: "New ICP classifier in testing", manualMin: 5,
      does: "Classifies each new company against the ICP rubric using GBP and website." },
    { key: "prbs-mia", name: "Mia", partner: "Broadly", role: "Chat receptionist", glyph: "chat", vol: 104, unit: "conversations scored", kpi: "78.6% inquiries answered", manualMin: 8,
      does: "Broadly's web chat and SMS receptionist." }
  ]
};
