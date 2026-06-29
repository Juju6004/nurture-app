import { redFlags } from '../data/content.js'
import ContentItem from './ContentItem.jsx'

export default function RedFlags() {
  return (
    <section className="rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-200">
      <h2 className="flex items-center gap-2 text-lg font-semibold text-rose-800">
        <span aria-hidden>⚠️</span> When to call your provider
      </h2>
      <p className="mt-1 text-sm text-rose-700/80">
        This is not an emergency tool. If something feels seriously wrong, contact your
        provider or local emergency number.
      </p>

      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-rose-700">
        During pregnancy
      </h3>
      <ul className="mt-2 space-y-2">
        {redFlags.pregnancy.map((item) => (
          <ContentItem key={item.topic} item={item} />
        ))}
      </ul>

      <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-rose-700">
        Breastfeeding
      </h3>
      <ul className="mt-2 space-y-2">
        {redFlags.breastfeeding.map((item) => (
          <ContentItem key={item.topic} item={item} />
        ))}
      </ul>
    </section>
  )
}
