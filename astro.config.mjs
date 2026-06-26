import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://layme9162628-droid.github.io/tarea1034_902',
  base: '/tarea1034_902',
  build: {
    assetsPrefix: '/tarea1034_902'
  },
  vite: {
    base: '/tarea1034_902/',
    ssr: {
      external: ['svgo']
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  integrations: []
});
