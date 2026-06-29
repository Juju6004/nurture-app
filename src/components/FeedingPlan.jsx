import { useEffect, useState } from 'react'

// "My feeding plan" — a simple plan + if-it-gets-hard plan, saved on the
// phone (localStorage). The point is that mom thinks it through ahead of time
// and can come back to her own words when things get stressful.
const STORAGE_KEY = 'nurture.feedingPlan'

const EMPTY = { goal: '', barriers: '', ifHard: '' }

const FIELDS = [
  {
    key: 'goal',
    label: 'My feeding goal',
    placeholder: 'e.g. I want to breastfeed my baby',
  },
  {
    key: 'barriers',
    label: 'What might make it hard',
    placeholder: 'e.g. going back to work, worrying my milk is low, sore nipples',
  },
  {
    key: 'ifHard',
    label: 'If it gets hard, here’s what I’ll do',
    placeholder: 'e.g. check the FAQ, call the clinic, ask my partner for help',
  },
]

export default function FeedingPlan() {
  const [plan, setPlan] = useState(EMPTY)
  const [savedAt, setSavedAt] = useState(null)

  // Load any saved plan on first render.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setPlan({ ...EMPTY, ...JSON.parse(raw) })
    } catch {
      // ignore unreadable/blocked storage
    }
  }, [])

  function update(key, value) {
    setPlan((p) => ({ ...p, [key]: value }))
    setSavedAt(null)
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
      setSavedAt(Date.now())
    } catch {
      // ignore storage failures
    }
  }

  const hasContent = FIELDS.some((f) => plan[f.key].trim())

  return (
    <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-stone-100">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-800">
        <span aria-hidden>📝</span> My feeding plan
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        Write it in your own words now, so it’s here when you need it later.
      </p>

      <div className="mt-4 space-y-4">
        {FIELDS.map((f) => (
          <label key={f.key} className="block text-sm font-medium text-stone-700">
            {f.label}
            <textarea
              value={plan[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={2}
              className="mt-1 w-full resize-y rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-rose-400"
            />
          </label>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={save}
          disabled={!hasContent}
          className="rounded-xl bg-rose-500 px-4 py-2 font-medium text-white transition hover:bg-rose-600 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Save my plan
        </button>
        {savedAt && <span className="text-sm text-emerald-600">Saved ✓</span>}
      </div>

      <p className="mt-3 text-xs text-stone-400">
        Saved only on this phone — just for you.
      </p>
    </section>
  )
}
