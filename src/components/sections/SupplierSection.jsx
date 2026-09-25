import { Store } from 'lucide-react';
import { PARTNERS } from '../../data/partners.js';
import Button from '../ui/Button.jsx';
import SectionHeading from '../ui/SectionHeading.jsx';

export default function SupplierSection() {
  return (
    <section className="band band--surface" aria-labelledby="partners-title">
      <div className="wrap">
        <SectionHeading
          kicker="Where the snacks come from"
          id="partners-title"
          title="One box. Many local stories."
          sub="Instead of relying on one snack or one supplier, DesiSwad can bring together products from multiple local and regional food businesses."
        />

        <div className="grid grid-4">
          {PARTNERS.map((p) => (
            <article className="partner" key={p.id}>
              <span className="partner__avatar" style={{ '--tint': p.tint }} aria-hidden="true">
                {p.initial}
              </span>
              <span className="partner__name">{p.name}</span>
              <span className="partner__what">{p.what}</span>
              <span className="partner__where">{p.where}</span>
            </article>
          ))}
        </div>

        <div className="pivot" style={{ marginTop: '2rem' }}>
          <h3>Want your snack in the next mystery drop?</h3>
          <p>
            Send us the product, price and packaging details. We review every submission before the
            next sourcing round.
          </p>
          <Button to="/partner" variant="gold" icon={Store}>
            Become a snack partner
          </Button>
        </div>
      </div>
    </section>
  );
}
