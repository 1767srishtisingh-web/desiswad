import { useState } from 'react';
import { PAST_DROPS } from '../../data/drops.js';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import Modal from '../ui/Modal.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function PastDrops() {
  const [active, setActive] = useState(null);

  return (
    <section className="band" id="past-drops" aria-labelledby="past-title">
      <div className="wrap">
        <SectionHeading
          kicker="Missed a drop?"
          id="past-title"
          title="The boxes that already went out"
          sub="Partly revealed on purpose. The rest stays with the people who ordered."
        />

        <div className="grid grid-4">
          {PAST_DROPS.map((drop) => (
            <article className="parcel" key={drop.id}>
              <div
                aria-hidden="true"
                style={{
                  height: 78,
                  borderRadius: 10,
                  marginBottom: '0.8rem',
                  background: drop.tint,
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  color: 'var(--text)',
                }}
              >
                {drop.no.replace('Drop ', '')}
              </div>
              <Badge>Past drop</Badge>
              <h3 style={{ fontSize: '1.15rem', margin: '0.6rem 0 0.2rem' }}>{drop.theme}</h3>
              <p className="fine" style={{ margin: '0 0 0.8rem' }}>
                {drop.items} · {drop.shops}
              </p>
              <Button variant="secondary" size="sm" onClick={() => setActive(drop)}>
                View drop
              </Button>
            </article>
          ))}
        </div>
      </div>

      <Modal open={Boolean(active)} onClose={() => setActive(null)} title={active?.theme}>
        {active ? (
          <>
            <Badge variant="soft">{active.no}</Badge>
            <h2 style={{ fontSize: 'var(--step-2)', margin: '0.7rem 0 0.4rem' }}>{active.theme}</h2>
            <p style={{ color: 'var(--muted)' }}>{active.note}</p>
            <h3 style={{ fontSize: '1rem' }}>What we can say about it</h3>
            <ul>
              {active.revealed.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="fine">
              Past boxes are not restocked. Each drop is bought and packed for that week only.
            </p>
            <Button to="/order" block>
              Get this week&apos;s box instead
            </Button>
          </>
        ) : null}
      </Modal>
    </section>
  );
}
