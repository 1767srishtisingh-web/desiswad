import { Eye, Gift } from 'lucide-react';
import { CURRENT_DROP } from '../../data/drops.js';
import { SITE } from '../../data/site.js';
import { inr } from '../../utils/format.js';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';

const PACKETS = [
  { cls: 'packet--a', sw: '#E85D1F', rot: '-6deg', label: 'Something spicy' },
  { cls: 'packet--b', sw: '#96162E', rot: '5deg', label: 'Something sweet' },
  { cls: 'packet--c', sw: '#F5B301', rot: '4deg', label: 'Something crunchy' },
  { cls: 'packet--d', sw: '#17614C', rot: '-5deg', label: 'Something regional' },
];

const BADGES = [
  { cls: 'floatbadge--1', text: 'New every week' },
  { cls: 'floatbadge--2', text: 'Limited drop' },
  { cls: 'floatbadge--3', text: 'Regional snacks' },
  { cls: 'floatbadge--4', text: 'Curated box' },
];

export default function Hero({ onRevealClick }) {
  return (
    <section className="hero paper" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <Badge variant="live" live>
            Drop #{CURRENT_DROP.number} is open · closes {CURRENT_DROP.closesOn}
          </Badge>

          <h1 id="hero-title">
            What&apos;s inside? <em>That&apos;s the point.</em>
          </h1>

          <p className="hero__sub">
            Discover a new mix of regional, local and unexpected Indian snacks every week — curated
            specially for hostel, PG and student life.
          </p>

          <div className="hero__ctas">
            <Button to="/order" size="lg" icon={Gift}>
              Get this week&apos;s box
            </Button>
            <Button variant="secondary" size="lg" icon={Eye} onClick={onRevealClick}>
              Reveal the mystery
            </Button>
          </div>

          <ul className="hero__facts">
            <li>
              <strong>{inr(CURRENT_DROP.price)}</strong>
              <span>Starting price</span>
            </li>
            <li>
              <strong>{CURRENT_DROP.itemCount}</strong>
              <span>Snacks per box</span>
            </li>
            <li>
              <strong>Every Monday</strong>
              <span>New drop packed</span>
            </li>
          </ul>
        </div>

        <div className="stage" aria-hidden="true">
          <span className="stage__glow" />
          <span className="stage__ring" />

          {PACKETS.map((p) => (
            <div key={p.cls} className={`packet ${p.cls}`} style={{ '--rot': p.rot }}>
              <span className="packet__swatch" style={{ '--sw': p.sw }} />
              {p.label}
            </div>
          ))}

          {BADGES.map((b) => (
            <span key={b.cls} className={`floatbadge ${b.cls}`}>
              {b.text}
            </span>
          ))}

          <div className="boxfig">
            <span className="boxfig__seal">?</span>
            <div className="boxfig__lid" />
            <div className="boxfig__body">
              <span className="boxfig__brand">{SITE.name}</span>
              <span className="boxfig__drop">DROP #{CURRENT_DROP.number}</span>
              <div className="boxfig__tape" />
            </div>
          </div>
        </div>

        {/* Text alternative for the decorative stage above. */}
        <p className="sr-only">
          Illustration: a sealed {SITE.name} mystery box for drop {CURRENT_DROP.number}, surrounded
          by unlabelled snack packets marked with question marks.
        </p>
      </div>
    </section>
  );
}
