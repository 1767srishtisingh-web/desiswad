export const PLANS = [
  {
    id: 'mini',
    name: 'Mini Mystery',
    price: 149,
    tagline: 'Best way to try DesiSwad once.',
    featured: false,
    features: ['4–5 curated snacks', 'Compact box', 'One weekly surprise', 'Good for a single person'],
    cta: 'Choose Mini',
  },
  {
    id: 'stash',
    name: 'DesiSwad Stash',
    price: 199,
    tagline: 'More items, more variety, easier to share.',
    featured: true,
    features: ['6–8 curated snacks', 'Wider spread of categories', 'More wild cards', 'Better for sharing in a room'],
    cta: 'Choose Stash',
  },
];

export const FREQUENCIES = [
  { id: 'once', label: 'Just once', note: 'One box, no repeat.' },
  { id: 'weekly', label: 'Every week', note: 'A new drop each week.' },
  { id: 'biweekly', label: 'Every 2 weeks', note: 'A slower rhythm.' },
];

export const PREFERENCES = [
  { id: 'spicy', label: 'Spicy' },
  { id: 'sweet', label: 'Sweet' },
  { id: 'savoury', label: 'Savoury' },
  { id: 'mixed', label: 'Mixed' },
  { id: 'surprise', label: 'Surprise me' },
];

export function getPlan(id) {
  return PLANS.find((p) => p.id === id) || PLANS[0];
}
