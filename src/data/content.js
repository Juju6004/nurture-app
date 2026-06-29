// ---------------------------------------------------------------------------
// CONTENT MODEL
// ---------------------------------------------------------------------------
// IMPORTANT — clinical sourcing rule:
// Every medical claim in this app must be sourced from a peer-reviewed or
// authoritative body (ACOG, CDC, AAP, WHO, Office on Women's Health /
// womenshealth.gov, Academy of Breastfeeding Medicine). Nothing here is filled
// from memory.
//
// Each item carries a `topic` (a safe, non-claim section label used for
// navigation), a `detail` (the actual guidance), and a `source`
// {name, year, url}. While `detail` is null the UI shows a "pending clinical
// sourcing" badge instead of inventing content.
//
// ACCESS GAP (flagged per the project's sourcing standard):
//   The ACOG article "How to Prepare for Breastfeeding in the Month Before
//   Birth" returned HTTP 402 (paywalled) on fetch 2026-06-29. Antenatal
//   hand-expression / colostrum-harvesting guidance is therefore left pending
//   until an accessible ACOG (or equivalent) source is read directly.
// ---------------------------------------------------------------------------

/** @typedef {{ name: string, year?: number, url?: string }} Source */
/** @typedef {{ topic: string, detail: string|null, source: Source|null }} Item */

// Sources actually read while populating this file (each fetched directly).
const S = {
  owhMilk: {
    name: "Office on Women's Health — Making breastmilk",
    year: 2025,
    url: 'https://womenshealth.gov/breastfeeding/learning-breastfeed/making-breastmilk',
  },
  owhChallenges: {
    name: "Office on Women's Health — Common breastfeeding challenges",
    year: 2025,
    url: 'https://womenshealth.gov/breastfeeding/breastfeeding-challenges/common-breastfeeding-challenges',
  },
  owhStages: {
    name: "Office on Women's Health — Stages of pregnancy",
    year: 2025,
    url: 'https://womenshealth.gov/pregnancy/youre-pregnant-now-what/stages-pregnancy',
  },
  aapEnough: {
    name: 'AAP HealthyChildren — Signs a breastfed baby is getting enough',
    year: 2025,
    url: 'https://www.healthychildren.org/English/ages-stages/baby/breastfeeding/Pages/How-to-Tell-if-Baby-is-Getting-Enough-Milk.aspx',
  },
  cdcHearHer: {
    name: 'CDC HEAR HER — Urgent maternal warning signs',
    year: 2024,
    url: 'https://www.cdc.gov/hearher/maternal-warning-signs/index.html',
  },
  owhPrenatalTests: {
    name: "Office on Women's Health — Prenatal care and tests",
    year: 2025,
    url: 'https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests',
  },
  owhRecovery: {
    name: "Office on Women's Health — Recovering from birth",
    year: 2025,
    url: 'https://womenshealth.gov/pregnancy/childbirth-and-beyond/recovering-birth',
  },
  mlpLabor: {
    name: 'MedlinePlus — Am I in labor?',
    year: 2024,
    url: 'https://medlineplus.gov/ency/patientinstructions/000508.htm',
  },
  mlpPreterm: {
    name: 'MedlinePlus — Preterm labor',
    year: 2024,
    url: 'https://medlineplus.gov/ency/patientinstructions/000486.htm',
  },
}

// Stage-based content. `minWeek`/`maxWeek` are inclusive gestational-week
// bounds; the app picks the stage whose range contains the current week.
export const stages = [
  {
    id: 'first-tri',
    title: 'First trimester (0–13 weeks)',
    minWeek: 0,
    maxWeek: 13,
    feeling: [
      {
        topic: 'Common early symptoms (nausea, fatigue, breast tenderness)',
        detail:
          'Hormonal changes affect almost every organ system. Common now: extreme tiredness, tender/swollen breasts, and an upset stomach with or without throwing up (morning sickness) — plus mood swings, constipation, and needing to pee more often.',
        source: S.owhStages,
      },
      {
        topic: 'What is normal vs. worth a call this trimester',
        detail:
          "Most early symptoms are normal. But call your provider for vaginal bleeding that's more than spotting, severe belly pain that doesn't go away, a fever of 100.4°F (38°C) or higher, or vomiting so bad you can't keep fluids down for more than 8 hours. (See “When to call your provider” below.)",
        source: S.cdcHearHer,
      },
    ],
    lactation: [
      {
        topic: 'Early breast changes in pregnancy',
        detail:
          'Your breasts start getting ready to make milk early on — tenderness and fullness are common. Your body makes colostrum (a rich, thick, yellowish first milk) in small amounts.',
        source: S.owhMilk,
      },
      {
        topic: 'It is okay to start thinking about a feeding plan — no action needed yet',
        detail: null,
        source: null,
      },
    ],
  },
  {
    id: 'second-tri',
    title: 'Second trimester (14–27 weeks)',
    minWeek: 14,
    maxWeek: 27,
    feeling: [
      {
        topic: 'What you may be feeling now (movement, energy, body changes)',
        detail:
          'Most women find the second trimester easier — nausea often fades. Body aches (back, abdomen, groin, thigh), stretch marks, and some swelling can show up. Before the trimester is over you will feel your baby begin to move; around 20 weeks you might feel slight fluttering.',
        source: S.owhStages,
      },
      {
        topic: 'Appointments/screens that cluster in this window',
        detail:
          'This is when the big screens cluster: a detailed anatomy ultrasound around 18–20 weeks, the maternal serum (quad) screen around 15–20 weeks, and glucose screening for gestational diabetes around 26–28 weeks.',
        source: S.owhPrenatalTests,
      },
    ],
    lactation: [
      {
        topic: 'Colostrum & what is happening in your breasts',
        detail:
          "Colostrum is the rich, thick, yellowish first milk. A newborn's stomach is tiny — about a hazelnut (1–2 teaspoons) — so your baby only takes about 1 teaspoon per feed. Over the next 3–5 days after birth, mature (white) milk takes the place of colostrum.",
        source: S.owhMilk,
      },
      {
        topic: 'Antenatal breastfeeding education — what to learn now',
        detail:
          'A good time to learn what a deep latch looks like: the baby should take in the areola, not just the nipple. Getting the latch right is what keeps feeding comfortable.',
        source: S.owhChallenges,
      },
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
      {
        topic: 'Late-pregnancy symptoms & comfort',
        detail:
          'As the baby grows it presses on your organs, so shortness of breath and needing the bathroom more often are common late in pregnancy.',
        source: S.owhStages,
      },
      {
        topic: 'Signs of labor vs. false alarms',
        detail:
          "Real labor contractions come regularly and get closer together (about 5–10 min apart), last 30–70 seconds, get stronger, and don't stop when you rest or move. False labor (Braxton Hicks) is irregular and eases with rest. Fluid leaking or a “bloody show” can also signal labor. Call your provider for regular painful contractions every 5–10 min for an hour, or if your water breaks.",
        source: S.mlpLabor,
      },
    ],
    lactation: [
      {
        topic: 'Latch basics & positions to learn before birth',
        detail:
          'Learn the basics now: baby latches onto the areola (not just the nipple), and changing positions during feeds helps comfort. Practicing the idea before birth makes it less new once baby arrives.',
        source: S.owhChallenges,
      },
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
      {
        topic: 'Postpartum recovery — what is normal',
        detail:
          'Vaginal bleeding (lochia) is heavy and bright red at first, then lightens and tapers over a few weeks. Menstrual-like cramping is common, especially while breastfeeding, and your breasts may feel full or leak around days 3–6.',
        source: S.owhRecovery,
      },
      {
        topic: 'Mood: baby blues vs. when to seek help',
        detail:
          "Feeling sad, weepy, or overwhelmed for a few days after birth (the “baby blues”) is normal and usually passes quickly. If sadness lasts more than two weeks, see your doctor — don't wait for your postpartum visit. Postpartum depression can start any time in the first year and is serious but treatable.",
        source: S.owhRecovery,
      },
    ],
    lactation: [
      {
        topic: 'Feeding frequency in the early days',
        detail:
          'Nurse at least 8 to 12 times every 24 hours in the early days. Newborns feed often — roughly every 1 to 3 hours — because their stomachs are small.',
        source: S.aapEnough,
      },
      {
        topic: 'Is baby getting enough? (wet & dirty diaper counts)',
        detail:
          'Good signs by 5–7 days old: 6 or more wet diapers a day with pale or nearly colorless urine, and at least 3–4 yellow, loose stools a day. Baby should seem satisfied for 1–3 hours between feeds and start regaining weight after the normal early dip (losing no more than 8–10% of birth weight). If you’re worried, call your pediatrician.',
        source: S.aapEnough,
      },
      {
        topic: 'Engorgement — what helps',
        detail:
          'When milk builds up your breasts can get very hard and painful, often around days 3–5. Breastfeed often, hand express or pump just enough to soften the breast before latching, use cold compresses between feeds, massage, and wear a supportive (not tight) bra.',
        source: S.owhChallenges,
      },
      {
        topic: 'Sore nipples & latch troubleshooting',
        detail:
          'Some tenderness early on is common and should ease once the latch is right (baby takes in the areola, not just the nipple). Changing positions helps; you can express a few drops of milk and gently rub it on the nipple, or let them air dry.',
        source: S.owhChallenges,
      },
    ],
  },
]

// Lactation-focused FAQs. Same sourcing rule — `answer` stays null until sourced.
export const faqs = [
  {
    id: 'colostrum',
    category: 'Breastfeeding',
    question: 'What is colostrum and when does it come in?',
    answer:
      "Colostrum is the rich, thick, yellowish first milk your body makes in small amounts, starting in pregnancy. A newborn's stomach is tiny (about a hazelnut, 1–2 teaspoons), so your baby only takes about 1 teaspoon per feed. Over the next 3–5 days it changes into mature white milk.",
    source: S.owhMilk,
  },
  {
    id: 'how-often',
    category: 'Breastfeeding',
    question: 'How often should a newborn breastfeed?',
    answer:
      'At least 8 to 12 times every 24 hours in the early days — roughly every 1 to 3 hours. Newborns feed often because their stomachs are small.',
    source: S.aapEnough,
  },
  {
    id: 'enough',
    category: 'Breastfeeding',
    question: 'How do I know my baby is getting enough milk?',
    answer:
      'By 5–7 days old: 6 or more wet diapers a day with pale/colorless urine, and at least 3–4 yellow loose stools a day. Baby seems satisfied for 1–3 hours between feeds and is gaining weight again after the early dip. If you’re unsure, call your pediatrician.',
    source: S.aapEnough,
  },
  {
    id: 'prenatal-prep',
    category: 'Breastfeeding',
    question: 'Can I prepare for breastfeeding before the baby arrives?',
    answer:
      'Yes. Before birth you can learn what a deep latch looks like (baby takes in the areola, not just the nipple) and get familiar with feeding positions, so it feels less new once baby arrives.',
    source: S.owhChallenges,
  },
  {
    id: 'engorgement',
    category: 'Breastfeeding',
    question: 'My breasts are hard and painful — what do I do?',
    answer:
      'That’s often engorgement (milk building up), common around days 3–5. Breastfeed often, hand express or pump just enough to soften before latching, use cold compresses between feeds, and wear a supportive (not tight) bra. If it’s not improving or you get a fever, call your provider.',
    source: S.owhChallenges,
  },
  {
    id: 'when-call',
    category: 'Red flags',
    question: 'When should breastfeeding pain make me call someone?',
    answer:
      'Pain plus a fever or flu-like feeling, or a breast that feels warm/hot, can mean mastitis (a breast infection) — ask for help if you don’t feel better within 24 hours, and seek care right away if it comes on suddenly, both breasts are affected, or there’s pus or blood in your milk. Cracked nipples that aren’t improving also warrant a call.',
    source: S.owhChallenges,
  },
]

// "Call your provider" guidance. Pregnancy items are the CDC HEAR HER urgent
// maternal warning signs (verbatim-grounded); breastfeeding items from OWH/AAP.
export const redFlags = {
  pregnancy: [
    {
      topic: 'Vaginal bleeding',
      detail: 'Any bleeding from your vagina that is more than spotting during pregnancy.',
      source: S.cdcHearHer,
    },
    {
      topic: 'Severe or persistent headache / vision changes / swelling',
      detail:
        "A headache that won't go away or feels like the worst of your life; vision changes like blurriness, flashes of light, or seeing spots; or swelling of the face/hands.",
      source: S.cdcHearHer,
    },
    {
      topic: 'Decreased fetal movement',
      detail: 'Your baby has stopped moving, or is moving less than before.',
      source: S.cdcHearHer,
    },
    {
      topic: 'Leaking fluid / suspected water breaking',
      detail: 'Fluid leaking from your vagina during pregnancy.',
      source: S.cdcHearHer,
    },
    {
      topic: "Severe belly pain that doesn't go away",
      detail: "Sharp, stabbing, or cramp-like belly pain that doesn't go away.",
      source: S.cdcHearHer,
    },
    {
      topic: 'Trouble breathing or chest pain',
      detail:
        'Sudden shortness of breath, trouble breathing lying flat, tightness/pressure in the center of your chest, or a fast/pounding heartbeat.',
      source: S.cdcHearHer,
    },
    {
      topic: 'Fever',
      detail: 'A temperature of 100.4°F (38°C) or higher.',
      source: S.cdcHearHer,
    },
    {
      topic: 'Thoughts of harming yourself or your baby',
      detail: 'Thoughts about harming yourself or your baby — seek help right away.',
      source: S.cdcHearHer,
    },
    {
      topic: 'Heavy bleeding after birth',
      detail: 'Soaking through one or more pads in an hour, or passing clots bigger than an egg.',
      source: S.cdcHearHer,
    },
    {
      topic: 'Regular contractions before term',
      detail:
        'Before 37 weeks, call your provider right away for more than 5 contractions an hour or regular painful contractions, contractions that get longer/stronger/closer together, low backache or pelvic/groin pressure, a sudden increase or change in vaginal discharge, or fluid or bright-red bleeding from your vagina.',
      source: S.mlpPreterm,
    },
  ],
  breastfeeding: [
    {
      topic: 'Breast redness + fever / flu-like feeling (possible mastitis)',
      detail:
        'Soreness or a lump with fever and/or flu-like symptoms, and a breast that feels warm or hot, can be mastitis. Ask your doctor for help if you don’t feel better within 24 hours, and see a doctor right away if it’s sudden/severe, both breasts are affected, or there’s pus or blood in your milk or red streaks.',
      source: S.owhChallenges,
    },
    {
      topic: 'Baby not making enough wet diapers',
      detail:
        'Fewer than 6 wet diapers a day after the first week, very dark urine, or few/no stools can mean baby isn’t getting enough milk — call your pediatrician.',
      source: S.aapEnough,
    },
    {
      topic: 'Cracked / bleeding nipples not improving',
      detail:
        'Some early tenderness is normal, but cracked or bleeding nipples that aren’t improving usually mean the latch needs adjusting — check in with your provider or a lactation consultant.',
      source: S.owhChallenges,
    },
  ],
}

// "My Visits" journal — the digital version of the Caring for Motherhood
// fill-in visit pages (ETSU Health / ReadNPlay). Each visit type carries the
// intro line + the book's "questions to ask this visit" as tappable
// suggestions. The app improves on paper by auto-selecting the right visit
// for the mom's current trimester and saving everything on her phone.
export const visitTypes = [
  {
    id: 'tri1',
    title: 'My 1st Trimester Visit',
    accent: 'violet',
    minWeek: 0,
    maxWeek: 13,
    intro: 'The first 13.6 weeks of pregnancy is the 1st trimester.',
    tip: 'Be sure to continue taking prenatal vitamins daily.',
    suggestedQuestions: [
      'Smoking, alcohol, or drug use? Ask my provider for help with quitting.',
      'How I plan to tell family and friends about my pregnancy.',
      'Which prenatal vitamin should I take?',
    ],
  },
  {
    id: 'tri2',
    title: 'My 2nd Trimester Visit',
    accent: 'amber',
    minWeek: 14,
    maxWeek: 27,
    intro: "By the end of the 2nd trimester your baby's organs will all have developed.",
    tip: 'Uncomfortable symptoms of pregnancy often improve during the 2nd trimester.',
    suggestedQuestions: [
      'How I want to feed my baby + questions I have about breastfeeding.',
      'Smoking, alcohol, or drug use? Ask for help quitting.',
      'What to expect from the anatomy ultrasound and glucose screening.',
    ],
  },
  {
    id: 'tri3',
    title: 'My 3rd Trimester Visit',
    accent: 'rose',
    minWeek: 28,
    maxWeek: 45,
    intro: 'The third trimester is defined as 28+ weeks to term.',
    tip: 'This is often called the “showing and glowing” period.',
    suggestedQuestions: [
      'My preferences for family planning and birth control.',
      'Help completing any maternity-leave paperwork.',
      'My birth and feeding plan.',
    ],
  },
  {
    id: 'post',
    title: 'My Post-Delivery Visit',
    accent: 'teal',
    minWeek: 41,
    maxWeek: 99,
    intro: 'Your postpartum checkups are just as important as your newborn’s visits.',
    tip: "It's time just for you to discuss concerns or challenges and ask questions.",
    suggestedQuestions: [
      'My activity and nutrition plan.',
      'Sexual activity guidelines, family planning, birth control.',
      'How I’m feeling emotionally (mood / baby blues).',
    ],
  },
]

// The measured fields a mom logs at each visit (mirrors the book's vitals row).
export const visitFields = [
  { key: 'date', label: 'Appointment date', type: 'date' },
  { key: 'weight', label: 'Weight today', type: 'text', placeholder: 'e.g. 150 lb' },
  { key: 'bp', label: 'Blood pressure', type: 'text', placeholder: 'e.g. 118/72' },
  { key: 'pulse', label: 'Pulse', type: 'text', placeholder: 'e.g. 78' },
  { key: 'babyHr', label: "Baby's heart rate", type: 'text', placeholder: 'e.g. 150' },
  { key: 'fundalHeight', label: 'Fundal height', type: 'text', placeholder: 'e.g. 24 cm' },
  { key: 'testResults', label: 'Any new test results', type: 'textarea' },
  { key: 'meds', label: 'Current vitamins or medications', type: 'textarea' },
]

export function visitTypeForWeek(weeks, isPostpartum = false) {
  if (isPostpartum) return visitTypes.find((v) => v.id === 'post')
  return (
    visitTypes.find((v) => v.id !== 'post' && weeks >= v.minWeek && weeks <= v.maxWeek) ||
    visitTypes[0]
  )
}

// Clinic contact card. Office info only — intentionally NOT framed as on-call
// access to a specific person. Fill `hours` once confirmed with the office.
export const clinic = {
  name: 'ETSU Health — Regional Lactation Referral Center',
  blurb:
    'Prenatal and postpartum lactation consults with an IBCLC. OB patients are typically scheduled for a prenatal consult; others can call to schedule.',
  phoneDisplay: '(423) 439-7272',
  phoneHref: 'tel:+14234397272',
  // TODO: confirm exact office hours with the clinic, then fill this string.
  hours: null,
  portalName: 'MyETSUHealth patient portal',
  coverageNote:
    'TennCare/CoverKids cover lactation consults with no limit on the number of visits; other plans and self-pay accepted.',
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
