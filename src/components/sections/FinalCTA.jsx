import { Gift } from 'lucide-react';
import { CURRENT_DROP } from '../../data/drops.js';
import { inr } from '../../utils/format.js';
import Button from '../ui/Button.jsx';

export default function FinalCTA() {
  return (
    <section className="finalcta paper" aria-labelledby="final-title">
      <div className="wrap">
        <h2 id="final-title">This week&apos;s box is packed and waiting.</h2>
        <p style={{ maxWidth: '48ch' }}>
          {CURRENT_DROP.boxesLeft} boxes left in drop #{CURRENT_DROP.number}. Orders close{' '}
          {CURRENT_DROP.closesOn}, and the box ships {CURRENT_DROP.shipsOn}.
        </p>
        <div className="row" style={{ justifyContent: 'center', marginTop: '1.4rem' }}>
          <Button to="/order" size="lg" icon={Gift}>
            Get the box · {inr(CURRENT_DROP.price)}
          </Button>
          <Button to="/how-it-works" size="lg" variant="gold">
            See how it works
          </Button>
        </div>
      </div>
    </section>
  );
}
