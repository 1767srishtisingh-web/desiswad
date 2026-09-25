import { useState } from 'react';
import { Loader2, Send, Star } from 'lucide-react';
import { createFeedback } from '../services/feedbackService.js';
import { addPoints } from '../services/rewardService.js';
import { useToast } from '../hooks/useToast.js';
import { required } from '../utils/validators.js';
import Button from './ui/Button.jsx';
import { ChipGroup, Input, TextArea } from './ui/Field.jsx';

const YES_NO = [
  { id: 'yes', label: 'Yes' },
  { id: 'maybe', label: 'Maybe' },
  { id: 'no', label: 'No' },
];

const EMPTY = {
  rating: 0,
  favourite: '',
  leastFavourite: '',
  orderAgain: 'yes',
  recommend: 'yes',
  suggestions: '',
};

export default function FeedbackForm({ onDone }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const set = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = {
      rating: form.rating ? '' : 'Pick a rating from 1 to 5.',
      favourite: required(form.favourite, 'Favourite snack'),
    };
    if (found.rating || found.favourite) {
      setErrors(found);
      toast.error('Add a rating and your favourite snack.');
      return;
    }
    setSubmitting(true);
    try {
      const record = await createFeedback(form);
      await addPoints(10, 'Feedback on a drop');
      setForm(EMPTY);
      setErrors({});
      toast.success('Feedback saved. 10 Swad Points added.');
      onDone?.(record);
    } catch {
      toast.error('Could not save your feedback in this browser. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="formcard">
      <h2>Tell us what you think.</h2>
      <p>Feedback decides what gets repeated, dropped or hunted down next week.</p>

      <fieldset className="field" style={{ border: 0, padding: 0, margin: '0 0 1rem' }}>
        <legend className="field__label" style={{ padding: 0 }}>
          Rating for this drop
        </legend>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={form.rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onClick={() => set('rating', n)}
            >
              <Star size={18} aria-hidden="true" fill={form.rating >= n ? 'currentColor' : 'none'} />
            </button>
          ))}
        </div>
        {errors.rating ? (
          <p className="field__error" style={{ marginTop: '0.4rem' }}>
            {errors.rating}
          </p>
        ) : null}
      </fieldset>

      <div className="fieldrow">
        <Input
          label="Favourite snack in the box"
          name="favourite"
          value={form.favourite}
          onChange={(e) => set('favourite', e.target.value)}
          error={errors.favourite}
          required
        />
        <Input
          label="Least favourite"
          name="leastFavourite"
          hint="optional"
          value={form.leastFavourite}
          onChange={(e) => set('leastFavourite', e.target.value)}
        />
      </div>

      <ChipGroup
        legend="Would you order again?"
        name="orderAgain"
        value={form.orderAgain}
        onChange={(v) => set('orderAgain', v)}
        options={YES_NO}
      />

      <ChipGroup
        legend="Would you recommend DesiSwad?"
        name="recommend"
        value={form.recommend}
        onChange={(v) => set('recommend', v)}
        options={YES_NO}
      />

      <TextArea
        label="Suggestions"
        name="suggestions"
        hint="optional"
        value={form.suggestions}
        onChange={(e) => set('suggestions', e.target.value)}
        placeholder="Snacks you want us to hunt for, packaging notes, delivery timing…"
      />

      <Button type="submit" icon={submitting ? Loader2 : Send} disabled={submitting} block size="lg">
        {submitting ? 'Sending…' : 'Send feedback'}
      </Button>
      <p className="fine" style={{ marginTop: '0.7rem', marginBottom: 0 }}>
        Stored in this browser for the prototype.
      </p>
    </form>
  );
}
