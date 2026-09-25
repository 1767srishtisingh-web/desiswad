// Small, dependency-free validators. Each returns an error string or ''.

export function required(value, label = 'This field') {
  return String(value ?? '').trim() ? '' : `${label} is required.`;
}

export function minLength(value, n, label = 'This field') {
  return String(value ?? '').trim().length >= n ? '' : `${label} needs at least ${n} characters.`;
}

export function indianPhone(value) {
  const digits = String(value ?? '').replace(/\D/g, '');
  if (!digits) return 'Phone number is required.';
  const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
  if (local.length !== 10) return 'Enter a 10-digit mobile number.';
  if (!/^[6-9]/.test(local)) return 'Indian mobile numbers start with 6, 7, 8 or 9.';
  return '';
}

export function address(value) {
  const v = String(value ?? '').trim();
  if (!v) return 'Delivery address is required.';
  if (v.length < 12) return 'Add a little more detail so we can find you.';
  return '';
}

export function positiveNumber(value, label = 'Value') {
  const n = Number(value);
  if (!String(value ?? '').trim()) return `${label} is required.`;
  if (Number.isNaN(n) || n <= 0) return `${label} must be a number above 0.`;
  return '';
}

export function firstError(errors) {
  return Object.keys(errors).find((k) => errors[k]);
}
