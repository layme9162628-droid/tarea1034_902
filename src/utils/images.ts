import type { ImageMetadata } from 'astro';

const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/*',
  { eager: true }
);

export function getImage(name: string): ImageMetadata {
  const module = imageModules[`../assets/images/${name}`];

  if (!module) {
    throw new Error(`Image not found: ${name}`);
  }

  return module.default;
}
