import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CURRENT_DROP } from '../data/drops.js';
import { getPlan } from '../data/plans.js';
import { createOrder } from '../services/orderService.js';
import { addPoints } from '../services/rewardService.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useToast } from '../hooks/useToast.js';
import { address, indianPhone, required } from '../utils/validators.js';
import { inr } from '../utils/format.js';
import PageHeader from '../components/PageHeader.jsx';
import OrderForm from '../components/OrderForm.jsx';
import OrderSummary, { orderTotals } from '../components/OrderSummary.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/ui/Modal.jsx';

const VALID_PLANS = ['mini', 'stash'];
const VALID_FREQ = ['once', 'weekly', 'biweekly'];

function validate(form) {
  return {
    name: required(form.name, 'Full name'),
    phone: indianPhone(form.phone),
    place: required(form.place, 'College or PG name'),
    city: required(form.city, 'City'),
    address: address(form.address),
  };
}

export default function OrderPage() {
  const [params] = useSearchParams();
  const toast = useToast();

  useDocumentTitle(
    'Order this week’s mystery box — DesiSwad',
    'Place a DesiSwad mystery box order: pick a box size, delivery frequency and snack preference.',
  );

  const initial = useMemo(() => {
    const planParam = params.get('plan');
    const freqParam = params.get('frequency');
    return {
      name: '',
      phone: '',
      place: '',
      city: '',
      address: '',
      boxType: VALID_PLANS.includes(planParam) ? planParam : 'mini',
      frequency: VALID_FREQ.includes(freqParam) ? freqParam : 'once',
      preference: 'surprise',
      quantity: 1,
      referral: params.get('ref') || '',
      note: '',
    };
  }, [params]);

  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [placed, setPlaced] = useState(null);

  function onChange(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    const firstBad = Object.keys(found).find((k) => found[k]);
    if (firstBad) {
      setErrors(found);
      toast.error('A few details are missing. Check the highlighted fields.');
      const el = document.getElementsByName(firstBad)[0];
      el?.focus();
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    try {
      const totals = orderTotals(form);
      const record = await createOrder({
        ...form,
        planName: totals.plan.name,
        subtotal: totals.subtotal,
        delivery: totals.delivery,
        total: totals.total,
      });
      await addPoints(10, `Order ${record.id}`);
      setPlaced(record);
      toast.success('Mystery order placed. 10 Swad Points added.');
    } catch {
      toast.error('Something went wrong saving the order. Try once more.');
    } finally {
      setSubmitting(false);
    }
  }

  const plan = getPlan(form.boxType);

  return (
    <>
      <PageHeader
        title="Order your mystery box"
        crumb="Order"
        sub={`Drop #${CURRENT_DROP.number} · ${CURRENT_DROP.theme} · from ${inr(plan.price)}`}
      />

      <section className="band band--tight">
        <div className="wrap order">
          <div>
            <OrderForm
              form={form}
              errors={errors}
              submitting={submitting}
              onChange={onChange}
              onSubmit={onSubmit}
            />
          </div>
          <OrderSummary form={form} />
        </div>
      </section>

      <Modal open={Boolean(placed)} onClose={() => setPlaced(null)} title="Mystery unlocked">
        {placed ? (
          <div className="success">
            <span className="success__emoji" aria-hidden="true">
              🎉
            </span>
            <h2>Mystery unlocked!</h2>
            <p className="success__id">{placed.id}</p>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              Your DesiSwad mystery box request has been recorded.
            </p>

            <dl className="success__meta">
              <div>
                <dt>Box</dt>
                <dd>{placed.planName}</dd>
              </div>
              <div>
                <dt>Drop</dt>
                <dd>#{placed.drop}</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>{placed.status}</dd>
              </div>
            </dl>

            <p className="fine" style={{ marginTop: '1rem' }}>
              Prototype order. Nothing has been charged and no box is on its way — the details are
              saved in this browser so you can see the flow end to end.
            </p>

            <div className="row" style={{ justifyContent: 'center', marginTop: '0.4rem' }}>
              <Button to="/">Back to home</Button>
              <Button to="/rewards" variant="secondary">
                See my Swad Points
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
