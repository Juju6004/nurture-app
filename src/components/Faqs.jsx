import { useState } from 'react'
import { faqs } from '../data/content.js'

export default function Faqs() {
  const [query, setQuery] = useState('')
  const filtered = faqs.filter((f) =>
    f.question.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section className="rounded-2xl bg-white/70 p-5 ring-1 ring-stone-100">
      <h2 className="text-lg font-semibold text-stone-800">Lactation FAQs</h2>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search questions…"
        className="mt-3 w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-rose-400"
      />
      <ul className="mt-3 space-y-2">
        {filtered.map((f) => (
          <FaqRow key={f.id} faq={f} />
        ))}
        {filtered.length === 0 && (
          <li className="py-4 text-center text-sm text-stone-400">No questions match.</li>
        )}
      </ul>
    </section>
  )
}

function FaqRow({ faq }) {
  const [open, setOpen] = useState(false)
  const answered = faq.answer != null
  return (
    <li className="rounded-xl ring-1 ring-stone-100">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="font-medium text-stone-800">{faq.question}</span>
        <span className="text-stone-400">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-4 pb-3">
          {answered ? (
            <>
              <p className="text-sm leading-relaxed text-stone-600">{faq.answer}</p>
              {faq.source && (
                <p className="mt-2 text-xs text-stone-400">
                  Source: {faq.source.name}
                  {faq.source.year ? ` (${faq.source.year})` : ''}
                </p>
              )}
            </>
          ) : (
            <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
              pending clinical sourcing
            </span>
          )}
        </div>
      )}
    </li>
  )
}
