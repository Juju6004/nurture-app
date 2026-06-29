// ---------------------------------------------------------------------------
// CONTENT MODEL
// ---------------------------------------------------------------------------
// IMPORTANT — clinical sourcing rule:
// Every medical claim in this app must be sourced from a peer-reviewed or
// authoritative body (ACOG, CDC, AAP, WHO, Office on Women's Health /
// womenshealth.gov, Academy of Breastfeeding Medicine). Nothing here is filled
// from memory.
//
// Each item below carries a `topic` (a safe, non-claim section label used for
// navigation) and a `detail` (the actual guidance). While `detail` is null the
// UI shows a "pending clinical sourcing" badge instead of inventing content.
// To populate an item: write `detail` and fill `source` with {name, year, url}.
// ---------------------------------------------------------------------------

/** @typedef {{ name: string, year?: number, url?: string }} Source */
/** @typedef {{ topic: string, detail: string|null, source: Source|null }} Item */

// Stage-based content. `minWeek`/`maxWeek` are inclusive gestational-week
// bounds; the app picks the stage whose range contains the current week.
export const stages = [
  {
    id: 'first-tri',
    title: 'First trimester (0–13 weeks)',
    minWeek: 0,
    maxWeek: 13,
    feeling: [
      { topic: 'Common early symptoms (nausea, fatigue, breast tenderness)', detail: null, source: null },
      { topic: 'What is normal vs. worth a call this trimester', detail: null, source: null },
    ],
    lactation: [
      { topic: 'Early breast changes in pregnancy', detail: null, source: null },
      { topic: 'It is okay to start thinking about a feeding plan — no action needed yet', detail: null, source: null },
    ],
  },
  {
    id: 'second-tri',
    title: 'Second trimester (14–27 weeks)',
    minWeek: 14,
    maxWeek: 27,
    feeling: [
      { topic: 'What you may be feeling now (movement, energy, body changes)', detail: null, source: null },
      { topic: 'Appointments/screens that cluster in this window', detail: null, source: null },
    ],
    lactation: [
      { topic: 'Colostrum & what is happening in your breasts', detail: null, source: null },
      { topic: 'Antenatal breastfeeding education — what to learn now', detail: null, source: null },
      { topic: 'Flat / inverted nipple check', detail: null, source: null },
      { topic: 'Starting to build your feeding plan', detail: null, source: null },
    ],
  },
  {
    id: 'third-tri',
    title: 'Third trimester (28+ weeks)',
    minWeek: 28,
    maxWeek: 45,
    feeling: [
      { topic: 'Late-pregnancy symptoms & comfort', detail: null, source: null },
      { topic: 'Signs of labor vs. false alarms', detail: null, source: null },
    ],
    lactation: [
      { topic: 'Latch basics & positions to learn before birth', detail: null, source: null },
      { topic: 'Pump & supply prep — what (if anything) to get', detail: null, source: null },
      { topic: 'First-hour skin-to-skin & first feed: what to expect', detail: null, source: null },
      { topic: 'What to pack for feeding', detail: null, source: null },
    ],
  },
  {
    id: 'postpartum',
    title: 'Postpartum / newborn feeding',
    minWeek: 41,
    maxWeek: 99,
    postpartum: true,
    feeling: [
      { topic: 'Postpartum recovery — what is normal', detail: null, source: null },
      { topic: 'Mood: baby blues vs. when to seek help', detail: null, source: null },
    ],
    lactation: [
      { topic: 'Feeding frequency in the early days', detail: null, source: null },
      { topic: 'Is baby getting enough? (wet & dirty diaper counts)', detail: null, source: null },
      { topic: 'Engorgement — what helps', detail: null, source: null },
      { topic: 'Sore nipples & latch troubleshooting', detail: null, source: null },
    ],
  },
]

// Lactation-focused FAQs. Same sourcing rule — `answer` stays null until sourced.
export const faqs = [
  { id: 'colostrum', category: 'Breastfeeding', question: 'What is colostrum and when does it come in?', answer: null, source: null },
  { id: 'how-often', category: 'Breastfeeding', question: 'How often should a newborn breastfeed?', answer: null, source: null },
  { id: 'enough', category: 'Breastfeeding', question: 'How do I know my baby is getting enough milk?', answer: null, source: null },
  { id: 'prenatal-prep', category: 'Breastfeeding', question: 'Can I prepare for breastfeeding before the baby arrives?', answer: null, source: null },
  { id: 'engorgement', category: 'Breastfeeding', question: 'My breasts are hard and painful — what do I do?', answer: null, source: null },
  { id: 'when-call', category: 'Red flags', question: 'When should breastfeeding pain make me call someone?', answer: null, source: null },
]

// "Call your provider" guidance. These map to OB triage/decision-threshold
// references — populate from ACOG patient-facing materials. Until sourced,
// each entry shows the topic with a pending badge; do NOT display unsourced
// thresholds as if they were clinical advice.
export const redFlags = {
  pregnancy: [
    { topic: 'Vaginal bleeding', detail: null, source: null },
    { topic: 'Severe or persistent headache / vision changes / swelling', detail: null, source: null },
    { topic: 'Decreased fetal movement', detail: null, source: null },
    { topic: 'Leaking fluid / suspected water breaking', detail: null, source: null },
    { topic: 'Regular contractions before term', detail: null, source: null },
    { topic: 'Fever', detail: null, source: null },
  ],
  breastfeeding: [
    { topic: 'Breast redness + fever / flu-like feeling (possible mastitis)', detail: null, source: null },
    { topic: 'Baby not making enough wet diapers', detail: null, source: null },
    { topic: 'Cracked / bleeding nipples not improving', detail: null, source: null },
  ],
}

// Source allowlist surfaced in the UI footer so the standard is visible.
export const approvedSources = [
  'ACOG',
  'CDC',
  'AAP',
  'WHO',
  'Office on Women’s Health (womenshealth.gov)',
  'Academy of Breastfeeding Medicine',
]

export function stageForWeek(weeks, isPostpartum = false) {
  if (isPostpartum) return stages.find((s) => s.postpartum)
  return (
    stages.find((s) => !s.postpartum && weeks >= s.minWeek && weeks <= s.maxWeek) ||
    stages[0]
  )
}
