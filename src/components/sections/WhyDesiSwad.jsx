import { WHY_POINTS } from '../../data/content.js';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function WhyDesiSwad() {
  return (
    <section className="band band--surface" aria-labelledby="why-title">
      <div className="wrap">
        <SectionHeading
          kicker="Why DesiSwad"
          id="why-title"
          title="Six reasons the box beats the shop downstairs"
          sub="One product, sourced from many places, rebuilt from scratch every week."
        />
        <div className="grid grid-3">
          {WHY_POINTS.map((item) => (
            <article className="card card--flat" key={item.title}>
              <h3 style={{ fontSize: '1.1rem' }}>{item.title}</h3>
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.96rem' }}>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
