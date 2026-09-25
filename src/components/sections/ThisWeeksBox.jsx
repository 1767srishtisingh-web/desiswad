import { Clock, Gift, PackageCheck, Truck } from 'lucide-react';
import { CURRENT_DROP } from '../../data/drops.js';
import { inr } from '../../utils/format.js';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';
import MysteryReveal from '../MysteryReveal.jsx';

export default function ThisWeeksBox() {
  const claimed = CURRENT_DROP.boxesTotal - CURRENT_DROP.boxesLeft;
  const pct = Math.round((claimed / CURRENT_DROP.boxesTotal) * 100);

  return (
    <section className="band" id="this-week" aria-labelledby="week-title">
      <div className="wrap">
        <SectionHeading
          kicker="This week"
          id="week-title"
          title="Meet this week’s mystery box"
          sub="You get the categories now. The products stay sealed until the box is in your hands."
        />

        <div className="weekbox">
          <div className="weekbox__panel">
            <div className="weekbox__meta">
              <Badge variant="live" live>
                Live drop
              </Badge>
              <Badge>{CURRENT_DROP.itemCount} snacks</Badge>
              <Badge variant="soft">{CURRENT_DROP.theme}</Badge>
            </div>

            <h3 style={{ fontSize: 'var(--step-2)' }}>{CURRENT_DROP.title}</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.98rem' }}>{CURRENT_DROP.teaser}</p>

            <p className="weekbox__price">
              {inr(CURRENT_DROP.price)} <small>per box</small>
            </p>

            <div className="weekbox__stock">
              <div
                className="bar"
                role="progressbar"
                aria-valuenow={claimed}
                aria-valuemin={0}
                aria-valuemax={CURRENT_DROP.boxesTotal}
                aria-label={`${claimed} of ${CURRENT_DROP.boxesTotal} boxes claimed`}
              >
                <span className="bar__fill" style={{ width: `${pct}%` }} />
              </div>
              <p className="fine" style={{ marginTop: '0.5rem' }}>
                {CURRENT_DROP.boxesLeft} of {CURRENT_DROP.boxesTotal} boxes left this week
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.2rem', fontSize: '0.93rem' }}>
              <li className="row" style={{ gap: '0.5rem' }}>
                <Clock size={15} aria-hidden="true" /> Orders close {CURRENT_DROP.closesOn}
              </li>
              <li className="row" style={{ gap: '0.5rem' }}>
                <Truck size={15} aria-hidden="true" /> Packed and sent out {CURRENT_DROP.shipsOn}
              </li>
              <li className="row" style={{ gap: '0.5rem', marginBottom: 0 }}>
                <PackageCheck size={15} aria-hidden="true" /> Packaging and expiry checked before
                sealing
              </li>
            </ul>

            <Button to="/order" icon={Gift} block size="lg">
              I want the mystery
            </Button>
            <p className="fine" style={{ marginTop: '0.7rem', marginBottom: 0 }}>
              Contents vary with every drop and depend on what we can source that week.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem' }}>What the box holds</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.96rem' }}>
              Five slots, five categories. Open a sample to see how a real box behaves.
            </p>
            <MysteryReveal />
          </div>
        </div>
      </div>
    </section>
  );
}
