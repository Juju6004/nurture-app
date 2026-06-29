import { useState } from 'react'
import DueDateInput from './components/DueDateInput.jsx'
import ContentItem from './components/ContentItem.jsx'
import RedFlags from './components/RedFlags.jsx'
import Faqs from './components/Faqs.jsx'
import FeedingPlan from './components/FeedingPlan.jsx'
import ClinicInfo from './components/ClinicInfo.jsx'
import VisitJournal from './components/VisitJournal.jsx'
import SectionCard from './components/SectionCard.jsx'
import { BloomMark, Wordmark } from './components/Logo.jsx'
import { stageForWeek, approvedSources } from './data/content.js'
import { trimesterLabel, weeksToGo } from './lib/pregnancy.js'

export default function App() {
  const [gestation, setGestation] = useState(null)
  const [postpartum, setPostpartum] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdeef2] via-[#fffaf4] to-[#fff6ee] text-stone-700">
      <div className="mx-auto max-w-md px-4 pb-16 pt-9">
        <header className="mb-7 text-center">
          <div className="flex justify-center">
            <Wordmark size={42} />
          </div>
          <p className="font-hand mt-1 text-xl text-[var(--bloom)]">
            for this journey called motherhood
          </p>
          <p className="mt-2 text-sm text-stone-500">
            What to feel, how to prepare to feed, and when to call — for where you are right
            now.
          </p>
        </header>

        {!gestation ? (
          <DueDateInput
            onResolve={(g) => {
              setGestation(g)
              setPostpartum(false)
            }}
          />
        ) : (
          <Dashboard
            gestation={gestation}
            postpartum={postpartum}
            setPostpartum={setPostpartum}
            onReset={() => setGestation(null)}
          />
        )}

        <footer className="mt-10 border-t border-rose-100 pt-5 text-center text-xs text-stone-400">
          <p>
            Educational companion only — not medical advice, and not a substitute for your
            care team.
          </p>
          <p className="mt-1">Clinical content sourced from: {approvedSources.join(' · ')}.</p>
        </footer>
      </div>
    </div>
  )
}

function Dashboard({ gestation, postpartum, setPostpartum, onReset }) {
  const stage = stageForWeek(gestation.weeks, postpartum)

  return (
    <div className="space-y-5">
      {/* Week summary hero card */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#c64f7b] via-[#d2638a] to-[#e98aae] p-6 text-white shadow-lg shadow-rose-200">
        <BloomMark
          size={150}
          className="pointer-events-none absolute -right-6 -top-8 opacity-20"
        />
        <div className="relative flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-rose-50/90">
              {postpartum ? 'Postpartum' : trimesterLabel(gestation.trimester)}
            </p>
            <p className="font-display mt-1 text-4xl font-semibold">
              {postpartum ? 'Newborn feeding' : `Week ${gestation.weeks}`}
            </p>
            {!postpartum && (
              <p className="mt-1 text-sm text-rose-50/90">
                {gestation.label} · about {weeksToGo(gestation.weeks)} weeks to go
              </p>
            )}
          </div>
          <button
            onClick={onReset}
            className="relative rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur hover:bg-white/30"
          >
            change
          </button>
        </div>

        <button
          onClick={() => setPostpartum((p) => !p)}
          className="relative mt-5 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold backdrop-blur transition hover:bg-white/25"
        >
          {postpartum ? '← Back to pregnancy view' : 'Baby already here? Switch to feeding →'}
        </button>
      </section>

      {/* What you may be feeling */}
      <SectionCard
        accent="rose"
        icon="💗"
        title={postpartum ? 'How you may be feeling' : 'What you may be feeling'}
        subtitle={stage.title}
      >
        <ul className="space-y-2">
          {stage.feeling.map((item) => (
            <ContentItem key={item.topic} item={item} />
          ))}
        </ul>
      </SectionCard>

      {/* Lactation / feeding prep — the core track */}
      <SectionCard
        accent="amber"
        icon="🤱"
        title={postpartum ? 'Feeding your baby' : 'Getting ready to breastfeed'}
      >
        <ul className="space-y-2">
          {stage.lactation.map((item) => (
            <ContentItem key={item.topic} item={item} />
          ))}
        </ul>
      </SectionCard>

      <VisitJournal gestation={gestation} postpartum={postpartum} />
      <FeedingPlan />
      <Faqs />
      <ClinicInfo />
      <RedFlags />
    </div>
  )
}
