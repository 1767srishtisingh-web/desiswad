/**
 * Feedback service — post-delivery feedback kept in localStorage.
 */
import { readJSON, writeJSON, STORAGE_KEYS } from '../utils/storage.js';
import { delay } from '../utils/format.js';

function all() {
  const list = readJSON(STORAGE_KEYS.feedback, []);
  return Array.isArray(list) ? list : [];
}

export async function listFeedback() {
  await delay(180);
  return all();
}

export async function createFeedback(payload) {
  await delay(550);
  const items = all();
  const record = {
    ...payload,
    id: `FB-${String(items.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  items.push(record);
  writeJSON(STORAGE_KEYS.feedback, items);
  return record;
}
