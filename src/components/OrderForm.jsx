import { Loader2, Sparkles } from 'lucide-react';
import { FREQUENCIES, PLANS, PREFERENCES } from '../data/plans.js';
import { inr } from '../utils/format.js';
import Button from './ui/Button.jsx';
import { ChipGroup, Input, Select, TextArea } from './ui/Field.jsx';

export default function OrderForm({ form, errors, submitting, onChange, onSubmit }) {
  const set = (key) => (e) => onChange(key, e.target.value);

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="formcard">
        <h2>Where should the box go?</h2>
        <p>We deliver to hostels, PGs and home addresses in the clusters we currently serve.</p>

        <div className="fieldrow">
          <Input
            label="Full name"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={set('name')}
            error={errors.name}
            placeholder="Your name"
            required
          />
          <Input
            label="Phone number"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={form.phone}
            onChange={set('phone')}
            error={errors.phone}
            placeholder="10-digit mobile"
            required
          />
        </div>

        <div className="fieldrow">
          <Input
            label="College / PG name"
            name="place"
            value={form.place}
            onChange={set('place')}
            error={errors.place}
            placeholder="Hostel block, PG or campus"
            required
          />
          <Input
            label="City"
            name="city"
            autoComplete="address-level2"
            value={form.city}
            onChange={set('city')}
            error={errors.city}
            placeholder="City"
            required
          />
        </div>

        <TextArea
          label="Delivery address"
          name="address"
          autoComplete="street-address"
          value={form.address}
          onChange={set('address')}
          error={errors.address}
          hint="room or flat number, street, landmark, pincode"
          placeholder="Room 214, B Block, …"
          required
        />
      </div>

      <div className="formcard">
        <h2>Shape the surprise</h2>
        <p>Preferences narrow what we pick. They never tell you what you are getting.</p>

        <ChipGroup
          legend="Box type"
          name="boxType"
          value={form.boxType}
          onChange={(v) => onChange('boxType', v)}
          options={PLANS.map((p) => ({ id: p.id, label: `${p.name} · ${inr(p.price)}` }))}
        />

        <ChipGroup
          legend="Delivery frequency"
          hint="you can change this later"
          name="frequency"
          value={form.frequency}
          onChange={(v) => onChange('frequency', v)}
          options={FREQUENCIES.map((f) => ({ id: f.id, label: f.label }))}
        />

        <ChipGroup
          legend="Snack preference"
          name="preference"
          value={form.preference}
          onChange={(v) => onChange('preference', v)}
          options={PREFERENCES}
        />

        <div className="fieldrow">
          <Select
            label="Quantity"
            name="quantity"
            value={String(form.quantity)}
            onChange={(e) => onChange('quantity', Number(e.target.value))}
            options={[1, 2, 3, 4, 5].map((n) => ({
              value: String(n),
              label: `${n} box${n > 1 ? 'es' : ''}`,
            }))}
          />
          <Input
            label="Referral code"
            name="referral"
            hint="optional"
            value={form.referral}
            onChange={set('referral')}
            placeholder="e.g. DESI20"
          />
        </div>

        <TextArea
          label="Anything we should know?"
          name="note"
          hint="optional"
          value={form.note}
          onChange={set('note')}
          placeholder="Allergies, delivery timing, gate instructions…"
        />
      </div>

      <div style={{ marginTop: '1.4rem' }}>
        <Button
          type="submit"
          size="lg"
          block
          icon={submitting ? Loader2 : Sparkles}
          disabled={submitting}
        >
          {submitting ? 'Placing your order…' : 'Place my mystery order'}
        </Button>
        <p className="fine" style={{ marginTop: '0.7rem' }}>
          Prototype checkout. No payment is taken and your details stay in this browser.
        </p>
      </div>
    </form>
  );
}
