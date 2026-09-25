export default function Skeleton({ height = 16, width = '100%', radius, style }) {
  return (
    <span
      className="skeleton"
      aria-hidden="true"
      style={{
        display: 'block',
        height,
        width,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="card" aria-hidden="true">
      <Skeleton height={34} width="42%" />
      <div style={{ height: 14 }} />
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <Skeleton height={12} width={i === lines - 1 ? '60%' : '100%'} />
        </div>
      ))}
    </div>
  );
}
