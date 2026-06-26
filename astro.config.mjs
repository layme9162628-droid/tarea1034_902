import { defineConfig } from 'astro/config';

// Variables de entorno para configurar la `base` y `site`
const PUBLIC_BASE = import.meta.env.PUBLIC_BASE;
const PUBLIC_SITE_URL = import.meta.env.PUBLIC_SITE_URL;

const base = PUBLIC_BASE || (PUBLIC_SITE_URL ? new URL(PUBLIC_SITE_URL).pathname : '/');

export default defineConfig({
  base,
  site: PUBLIC_SITE_URL || undefined,
  // Habilitadas ViewTransitions por defecto en Astro 4.x
  vite: {
    ssr: {
      external: ['svgo']
    }
  },
  // Optimización de imágenes
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  // Integración de Tailwind CSS (automática si está instalado)
  integrations: []
});
