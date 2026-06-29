import { useState } from 'react'
import { gestationFromDueDate, gestationFromWeek } from '../lib/pregnancy.js'

// Lets the user resolve their gestational age by either entering a due date
// or typing the week they're currently in. Both paths call onResolve with a
// normalized gestation object.
export default function DueDateInput({ onResolve }) {
  const [mode, setMode] = useState('dueDate')
  const [dueDate, setDueDate] = useState('')
  const [week, setWeek] = useState('')

  function submit(e) {
    e.preventDefault()
    if (mode === 'dueDate' && dueDate) {
      onResolve(gestationFromDueDate(dueDate))
    } else if (mode === 'week' && week !== '') {
      const w = Math.min(45, Math.max(0, parseInt(week, 10) || 0))
      onResolve(gestationFromWeek(w))
    }
  }

  return (
    <form onSubmit={submit} className="section-card">
      <div className="mb-3 flex gap-2 text-sm">
        <TabButton active={mode === 'dueDate'} onClick={() => setMode('dueDate')}>
          I know my due date
        </TabButton>
        <TabButton active={mode === 'week'} onClick={() => setMode('week')}>
          I know my week
        </TabButton>
      </div>

      {mode === 'dueDate' ? (
        <label className="block text-sm font-medium text-stone-700">
          Estimated due date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-rose-400"
          />
        </label>
      ) : (
        <label className="block text-sm font-medium text-stone-700">
          How many weeks pregnant are you?
          <input
            type="number"
            min="0"
            max="45"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="e.g. 24"
            className="mt-1 w-full rounded-xl border border-rose-200 bg-white px-3 py-2 text-stone-800 outline-none focus:border-rose-400"
          />
        </label>
      )}

      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-rose-500 px-4 py-2.5 font-medium text-white transition hover:bg-rose-600 active:scale-[0.99]"
      >
        Show my week
      </button>
    </form>
  )
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-full px-3 py-1.5 transition ' +
        (active ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100')
      }
    >
      {children}
    </button>
  )
}
