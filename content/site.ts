export const site = {
  name: 'The Creative Film',
  short: 'TCF',
  tagline: 'We make stories worth feeling.',
  url: 'https://thecreativefilm.com',
  email: 'hello@thecreativefilm.com',
  // TODO(client): real WhatsApp number in international format, digits only
  whatsappNumber: '919999999999',
  whatsappMessage:
    "Hi TCF — I run a place in North Bengal and I'd like to talk about a film.",
  // TODO(client): confirm handles
  instagram: 'thecreativefilm',
  youtube: '@thecreativefilm',
  location: {
    town: 'Balurghat',
    region: 'North Bengal',
    state: 'West Bengal',
  },
  towns: [
    'Balurghat',
    'Gangarampur',
    'Raiganj',
    'Malda',
    'Siliguri',
    'Jalpaiguri',
    'Cooch Behar',
    'Darjeeling',
  ],
  replyWithin: '24 hours',
  founder: {
    // TODO(client): founder name and role
    name: 'Arghya Jana',
    role: 'Director & cinematographer',
  },
} as const;

export const whatsappHref = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const instagramHref = `https://instagram.com/${site.instagram}`;
export const youtubeHref = `https://youtube.com/${site.youtube}`;
export const mailHref = `mailto:${site.email}`;
