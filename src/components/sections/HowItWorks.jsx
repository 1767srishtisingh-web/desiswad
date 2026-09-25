import { ArrowRight } from 'lucide-react';
import { FLOW, STEPS } from '../../data/content.js';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function HowItWorks({ showFlow = true }) {
  return (
    <section className="band" aria-labelledby="how-title">
      <div className="wrap">
        <SectionHeading
          kicker="How it works"
          id="how-title"
          title="Four steps between a local shop and your room"
        />

        <ol className="steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {STEPS.map((step) => (
            <li className="step" key={step.n}>
              <span className="step__n" aria-hidden="true">
                {step.n}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        {showFlow ? (
          <div className="flow" aria-label="Order journey">
            {FLOW.map((node, i) => (
              <span key={node} style={{ display: 'contents' }}>
                <span className={`flow__node${i === 4 ? ' flow__node--accent' : ''}`}>{node}</span>
                {i < FLOW.length - 1 ? <ArrowRight size={16} aria-hidden="true" /> : null}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
