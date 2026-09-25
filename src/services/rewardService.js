/**
 * Rewards service — mock points ledger in localStorage.
 */
import { readJSON, writeJSON, STORAGE_KEYS } from '../utils/storage.js';
import { delay } from '../utils/format.js';
import { REWARD_TIERS } from '../data/rewards.js';

const SEED = { points: 0, history: [] };

function read() {
  const data = readJSON(STORAGE_KEYS.rewards, SEED);
  return {
    points: Number(data?.points) || 0,
    history: Array.isArray(data?.history) ? data.history : [],
  };
}

export async function getRewards() {
  await delay(200);
  return read();
}

export async function addPoints(points, reason) {
  const current = read();
  const next = {
    points: Math.max(0, current.points + Number(points || 0)),
    history: [
      { points: Number(points || 0), reason, at: new Date().toISOString() },
      ...current.history,
    ].slice(0, 40),
  };
  writeJSON(STORAGE_KEYS.rewards, next);
  return next;
}

export async function resetRewards() {
  writeJSON(STORAGE_KEYS.rewards, SEED);
  return SEED;
}

/** Next locked tier, or null when everything is unlocked. */
export function nextTier(points) {
  return REWARD_TIERS.find((tier) => tier.cost > points) || null;
}

/** Progress (0–100) towards the next tier, or the top tier when all unlocked. */
export function progressTo(points, tier) {
  const target = tier ? tier.cost : REWARD_TIERS[REWARD_TIERS.length - 1].cost;
  if (!target) return 0;
  return Math.min(100, Math.round((points / target) * 100));
}
