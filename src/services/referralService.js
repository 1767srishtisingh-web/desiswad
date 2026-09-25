/**
 * Referral service — one code per browser for the demo.
 */
import { readJSON, writeJSON, STORAGE_KEYS } from '../utils/storage.js';
import { DEFAULT_REFERRAL_CODE } from '../data/rewards.js';

export function getReferral() {
  const data = readJSON(STORAGE_KEYS.referral, null);
  if (data?.code) return data;
  const created = { code: DEFAULT_REFERRAL_CODE, shares: 0 };
  writeJSON(STORAGE_KEYS.referral, created);
  return created;
}

export function countShare() {
  const data = getReferral();
  const next = { ...data, shares: (data.shares || 0) + 1 };
  writeJSON(STORAGE_KEYS.referral, next);
  return next;
}

export function referralLink(code) {
  if (typeof window === 'undefined') return `https://desiswad.example/?ref=${code}`;
  return `${window.location.origin}/?ref=${code}`;
}
