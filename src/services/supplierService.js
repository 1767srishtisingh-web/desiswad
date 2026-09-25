/**
 * Supplier lead service — demo submissions stored in localStorage.
 */
import { readJSON, writeJSON, STORAGE_KEYS } from '../utils/storage.js';
import { delay } from '../utils/format.js';

function all() {
  const list = readJSON(STORAGE_KEYS.supplierLeads, []);
  return Array.isArray(list) ? list : [];
}

export async function listLeads() {
  await delay(180);
  return all();
}

export async function createLead(payload) {
  await delay(600);
  const leads = all();
  const record = {
    ...payload,
    id: `SP-${String(leads.length + 1).padStart(3, '0')}`,
    createdAt: new Date().toISOString(),
  };
  leads.push(record);
  writeJSON(STORAGE_KEYS.supplierLeads, leads);
  return record;
}
