// Renders a single content item. While `detail` is null we show a "pending
// clinical sourcing" badge instead of inventing a medical claim — this enforces
// the project's sourcing rule at the UI layer.
export default function ContentItem({ item }) {
  const sourced = item.detail != null
  return (
    <li className="rounded-xl bg-white/70 p-4 ring-1 ring-stone-100">
      <p className="font-medium text-stone-800">{item.topic}</p>
      {sourced ? (
        <>
          <p className="mt-1 text-sm leading-relaxed text-stone-600">{item.detail}</p>
          {item.source && (
            <p className="mt-2 text-xs text-stone-400">
              Source: {item.source.name}
              {item.source.year ? ` (${item.source.year})` : ''}
            </p>
          )}
        </>
      ) : (
        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
          pending clinical sourcing
        </span>
      )}
    </li>
  )
}
