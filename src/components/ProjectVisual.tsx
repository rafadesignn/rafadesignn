import type { Project } from "@/lib/data"

/**
 * Generative cover art for each case study — pure SVG so the page stays
 * fully self-contained (no image requests, crisp at any DPR).
 */
export function ProjectVisual({ project }: { project: Project }) {
  const [c1, c2, c3] = project.palette
  const gradId = `grad-${project.index}`

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      role="img"
      aria-label={`${project.title} cover artwork`}
    >
      <defs>
        <radialGradient id={gradId} cx="70%" cy="30%" r="90%">
          <stop offset="0%" stopColor={c2} />
          <stop offset="100%" stopColor={c3} />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill={`url(#${gradId})`} />

      {project.variant === "rings" && (
        <g fill="none" stroke={c1}>
          {[60, 110, 170, 240, 320, 410].map((r, i) => (
            <circle key={r} cx="560" cy="300" r={r} strokeWidth={1.5} opacity={0.85 - i * 0.13} />
          ))}
          <circle cx="560" cy="300" r="26" fill={c1} stroke="none" />
          <circle cx="150" cy="470" r="8" fill={c1} stroke="none" opacity="0.9" />
          <line x1="150" y1="470" x2="534" y2="300" strokeWidth="1" opacity="0.5" strokeDasharray="4 6" />
        </g>
      )}

      {project.variant === "arch" && (
        <g fill="none" stroke={c1}>
          {[380, 320, 260, 200, 140].map((r, i) => (
            <path
              key={r}
              d={`M ${400 - r} 600 A ${r} ${r} 0 0 1 ${400 + r} 600`}
              strokeWidth={i === 4 ? 3 : 1.5}
              opacity={0.35 + i * 0.16}
            />
          ))}
          <circle cx="400" cy="270" r="34" fill={c1} stroke="none" />
          <circle cx="655" cy="130" r="6" fill={c1} stroke="none" opacity="0.8" />
          <circle cx="130" cy="170" r="4" fill={c1} stroke="none" opacity="0.6" />
        </g>
      )}

      {project.variant === "grid" && (
        <g>
          {Array.from({ length: 9 }, (_, row) =>
            Array.from({ length: 13 }, (_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={70 + col * 55}
                cy={70 + row * 55}
                r="2.5"
                fill={c1}
                opacity={0.35}
              />
            )),
          )}
          <circle cx="540" cy="230" r="150" fill="none" stroke={c1} strokeWidth="1.5" opacity="0.9" />
          <rect x="150" y="330" width="190" height="120" rx="14" fill="none" stroke={c1} strokeWidth="1.5" opacity="0.7" />
          <line x1="150" y1="450" x2="540" y2="80" stroke={c1} strokeWidth="1" opacity="0.5" />
        </g>
      )}

      {project.variant === "wave" && (
        <g fill="none" stroke={c1}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M -40 ${180 + i * 55} C 160 ${100 + i * 55}, 320 ${260 + i * 55}, 520 ${180 + i * 55} S 840 ${100 + i * 55}, 900 ${180 + i * 55}`}
              strokeWidth={1.5}
              opacity={0.9 - i * 0.13}
            />
          ))}
          <circle cx="520" cy="180" r="22" fill={c1} stroke="none" />
        </g>
      )}
    </svg>
  )
}
