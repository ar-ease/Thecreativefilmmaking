export type Media = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Clip = {
  src: string;
  poster: string;
  alt: string;
};

export type Project = {
  slug: string;
  client: string;
  title: string;
  tag: string;
  city: string;
  year: number;
  role: string;
  runtime: string;
  featured: boolean;
  film: Clip;
  stills: Media[];
  brief: string;
  approach: string[];
  result: string;
  seoDescription: string;
};

export type Service = {
  number: string;
  slug: string;
  title: string;
  body: string;
  inclusions: string[];
  clip: Clip;
};

export type Package = {
  slug: string;
  name: string;
  strap: string;
  price: string;
  includes: string[];
  mostBooked: boolean;
};

export type Step = {
  number: string;
  title: string;
  copy: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type KitGroup = {
  category: string;
  items: string[];
};

export type Capability = {
  label: string;
  value: string;
};

export type HeroTile = Clip & {
  slot: 'top' | 'left' | 'bottom-left' | 'right';
};

export type Hero = {
  eyebrow: string;
  lines: string[];
  intro: string;
  loaderLabel: string;
  tiles: HeroTile[];
};

export type CraftBlock = {
  title: string;
  body: string;
};
