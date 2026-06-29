// Nurture logo — a single bloom. The flower ties to the book's floral identity
// and to the name (nurture = growth). Scales cleanly for the header and the
// app/home-screen icon.
export function BloomMark({ size = 40, className = '' }) {
  // 8 petals placed around the center.
  const petals = Array.from({ length: 8 }, (_, i) => i * 45)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="Nurture"
    >
      {/* leaf */}
      <path
        d="M50 78 C40 92 22 92 18 80 C32 78 44 82 50 78 Z"
        fill="#8aa893"
        opacity="0.9"
      />
      <g transform="translate(50 48)">
        {petals.map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-22"
            rx="11"
            ry="22"
            fill="#e98aae"
            opacity="0.85"
            transform={`rotate(${deg})`}
          />
        ))}
        {/* inner petals, deeper tone */}
        {petals.map((deg) => (
          <ellipse
            key={'i' + deg}
            cx="0"
            cy="-13"
            rx="7"
            ry="14"
            fill="#c64f7b"
            opacity="0.9"
            transform={`rotate(${deg + 22.5})`}
          />
        ))}
        {/* center */}
        <circle cx="0" cy="0" r="11" fill="#f6b94b" />
        <circle cx="0" cy="0" r="11" fill="#fff" opacity="0.15" />
      </g>
    </svg>
  )
}

// Wordmark lockup used in the header.
export function Wordmark({ size = 40 }) {
  return (
    <div className="flex items-center gap-2.5">
      <BloomMark size={size} />
      <span className="font-display text-4xl font-semibold tracking-tight text-[var(--bloom-deep)]">
        Nurture
      </span>
    </div>
  )
}
