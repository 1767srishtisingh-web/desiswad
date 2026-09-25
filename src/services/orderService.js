/**
 * Order service — localStorage only.
 * Swap the bodies for fetch() calls when a backend exists; signatures stay.
 */
import { readJSON, writeJSON, STORAGE_KEYS } from '../utils/storage.js';
import { delay, orderId } from '../utils/format.js';
import { CURRENT_DROP } from '../data/drops.js';

function all() {
  const list = readJSON(STORAGE_KEYS.orders, []);
  return Array.isArray(list) ? list : [];
}

export async function listOrders() {
  await delay(220);
  return all().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export async function createOrder(payload) {
  await delay(650);
  const orders = all();
  const record = {
    ...payload,
    id: orderId(orders.length + 1),
    drop: CURRENT_DROP.number,
    dropTheme: CURRENT_DROP.theme,
    status: 'Order received',
    createdAt: new Date().toISOString(),
  };
  orders.push(record);
  writeJSON(STORAGE_KEYS.orders, orders);
  return record;
}

export async function countOrders() {
  return all().length;
}
