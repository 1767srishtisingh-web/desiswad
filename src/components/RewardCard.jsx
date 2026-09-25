import { Lock, Unlock } from 'lucide-react';

export default function RewardCard({ tier, points }) {
  const unlocked = points >= tier.cost;
  const remaining = tier.cost - points;

  return (
    <article className={`reward${unlocked ? ' is-unlocked' : ''}`}>
      <span className="reward__cost">{tier.cost} pts</span>
      <h3 className="reward__title" style={{ margin: 0, fontSize: '1.05rem' }}>
        {tier.title}
      </h3>
      <p className="reward__desc" style={{ margin: 0 }}>
        {tier.desc}
      </p>
      <p className="reward__state" style={{ margin: 0 }}>
        {unlocked ? (
          <>
            <Unlock size={14} aria-hidden="true" /> Unlocked
          </>
        ) : (
          <span style={{ color: 'var(--muted)' }}>
            <Lock size={14} aria-hidden="true" /> {remaining} points to go
          </span>
        )}
      </p>
    </article>
  );
}
