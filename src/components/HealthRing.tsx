interface HealthRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  animated?: boolean;
}

function getHealthColor(score: number): string {
  if (score >= 70) return "var(--health-green)";
  if (score >= 40) return "var(--health-amber)";
  return "var(--health-red)";
}

function getHealthTrackColor(score: number): string {
  if (score >= 70) return "oklch(0.7 0.2 145 / 0.15)";
  if (score >= 40) return "oklch(0.78 0.17 80 / 0.15)";
  return "oklch(0.65 0.22 25 / 0.15)";
}

export function HealthRing({ score, size = 72, strokeWidth = 5, animated = true }: HealthRingProps) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const pct = Math.max(0, Math.min(100, score));
  const offset = circumference - (pct / 100) * circumference;
  const color = getHealthColor(score);
  const trackColor = getHealthTrackColor(score);
  const center = size / 2;
  const fontSize = size < 64 ? 13 : 15;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label={`Health score: ${score}`}
    >
      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={
          animated
            ? {
                transition: "stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
              }
            : undefined
        }
      />
      {/* Score text */}
      <text
        x={center}
        y={center + fontSize * 0.35}
        textAnchor="middle"
        fill={color}
        fontSize={fontSize}
        fontWeight="600"
        fontFamily="'Space Grotesk', system-ui, sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}
