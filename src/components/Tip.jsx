import { BloomMark } from './Logo.jsx'

// A warm tip in a speech bubble — the digital version of the book's friendly
// doctor-with-a-speech-bubble asides.
export default function Tip({ children }) {
  return (
    <div className="flex items-end gap-2">
      <div className="tip-bubble bg-[rgb(255_241_245)] px-4 py-3 text-sm leading-relaxed text-rose-800 ring-1 ring-rose-100">
        {children}
      </div>
      <BloomMark size={28} className="mb-1 shrink-0" />
    </div>
  )
}
