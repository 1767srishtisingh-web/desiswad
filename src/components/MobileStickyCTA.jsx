import { useEffect } from 'react';
import { Gift } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { CURRENT_DROP } from '../data/drops.js';
import { inr } from '../utils/format.js';
import { useScrolledPast } from '../hooks/useScrolledPast.js';
import Button from './ui/Button.jsx';

/** Bottom bar on small screens. Appears once the hero is scrolled past. */
export default function MobileStickyCTA() {
  const past = useScrolledPast(520);
  const { pathname } = useLocation();
  const hidden = pathname.startsWith('/order');
  const show = past && !hidden;

  useEffect(() => {
    document.body.classList.toggle('has-sticky-cta', show);
    return () => document.body.classList.remove('has-sticky-cta');
  }, [show]);

  return (
    <div className={`stickycta${show ? ' is-visible' : ''}`} aria-hidden={!show}>
      <div className="stickycta__row">
        <span className="stickycta__price">
          {inr(CURRENT_DROP.price)}
          <span>Drop #{CURRENT_DROP.number}</span>
        </span>
        <Button to="/order" icon={Gift} block tabIndex={show ? 0 : -1}>
          Get this week&apos;s box
        </Button>
      </div>
    </div>
  );
}
