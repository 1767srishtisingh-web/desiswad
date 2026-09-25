import { CURRENT_DROP } from '../data/drops.js';
import { FREQUENCIES, getPlan, PREFERENCES } from '../data/plans.js';
import { SITE } from '../data/site.js';
import { inr } from '../utils/format.js';

export function orderTotals(form) {
  const plan = getPlan(form.boxType);
  const qty = Math.max(1, Number(form.quantity) || 1);
  const subtotal = plan.price * qty;
  const delivery = subtotal >= SITE.freeDeliveryAbove ? 0 : SITE.deliveryFee;
  return { plan, qty, subtotal, delivery, total: subtotal + delivery };
}

export default function OrderSummary({ form }) {
  const { plan, qty, subtotal, delivery, total } = orderTotals(form);
  const freq = FREQUENCIES.find((f) => f.id === form.frequency);
  const pref = PREFERENCES.find((p) => p.id === form.preference);

  return (
    <aside className="summary" aria-label="Order summary">
      <h2>Order summary</h2>

      <div className="summary__line">
        <span>
          {plan.name} × {qty}
        </span>
        <span>{inr(subtotal)}</span>
      </div>
      <div className="summary__line">
        <span>Delivery</span>
        <span>{delivery === 0 ? 'Free' : inr(delivery)}</span>
      </div>
      <div className="summary__line">
        <span>Drop</span>
        <span>#{CURRENT_DROP.number}</span>
      </div>
      <div className="summary__line">
        <span>Frequency</span>
        <span>{freq ? freq.label : '—'}</span>
      </div>
      <div className="summary__line">
        <span>Preference</span>
        <span>{pref ? pref.label : '—'}</span>
      </div>

      <p className="summary__total">
        <span>Total</span>
        <span>{inr(total)}</span>
      </p>

      <p className="summary__note">
        Delivery is {inr(SITE.deliveryFee)}, free above {inr(SITE.freeDeliveryAbove)}. Demo amounts
        for the prototype. Contents of drop #{CURRENT_DROP.number} stay hidden until you open the
        box.
      </p>
    </aside>
  );
}
