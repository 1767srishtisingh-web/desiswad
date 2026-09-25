import { ArrowRight, Gift, Star, Users } from 'lucide-react';
import { EARN_RULES, REWARD_TIERS } from '../../data/rewards.js';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

const ICONS = { order: Gift, referral: Users, review: Star, streak: Gift };

export default function RewardsTeaser() {
  return (
    <section className="band" aria-labelledby="rewards-title">
      <div className="wrap">
        <SectionHeading
          kicker="DesiSwad Rewards"
          id="rewards-title"
          title="Keep discovering. Keep earning."
          sub="Swad Points collect quietly in the background: order, refer, tell us what you thought."
        />

        <div className="grid grid-2">
          <div className="stack-sm">
            {EARN_RULES.map((rule) => {
              const Icon = ICONS[rule.id] || Gift;
              return (
                <div className="earn" key={rule.id}>
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    <strong style={{ display: 'block' }}>{rule.label}</strong>
                    <span className="fine">{rule.note}</span>
                  </span>
                  <span className="earn__pts">+{rule.points}</span>
                </div>
              );
            })}
          </div>

          <div className="grid" style={{ gap: '0.8rem' }}>
            {REWARD_TIERS.map((tier) => (
              <div className="reward" key={tier.id}>
                <span className="reward__cost">{tier.cost} pts</span>
                <strong>{tier.title}</strong>
                <span className="reward__desc">{tier.desc}</span>
              </div>
            ))}
            <Button to="/rewards" icon={ArrowRight} iconAfter>
              Open my rewards
            </Button>
          </div>
        </div>

        <p className="fine" style={{ marginTop: '1.2rem' }}>
          Demo rewards system. Points are stored in your browser and are not linked to an account
          yet.
        </p>
      </div>
    </section>
  );
}
