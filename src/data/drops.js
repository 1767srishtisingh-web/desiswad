// Weekly drops. Themes and contents change every week — nothing here is fixed.

export const CURRENT_DROP = {
  id: 'DS-DROP-001',
  number: '001',
  title: 'DesiSwad Mystery Drop #001',
  theme: 'Regional Snack Hunt',
  price: 149,
  itemCount: '5+',
  boxesTotal: 120,
  boxesLeft: 38,
  closesOn: 'Sunday, 11:59 PM',
  shipsOn: 'Monday',
  teaser:
    'Five-plus snacks picked from different shops this week. Categories are listed. Brands are not.',
};

// Categories shown instead of products — contents stay hidden on purpose.
export const DROP_CATEGORIES = [
  { id: 'spicy', emoji: '🌶️', label: 'Something spicy', hint: 'Heat that earns its place', tint: '#FBD9CB' },
  { id: 'sweet', emoji: '🍬', label: 'Something sweet', hint: 'The after-dinner kind', tint: '#FFE9BE' },
  { id: 'crunchy', emoji: '🥨', label: 'Something crunchy', hint: 'For the 11 PM shift', tint: '#E8E2C8' },
  { id: 'regional', emoji: '🌾', label: 'Something regional', hint: 'Rarely on hostel shelves', tint: '#DCEFE7' },
  { id: 'wild', emoji: '❓', label: 'One wild card', hint: 'Could be anything', tint: '#EFD9E4' },
];

// Used by the "Reveal a sample" demo only. Clearly labelled as a sample.
export const SAMPLE_REVEAL = [
  { id: 'spicy', emoji: '🌶️', label: 'Spicy mixture', hint: 'Sample item' },
  { id: 'sweet', emoji: '🍬', label: 'Regional sweet', hint: 'Sample item' },
  { id: 'crunchy', emoji: '🥨', label: 'Rusk', hint: 'Sample item' },
  { id: 'regional', emoji: '🌾', label: 'Regional namkeen', hint: 'Sample item' },
  { id: 'wild', emoji: '🎁', label: 'Surprise snack', hint: 'Sample item' },
];

export const WEEKLY_DROPS = [
  {
    no: 'Drop 01',
    theme: 'Regional Crunch',
    note: 'Built around namkeen and mixtures from three different sellers.',
    tags: ['Namkeen', 'Crunchy', 'Regional'],
    bar: '#E85D1F',
  },
  {
    no: 'Drop 02',
    theme: 'Desi Spice',
    note: 'A heat-forward set for people who reach for the masala first.',
    tags: ['Spicy', 'Masala', 'Chatpata'],
    bar: '#96162E',
  },
  {
    no: 'Drop 03',
    theme: 'Sweet & Savoury',
    note: 'Half the box sweet, half savoury, balanced on purpose.',
    tags: ['Mithai', 'Bakery', 'Mixed'],
    bar: '#F5B301',
  },
  {
    no: 'Drop 04',
    theme: 'Surprise India',
    note: 'Sourced from whichever region gave us the best finds that week.',
    tags: ['Wild card', 'Unknown', 'New'],
    bar: '#17614C',
  },
];

export const PAST_DROPS = [
  {
    id: 'drop-001',
    no: 'Drop #001',
    theme: 'Regional Snack Hunt',
    items: '5 items',
    shops: '4 shops',
    note: 'Two snacks in this box were from sellers with no online presence at all.',
    tint: '#FBD9CB',
    revealed: ['Regional namkeen', 'Spicy mixture', '3 items still unlisted'],
  },
  {
    id: 'drop-002',
    no: 'Drop #002',
    theme: 'Desi Crunch',
    items: '5 items',
    shops: '3 shops',
    note: 'The crunchiest box we have packed so far, by a clear margin.',
    tint: '#FFE9BE',
    revealed: ['Bakery rusk', 'Roasted chana mix', '3 items still unlisted'],
  },
  {
    id: 'drop-003',
    no: 'Drop #003',
    theme: 'Sweet & Spicy',
    items: '6 items',
    shops: '5 shops',
    note: 'Sweet and spicy paired deliberately, not thrown in together.',
    tint: '#DCEFE7',
    revealed: ['Regional sweet', 'Chatpata mixture', '4 items still unlisted'],
  },
  {
    id: 'drop-004',
    no: 'Drop #004',
    theme: 'Unknown India',
    items: '6 items',
    shops: '5 shops',
    note: 'Everything in this box came from outside the usual supermarket aisle.',
    tint: '#EFD9E4',
    revealed: ['Wild card snack', 'Local speciality', '4 items still unlisted'],
  },
];
