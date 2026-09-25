// Central brand + config values. Change here, changes everywhere.

export const SITE = {
  name: 'DesiSwad',
  // TEMPORARY placeholder — do not replace until the real tagline is finalised.
  tagline: 'xxxxxxx',
  logo: '/logo.svg',
  // Placeholder handle until the real one is confirmed.
  instagram: '@desiswad',
  instagramUrl: 'https://instagram.com/desiswad',
  whatsapp: 'https://wa.me/910000000000',
  whatsappLabel: '+91 00000 00000',
  email: 'hello@desiswad.example',
  city: 'Currently delivering in select college and PG clusters',
  deliveryFee: 29,
  freeDeliveryAbove: 399,
  currency: '₹',
};

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Mystery Box', to: '/mystery-box' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Rewards', to: '/rewards' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: 'Contact', to: '/partner' },
];
