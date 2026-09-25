import { useCallback, useEffect, useState } from 'react';
import { Gift, PackageOpen, RotateCcw, Star, Users } from 'lucide-react';
import { EARN_RULES, POINTS_NAME, REWARD_TIERS } from '../data/rewards.js';
import { listOrders } from '../services/orderService.js';
import { addPoints, getRewards, resetRewards } from '../services/rewardService.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useToast } from '../hooks/useToast.js';
import { inr, shortDate } from '../utils/format.js';
import PageHeader from '../components/PageHeader.jsx';
import RewardsProgress from '../components/RewardsProgress.jsx';
import RewardCard from '../components/RewardCard.jsx';
import ReferralCard from '../components/ReferralCard.jsx';
import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import Skeleton, { SkeletonCard } from '../components/ui/Skeleton.jsx';

const ICONS = { order: Gift, referral: Users, review: Star, streak: Gift };

export default function RewardsPage() {
  const [points, setPoints] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useDocumentTitle(
    'DesiSwad Rewards — collect Swad Points',
    'Earn Swad Points on every DesiSwad order, referral and review, and redeem them for discounts or a free Mini box.',
  );

  const load = useCallback(async () => {
    setLoading(true);
    const [rewards, orderList] = await Promise.all([getRewards(), listOrders()]);
    setPoints(rewards.points);
    setOrders(orderList);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function onReset() {
    await resetRewards();
    setPoints(0);
    toast.info('Demo points cleared.');
  }

  async function onSimulateReview() {
    const next = await addPoints(10, 'Review left (demo)');
    setPoints(next.points);
    toast.success('10 Swad Points added for your review.');
  }

  return (
    <>
      <PageHeader
        title="DesiSwad Rewards"
        crumb="Rewards"
        sub={`Collect ${POINTS_NAME} on orders, referrals and feedback. Spend them on your next drop.`}
      />

      <section className="band band--tight">
        <div className="wrap">
          {loading ? (
            <Skeleton height={190} radius="var(--r-xl)" />
          ) : (
            <RewardsProgress points={points} />
          )}

          <p className="fine" style={{ marginTop: '0.9rem' }}>
            Demo rewards system. Points live in this browser until accounts are connected to a
            backend, and redemption is not automatic yet.
          </p>
        </div>
      </section>

      <section className="band band--tight" aria-labelledby="tiers-title">
        <div className="wrap">
          <SectionHeading kicker="What points get you" id="tiers-title" title="Three things to aim for" />
          <div className="grid grid-3">
            {REWARD_TIERS.map((tier) => (
              <RewardCard tier={tier} points={points} key={tier.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="band band--surface" aria-labelledby="earn-title">
        <div className="wrap grid grid-2">
          <div>
            <SectionHeading kicker="How to earn" id="earn-title" title="Four ways to collect" />
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
            <div className="row" style={{ marginTop: '1.2rem' }}>
              <Button to="/order" icon={Gift}>
                Order a box
              </Button>
              <Button onClick={onSimulateReview} variant="secondary" icon={Star}>
                Leave a review
              </Button>
              <Button onClick={onReset} variant="ghost" icon={RotateCcw}>
                Reset demo points
              </Button>
            </div>
          </div>

          <div>
            <SectionHeading kicker="Your orders" title="Boxes you have ordered here" />
            {loading ? (
              <SkeletonCard lines={2} />
            ) : orders.length === 0 ? (
              <EmptyState
                icon={PackageOpen}
                title="No orders in this browser yet"
                body="Place a mystery order and it shows up here with the points it earned."
                action={
                  <Button to="/order" size="sm">
                    Get this week&apos;s box
                  </Button>
                }
              />
            ) : (
              <div className="stack-sm">
                {orders.map((order) => (
                  <div className="orderrow" key={order.id}>
                    <span>
                      <span className="orderrow__id">{order.id}</span>
                      <span className="orderrow__meta" style={{ display: 'block' }}>
                        {order.planName} · Drop #{order.drop} · {shortDate(order.createdAt)}
                      </span>
                    </span>
                    <span className="orderrow__right">
                      <span className="badge badge--soft">{order.status}</span>
                      <strong>{inr(order.total)}</strong>
                    </span>
                  </div>
                ))}
                <Button to="/feedback" variant="secondary" size="sm">
                  Give feedback on a drop
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="ref-title">
        <div className="wrap">
          <h2 id="ref-title" className="sr-only">
            Referrals
          </h2>
          <ReferralCard />
        </div>
      </section>
    </>
  );
}
