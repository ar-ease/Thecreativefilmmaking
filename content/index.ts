import type {
  Capability,
  CraftBlock,
  FaqItem,
  Hero,
  KitGroup,
  Package,
  Project,
  Service,
  Step,
} from './types';
import projectsJson from './projects.json';
import servicesJson from './services.json';
import packagesJson from './packages.json';
import processJson from './process.json';
import faqJson from './faq.json';
import addonsJson from './addons.json';
import kitJson from './kit.json';
import capabilitiesJson from './capabilities.json';
import craftJson from './craft.json';
import heroJson from './hero.json';

export const hero: Hero = heroJson as Hero;
export const projects: Project[] = projectsJson;
export const services: Service[] = servicesJson;
export const packages: Package[] = packagesJson;
export const process: Step[] = processJson;
export const faq: FaqItem[] = faqJson;
export const addons: Capability[] = addonsJson;
export const kit: KitGroup[] = kitJson;
export const capabilities: Capability[] = capabilitiesJson;
export const craft: CraftBlock[] = craftJson;

export const featuredProject = projects.find((p) => p.featured) ?? projects[0];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string) {
  if (projects.length < 2) return undefined;
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export * from './site';
export * from './types';
