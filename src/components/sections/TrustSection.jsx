import { ShieldCheck } from 'lucide-react';
import { TRUST_POINTS } from '../../data/content.js';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function TrustSection() {
  return (
    <section className="band band--surface" aria-labelledby="trust-title">
      <div className="wrap">
        <SectionHeading
          kicker="Food handling"
          id="trust-title"
          title="What we check before a box is sealed"
          sub="Plain facts about how the boxes are put together. Nothing here is a certification claim."
        />
        <ul className="trust">
          {TRUST_POINTS.map((point) => (
            <li key={point}>
              <ShieldCheck size={18} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
        <p className="fine" style={{ marginTop: '1.2rem' }}>
          Box contents depend on product availability and the current weekly drop.
        </p>
      </div>
    </section>
  );
}
