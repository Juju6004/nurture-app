import { useState } from 'react'
import DueDateInput from './components/DueDateInput.jsx'
import ContentItem from './components/ContentItem.jsx'
import RedFlags from './components/RedFlags.jsx'
import Faqs from './components/Faqs.jsx'
import { stageForWeek, approvedSources } from './data/content.js'
import { trimesterLabel, weeksToGo } from './lib/pregnancy.js'

export default function App() {
  const [gestation, setGestation] = useState(null)
  const [postpartum, setPostpartum] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-amber-50/40 to-white text-stone-800">
      <div className="mx-auto max-w-2xl px-4 pb-16 pt-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-rose-700">Nurture</h1>
          <p className="mt-1 text-sm text-stone-500">
            Your pregnancy &amp; lactation companion — what to feel, how to prepare to feed,
            and when to call.
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

        <footer className="mt-10 border-t border-stone-200 pt-4 text-center text-xs text-stone-400">
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
      {/* Week summary card */}
      <section className="rounded-2xl bg-gradient-to-br from-rose-500 to-rose-400 p-5 text-white shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-rose-100">
              {postpartum ? 'Postpartum' : trimesterLabel(gestation.trimester)}
            </p>
            <p className="mt-1 text-3xl font-semibold">
              {postpartum ? 'Newborn feeding' : `Week ${gestation.weeks}`}
            </p>
            {!postpartum && (
              <p className="mt-1 text-sm text-rose-100">
                {gestation.label} · about {weeksToGo(gestation.weeks)} weeks to go
              </p>
            )}
          </div>
          <button
            onClick={onReset}
            className="rounded-full bg-white/20 px-3 py-1 text-xs hover:bg-white/30"
          >
            change
          </button>
        </div>

        <button
          onClick={() => setPostpartum((p) => !p)}
          className="mt-4 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium hover:bg-white/25"
        >
          {postpartum ? '← Back to pregnancy view' : 'Baby already here? Switch to feeding →'}
        </button>
      </section>

      {/* What you may be feeling */}
      <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-800">
          {postpartum ? 'How you may be feeling' : 'What you may be feeling'}
        </h2>
        <p className="mt-0.5 text-sm text-stone-500">{stage.title}</p>
        <ul className="mt-3 space-y-2">
          {stage.feeling.map((item) => (
            <ContentItem key={item.topic} item={item} />
          ))}
        </ul>
      </section>

      {/* Lactation / feeding prep — the core track */}
      <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-stone-100">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-800">
          <span aria-hidden>🤱</span>
          {postpartum ? 'Feeding your baby' : 'Getting ready to breastfeed'}
        </h2>
        <ul className="mt-3 space-y-2">
          {stage.lactation.map((item) => (
            <ContentItem key={item.topic} item={item} />
          ))}
        </ul>
      </section>

      <Faqs />
      <RedFlags />
    </div>
  )
}
