import { useState } from 'react';
import { Loader2, Store } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/partners.js';
import { createLead } from '../services/supplierService.js';
import { useToast } from '../hooks/useToast.js';
import { indianPhone, positiveNumber, required } from '../utils/validators.js';
import Button from './ui/Button.jsx';
import { Input, Select, TextArea } from './ui/Field.jsx';

const EMPTY = {
  business: '',
  owner: '',
  phone: '',
  location: '',
  product: '',
  category: PRODUCT_CATEGORIES[0],
  price: '',
  moq: '',
  shelfLife: '',
  packaging: '',
  message: '',
};

function validate(form) {
  return {
    business: required(form.business, 'Business name'),
    owner: required(form.owner, 'Owner name'),
    phone: indianPhone(form.phone),
    location: required(form.location, 'Location'),
    product: required(form.product, 'Product name'),
    price: positiveNumber(form.price, 'Wholesale price'),
    moq: positiveNumber(form.moq, 'Minimum order quantity'),
    shelfLife: required(form.shelfLife, 'Shelf life'),
    packaging: required(form.packaging, 'Packaging details'),
  };
}

export default function SupplierForm({ onDone }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const set = (key) => (e) => {
    const { value } = e.target;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    const firstBad = Object.keys(found).find((k) => found[k]);
    if (firstBad) {
      setErrors(found);
      toast.error('Check the highlighted fields and try again.');
      document.getElementsByName(firstBad)[0]?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const lead = await createLead(form);
      setForm(EMPTY);
      setErrors({});
      onDone?.(lead);
    } catch {
      toast.error('Could not save your details in this browser. Try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="formcard">
      <h2>Have a snack worth discovering?</h2>
      <p>We&apos;re always looking for interesting regional and local snacks.</p>

      <div className="fieldrow">
        <Input label="Business name" name="business" value={form.business} onChange={set('business')} error={errors.business} required />
        <Input label="Owner name" name="owner" value={form.owner} onChange={set('owner')} error={errors.owner} required />
      </div>

      <div className="fieldrow">
        <Input label="Phone number" name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={set('phone')} error={errors.phone} required />
        <Input label="Location" name="location" hint="city or area" value={form.location} onChange={set('location')} error={errors.location} required />
      </div>

      <div className="fieldrow">
        <Input label="Product name" name="product" value={form.product} onChange={set('product')} error={errors.product} required />
        <Select label="Product category" name="category" value={form.category} onChange={set('category')} options={PRODUCT_CATEGORIES} />
      </div>

      <div className="fieldrow">
        <Input label="Wholesale price" name="price" inputMode="decimal" hint="₹ per unit" value={form.price} onChange={set('price')} error={errors.price} required />
        <Input label="Minimum order quantity" name="moq" inputMode="numeric" hint="units per order" value={form.moq} onChange={set('moq')} error={errors.moq} required />
      </div>

      <div className="fieldrow">
        <Input label="Shelf life" name="shelfLife" hint="e.g. 3 months" value={form.shelfLife} onChange={set('shelfLife')} error={errors.shelfLife} required />
        <Input label="Packaging" name="packaging" hint="pack size and material" value={form.packaging} onChange={set('packaging')} error={errors.packaging} required />
      </div>

      <TextArea label="Anything else" name="message" hint="optional" value={form.message} onChange={set('message')} placeholder="Where you sell today, production capacity, sample availability…" />

      <Button type="submit" icon={submitting ? Loader2 : Store} disabled={submitting} block size="lg">
        {submitting ? 'Sending…' : 'Become a snack partner'}
      </Button>
      <p className="fine" style={{ marginTop: '0.7rem', marginBottom: 0 }}>
        Demo submission — details are saved in this browser only, not sent anywhere.
      </p>
    </form>
  );
}
