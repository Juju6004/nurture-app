import { useEffect, useState } from 'react'
import { visitTypes, visitFields, visitTypeForWeek } from '../data/content.js'

// Digital version of the Caring for Motherhood visit pages. Mom logs each
// appointment + the questions she wants to ask; everything saves on her phone.
// Improves on paper: auto-picks the right visit for her current trimester and
// pre-loads the book's suggested questions as tappable chips.
const STORAGE_KEY = 'nurture.visits'

const ACCENT = {
  violet: 'bg-violet-50 ring-violet-200 text-violet-800',
  amber: 'bg-amber-50 ring-amber-200 text-amber-800',
  rose: 'bg-rose-50 ring-rose-200 text-rose-800',
  teal: 'bg-teal-50 ring-teal-200 text-teal-800',
}

function blankDraft(typeId) {
  return {
    typeId,
    date: '',
    weight: '',
    bp: '',
    pulse: '',
    babyHr: '',
    fundalHeight: '',
    testResults: '',
    meds: '',
    questions: [],
    providerRecs: '',
  }
}

export default function VisitJournal({ gestation, postpartum }) {
  const defaultType = visitTypeForWeek(gestation?.weeks ?? 0, postpartum).id
  const [visits, setVisits] = useState([])
  const [draft, setDraft] = useState(null) // null = form closed

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setVisits(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  function persist(next) {
    setVisits(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
  }

  function saveDraft() {
    const entry = { ...draft, id: Date.now() }
    persist([entry, ...visits])
    setDraft(null)
  }

  function removeVisit(id) {
    persist(visits.filter((v) => v.id !== id))
  }

  return (
    <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-stone-100">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-800">
        <span aria-hidden>🗓️</span> My visits
      </h2>
      <p className="mt-1 text-sm text-stone-500">
        Keep a record of each appointment and the questions you want to ask — it’s all
        saved here on your phone.
      </p>

      {/* Saved visits */}
      {visits.length > 0 && (
        <ul className="mt-4 space-y-3">
          {visits.map((v) => (
            <SavedVisit key={v.id} visit={v} onRemove={() => removeVisit(v.id)} />
          ))}
        </ul>
      )}

      {/* Add-visit form or trigger */}
      {draft ? (
        <VisitForm
          draft={draft}
          setDraft={setDraft}
          onSave={saveDraft}
          onCancel={() => setDraft(null)}
        />
      ) : (
        <button
          onClick={() => setDraft(blankDraft(defaultType))}
          className="mt-4 w-full rounded-xl border border-dashed border-rose-300 px-4 py-2.5 font-medium text-rose-600 transition hover:bg-rose-50"
        >
          ＋ Add a visit
        </button>
      )}
    </section>
  )
}

function SavedVisit({ visit, onRemove }) {
  const [open, setOpen] = useState(false)
  const type = visitTypes.find((t) => t.id === visit.typeId) || visitTypes[0]
  const filled = visitFields.filter((f) => visit[f.key])

  return (
    <li className={'rounded-xl p-3 ring-1 ' + (ACCENT[type.accent] || ACCENT.rose)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="font-medium">
          {type.title}
          {visit.date ? ` · ${visit.date}` : ''}
        </span>
        <span className="text-stone-400">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-2 space-y-2 text-sm text-stone-700">
          {filled.map((f) => (
            <p key={f.key}>
              <span className="text-stone-500">{f.label}:</span> {visit[f.key]}
            </p>
          ))}
          {visit.questions.length > 0 && (
            <div>
              <p className="text-stone-500">Questions to ask:</p>
              <ul className="ml-4 list-disc">
                {visit.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          )}
          {visit.providerRecs && (
            <p>
              <span className="text-stone-500">Provider’s recommendations:</span>{' '}
              {visit.providerRecs}
            </p>
          )}
          <button
            onClick={onRemove}
            className="mt-1 text-xs font-medium text-rose-500 hover:underline"
          >
            Delete this visit
          </button>
        </div>
      )}
    </li>
  )
}

function VisitForm({ draft, setDraft, onSave, onCancel }) {
  const type = visitTypes.find((t) => t.id === draft.typeId) || visitTypes[0]
  const [customQ, setCustomQ] = useState('')

  function set(key, value) {
    setDraft((d) => ({ ...d, [key]: value }))
  }
  function addQuestion(text) {
    const q = text.trim()
    if (q && !draft.questions.includes(q)) set('questions', [...draft.questions, q])
  }
  function removeQuestion(i) {
    set(
      'questions',
      draft.questions.filter((_, idx) => idx !== i),
    )
  }

  return (
    <div className="mt-4 rounded-xl bg-stone-50 p-4 ring-1 ring-stone-200">
      {/* Visit type picker */}
      <div className="flex flex-wrap gap-2">
        {visitTypes.map((t) => (
          <button
            key={t.id}
            onClick={() => set('typeId', t.id)}
            className={
              'rounded-full px-3 py-1 text-xs font-medium transition ' +
              (t.id === draft.typeId
                ? 'bg-rose-500 text-white'
                : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-100')
            }
          >
            {t.title.replace('My ', '')}
          </button>
        ))}
      </div>

      <p className="mt-3 text-xs italic text-stone-500">{type.intro}</p>
      {type.tip && <p className="mt-1 text-xs text-rose-500">💬 {type.tip}</p>}

      {/* Measured fields */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {visitFields.map((f) => (
          <label
            key={f.key}
            className={
              'block text-xs font-medium text-stone-600 ' +
              (f.type === 'textarea' ? 'col-span-2' : '')
            }
          >
            {f.label}
            {f.type === 'textarea' ? (
              <textarea
                value={draft[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                rows={2}
                className="mt-1 w-full resize-y rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-sm text-stone-800 outline-none focus:border-rose-400"
              />
            ) : (
              <input
                type={f.type}
                value={draft[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => set(f.key, e.target.value)}
                className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-sm text-stone-800 outline-none focus:border-rose-400"
              />
            )}
          </label>
        ))}
      </div>

      {/* Questions to ask */}
      <div className="mt-4">
        <p className="text-xs font-medium text-stone-600">Questions to ask this visit</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {type.suggestedQuestions
            .filter((q) => !draft.questions.includes(q))
            .map((q) => (
              <button
                key={q}
                onClick={() => addQuestion(q)}
                className="rounded-full bg-white px-2.5 py-1 text-xs text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50"
              >
                ＋ {q}
              </button>
            ))}
        </div>

        {draft.questions.length > 0 && (
          <ul className="mt-2 space-y-1">
            {draft.questions.map((q, i) => (
              <li
                key={i}
                className="flex items-start justify-between gap-2 text-sm text-stone-700"
              >
                <span>• {q}</span>
                <button
                  onClick={() => removeQuestion(i)}
                  className="shrink-0 text-xs text-stone-400 hover:text-rose-500"
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex gap-2">
          <input
            value={customQ}
            onChange={(e) => setCustomQ(e.target.value)}
            placeholder="Add your own question…"
            className="flex-1 rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-sm outline-none focus:border-rose-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addQuestion(customQ)
                setCustomQ('')
              }
            }}
          />
          <button
            onClick={() => {
              addQuestion(customQ)
              setCustomQ('')
            }}
            className="rounded-lg bg-stone-200 px-3 text-sm font-medium text-stone-700 hover:bg-stone-300"
          >
            Add
          </button>
        </div>
      </div>

      {/* Provider's recommendations */}
      <label className="mt-4 block text-xs font-medium text-stone-600">
        Provider’s recommendations
        <textarea
          value={draft.providerRecs}
          onChange={(e) => set('providerRecs', e.target.value)}
          rows={2}
          className="mt-1 w-full resize-y rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-sm text-stone-800 outline-none focus:border-rose-400"
        />
      </label>

      <div className="mt-4 flex gap-3">
        <button
          onClick={onSave}
          className="rounded-xl bg-rose-500 px-4 py-2 font-medium text-white hover:bg-rose-600"
        >
          Save visit
        </button>
        <button
          onClick={onCancel}
          className="rounded-xl px-4 py-2 font-medium text-stone-500 hover:bg-stone-100"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
