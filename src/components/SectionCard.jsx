// Shared section shell: a soft card with a small colored accent bar, an icon,
// and a Fraunces title — so every section reads as part of one warm system.
const ACCENTS = {
  rose: '#c64f7b',
  amber: '#f0a93a',
  violet: '#8b6fc7',
  teal: '#4f9a92',
  leaf: '#7e9d88',
  red: '#e3536b',
}

export default function SectionCard({ title, icon, accent = 'rose', subtitle, children }) {
  return (
    <section className="section-card">
      <span className="accent-bar" style={{ background: ACCENTS[accent] || ACCENTS.rose }} />
      <div className="mt-2.5 flex items-center gap-2">
        {icon && (
          <span className="text-xl" aria-hidden>
            {icon}
          </span>
        )}
        <h2 className="font-display text-xl font-semibold text-stone-800">{title}</h2>
      </div>
      {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
      <div className="mt-3">{children}</div>
    </section>
  )
}
