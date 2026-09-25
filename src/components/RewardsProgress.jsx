import { POINTS_NAME, REWARD_TIERS } from '../data/rewards.js';
import { nextTier, progressTo } from '../services/rewardService.js';

export default function RewardsProgress({ points }) {
  const tier = nextTier(points);
  const pct = progressTo(points, tier);
  const target = tier ? tier.cost : REWARD_TIERS[REWARD_TIERS.length - 1].cost;

  return (
    <div className="points">
      <div>
        <span className="points__big">{points}</span>
        <p className="points__label" style={{ margin: 0 }}>
          {POINTS_NAME} collected
        </p>
      </div>
      <div>
        <div
          className="bar"
          role="progressbar"
          aria-valuenow={points}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-label={`${points} of ${target} points`}
        >
          <span className="bar__fill" style={{ width: `${pct}%` }} />
        </div>
        <p className="points__next">
          {tier
            ? `${tier.cost - points} points away from ${tier.title}.`
            : 'Every reward on this page is unlocked. Nice work.'}
        </p>
        <p className="fine" style={{ color: '#c7b0a0', margin: 0 }}>
          {points} / {target} points
        </p>
      </div>
    </div>
  );
}
