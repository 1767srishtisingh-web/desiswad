import { Check } from 'lucide-react';
import { inr } from '../utils/format.js';
import Badge from './ui/Badge.jsx';
import Button from './ui/Button.jsx';

export default function BoxPlan({ plan }) {
  return (
    <article className={`plan${plan.featured ? ' plan--featured' : ''}`}>
      {plan.featured ? (
        <span className="plan__flag">
          <Badge variant="soft">Most picked</Badge>
        </span>
      ) : null}
      <h3 className="plan__name">{plan.name}</h3>
      <p className="plan__price">
        {inr(plan.price)} <small>per box</small>
      </p>
      <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.95rem' }}>{plan.tagline}</p>
      <ul>
        {plan.features.map((f) => (
          <li key={f}>
            <Check size={16} aria-hidden="true" />
            {f}
          </li>
        ))}
      </ul>
      <Button to={`/order?plan=${plan.id}`} variant={plan.featured ? 'primary' : 'secondary'} block>
        {plan.cta}
      </Button>
    </article>
  );
}
