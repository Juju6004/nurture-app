import { clinic } from '../data/content.js'
import SectionCard from './SectionCard.jsx'

// Office contact card. Shows the clinic, the office number, and hours — not a
// promise of round-the-clock access to a specific person.
export default function ClinicInfo() {
  return (
    <SectionCard accent="leaf" icon="☎️" title="Lactation support">
      <p className="text-sm font-medium text-stone-700">{clinic.name}</p>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">{clinic.blurb}</p>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 font-medium text-stone-500">Office</dt>
          <dd>
            <a
              href={clinic.phoneHref}
              className="font-medium text-rose-600 underline-offset-2 hover:underline"
            >
              {clinic.phoneDisplay}
            </a>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 font-medium text-stone-500">Hours</dt>
          <dd className="text-stone-600">
            {clinic.hours || 'Call the office to confirm hours and to schedule.'}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-20 shrink-0 font-medium text-stone-500">Online</dt>
          <dd className="text-stone-600">{clinic.portalName}</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs text-stone-400">{clinic.coverageNote}</p>
    </SectionCard>
  )
}
