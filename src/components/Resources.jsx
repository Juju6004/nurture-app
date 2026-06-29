import { resourceGroups } from '../data/content.js'
import SectionCard from './SectionCard.jsx'

// Local resource directory — tap-to-call / tap-to-open links pulled from the
// Caring for Motherhood journal. The phone numbers are the whole point on a
// phone: one tap to reach real help.
export default function Resources() {
  return (
    <SectionCard
      accent="violet"
      icon="🤝"
      title="Resources & helplines"
      subtitle="Real help, one tap away. Numbers and links from the Caring for Motherhood journal."
    >
      <div className="space-y-4">
        {resourceGroups.map((group) => (
          <div key={group.category}>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400">
              {group.category}
            </h3>
            <ul className="mt-2 space-y-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/70 p-3 ring-1 ring-stone-100"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-stone-800">{item.name}</p>
                    {item.desc && <p className="text-xs text-stone-500">{item.desc}</p>}
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {item.web && (
                      <a
                        href={item.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-200"
                      >
                        Open
                      </a>
                    )}
                    {item.phone && (
                      <a
                        href={item.phoneHref}
                        className="rounded-full bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-600"
                      >
                        Call {item.phone}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
