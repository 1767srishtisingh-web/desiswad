// Safe localStorage wrapper. Never throws — private mode, full quota and
// disabled storage all fall back to an in-memory map for the session.

const memory = new Map();

function available() {
  try {
    const k = '__desiswad_test__';
    window.localStorage.setItem(k, '1');
    window.localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

const canUse = typeof window !== 'undefined' && available();

export function readJSON(key, fallback) {
  try {
    const raw = canUse ? window.localStorage.getItem(key) : memory.get(key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    const raw = JSON.stringify(value);
    if (canUse) window.localStorage.setItem(key, raw);
    else memory.set(key, raw);
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key) {
  try {
    if (canUse) window.localStorage.removeItem(key);
    else memory.delete(key);
  } catch {
    /* ignore */
  }
}

export const STORAGE_KEYS = {
  orders: 'desiswad_orders',
  rewards: 'desiswad_rewards',
  supplierLeads: 'desiswad_supplier_leads',
  feedback: 'desiswad_feedback',
  referral: 'desiswad_referral',
};
