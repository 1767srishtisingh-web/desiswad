// Mock rewards system — points live in localStorage until a backend exists.

export const POINTS_NAME = 'Swad Points';

export const EARN_RULES = [
  { id: 'order', label: 'Order a box', points: 10, note: 'Added when an order is placed.' },
  { id: 'referral', label: 'Refer a friend who orders', points: 20, note: 'Added once their first box ships.' },
  { id: 'review', label: 'Leave feedback on a drop', points: 10, note: 'One per drop.' },
  { id: 'streak', label: 'Order 3 boxes', points: 25, note: 'Bonus, added on the third box.' },
];

export const REWARD_TIERS = [
  { id: 'r30', cost: 30, title: '₹20 off', desc: 'Applied to your next mystery box.' },
  { id: 'r50', cost: 50, title: '₹40 off', desc: 'Applied to your next mystery box.' },
  { id: 'r100', cost: 100, title: 'Free Mini Mystery', desc: 'One Mini box on us, delivery excluded.' },
];

export const DEFAULT_REFERRAL_CODE = 'DESI20';
