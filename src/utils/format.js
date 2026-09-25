import { SITE } from '../data/site.js';

export function inr(amount) {
  const n = Number(amount) || 0;
  return `${SITE.currency}${n.toLocaleString('en-IN')}`;
}

export function orderId(index) {
  return `DS-${String(index).padStart(3, '0')}`;
}

export function shortDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
