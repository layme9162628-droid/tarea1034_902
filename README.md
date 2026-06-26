# Portfolio Astro

Un sitio de portafolio moderno, minimalista y responsivo construido con **Astro**, **Tailwind CSS** y **ViewTransitions** para transiciones fluidas entre páginas.

## 📋 Características

- ✨ **Astro + Tailwind CSS** — Rendimiento óptimo y estilos escalables
- 🌙 **Modo oscuro/claro persistente** — Sin parpadeo blanco, usa `localStorage`
- 🎬 **ViewTransitions** — Transiciones fluidas entre secciones
- 📱 **Completamente responsivo** — Mobile-first design
- 🔗 **URLs configurables** — Base dinámica para GitHub Pages o despliegue en subruta
- ⚡ **Optimizado para rendimiento** — Imágenes lazy-load y CSS minificado

## 🚀 Instalación

### Requisitos previos

- **Node.js** (v16 o superior) — [Descargar](https://nodejs.org/)
- **bun** (v1.0 o superior) — [Descargar](https://bun.sh/) (recomendado, más rápido que npm)

### Pasos

1. **Clonar o descargar el repositorio**
   ```bash
   cd mi-portfolio-astro
   ```

2. **Instalar dependencias**
   ```bash
   bun install
   ```

3. **Ejecutar en desarrollo**
   ```bash
   bun run dev
   ```
   El proyecto se abrirá en `http://localhost:3000`

## 🛠 Comandos disponibles

```bash
# Desarrollo (hot-reload en localhost:3000)
bun run dev

# Build para producción (genera carpeta dist/)
bun run build

# Vista previa del build
bun run preview

# Formatear código (Prettier)
bun run format
```

### Alternativa con npm

Si prefieres usar `npm` en lugar de `bun`:

```bash
npm install
npm run dev
npm run build
npm run preview
npm run format
```

> **Nota:** `bun` es más rápido (~3-5x) y completamente compatible. Se recomienda usar `bun` para mejor rendimiento.

## 📝 Configuración de Variables de Entorno

### Archivos `.env`

El proyecto incluye dos archivos de entorno:

#### `.env.development`
```env
PUBLIC_SITE_URL=http://localhost:3000
PUBLIC_BASE=/
```
**Uso:** Local, con rutas raíz.

#### `.env.production`
```env
PUBLIC_SITE_URL=https://tu-usuario.github.io/tu-repo
PUBLIC_BASE=/tu-repo/
```
**Uso:** Despliegue en GitHub Pages con subruta.

### Cómo configurar según tu caso

#### **Opción 1: Dominio raíz (ejemplo.com)**
```env
PUBLIC_SITE_URL=https://ejemplo.com
PUBLIC_BASE=/
```

#### **Opción 2: GitHub Pages (usuario.github.io/repo)**
```env
PUBLIC_SITE_URL=https://usuario.github.io/tu-repo-name
PUBLIC_BASE=/tu-repo-name/
```

#### **Opción 3: Subruta personalizada (ejemplo.com/mi-portfolio)**
```env
PUBLIC_SITE_URL=https://ejemplo.com/mi-portfolio
PUBLIC_BASE=/mi-portfolio/
```

### Uso en componentes y páginas

Los enlaces se construyen automáticamente con la `base` configurada:

```astro
---
const basePath = import.meta.env.PUBLIC_BASE || '/';
---

<a href={`${basePath}projects/proyecto-1`}>Ver Proyecto</a>
```

En componentes que usen redirecciones:

```html
<a href={`${siteBase}contacto`}>Contacto</a>
```

## 📂 Estructura del proyecto

```
mi-portfolio-astro/
├── src/
│   ├── components/
│   │   ├── DarkToggle.astro        # Botón oscuro/claro
│   │   └── ProjectCard.astro       # Tarjeta de proyecto
│   ├── layouts/
│   │   └── BaseLayout.astro        # Layout principal con ViewTransitions
│   ├── pages/
│   │   └── index.astro             # Página principal
│   ├── styles/
│   │   └── global.css              # Estilos globales
├── public/
│   └── images/
│       └── projects/               # Imágenes de los 8 proyectos
├── astro.config.mjs                # Configuración de Astro
├── tailwind.config.cjs             # Configuración de Tailwind
├── .env.development                # Variables de entorno (desarrollo)
├── .env.production                 # Variables de entorno (producción)
├── package.json
└── tsconfig.json
```

## 🖼 Añadir imágenes de proyectos

1. **Guardar imágenes** en la carpeta `public/images/projects/`
   ```
   public/images/projects/
   ├── proyecto-1.jpg
   ├── proyecto-2.jpg
   ├── ... hasta proyecto-8.jpg
   ```

2. **Actualizar rutas** en `src/pages/index.astro`:
   ```astro
   const projects = [
     {
       title: 'Proyecto 1',
       description: 'Descripción...',
       img: '/images/projects/proyecto-1.jpg',
       tags: ['HTML', 'CSS', 'JS'],
       href: 'https://tu-proyecto-1.com'
     },
     // ... más proyectos
   ];
   ```

## 🌓 Modo oscuro/claro

**Cómo funciona:**
- El script en el `<head>` de `BaseLayout.astro` evita el parpadeo blanco
- El botón `DarkToggle.astro` alterna entre modo claro/oscuro
- La preferencia se guarda en `localStorage` con clave `theme`

**Para personalizar colores oscuros:**
Edita `tailwind.config.cjs`:
```javascript
theme: {
  extend: {
    colors: {
      dark: {
        bg: '#0f1724',
        text: '#f5f2ed',
        accent: '#c8a96e'
      }
    }
  }
}
```

Y aplica en el CSS:
```css
html.dark {
  @apply bg-dark-bg text-dark-text;
}
```

## 🚀 Despliegue

### GitHub Pages

1. **Actualizar `.env.production`:**
   ```env
   PUBLIC_SITE_URL=https://tu-usuario.github.io/tu-repo-name
   PUBLIC_BASE=/tu-repo-name/
   ```

2. **Build y desplegar:**
   ```bash
   bun run build
   ```

3. **Subir carpeta `dist/` a GitHub Pages** o usar una GitHub Action (véase más abajo).

### GitHub Actions (Automático con Bun)

Crea un archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - run: bun install
      - run: bun run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Luego, en **GitHub** → **Settings** → **Pages**, selecciona rama `gh-pages` como fuente.

### Vercel / Netlify

Ambas plataformas detectan automáticamente proyectos Astro:

1. Conecta tu repositorio
2. Vercel/Netlify detectará `astro.config.mjs`
3. Define variables de entorno en el panel:
   ```
   PUBLIC_SITE_URL=https://tu-dominio.vercel.app
   PUBLIC_BASE=/
   ```
4. Deploy automático

## 📧 Contacto y formulario

El formulario en la sección de contacto es un template HTML. Para que funcione:

- **Opción 1:** Conectar con un servicio como **Formspree**, **Netlify Forms** o **EmailJS**
- **Opción 2:** Usar un backend propio

Ejemplo con **Formspree**:
```html
<form action="https://formspree.io/f/tu_id" method="POST">
  <input type="email" name="email" required />
  <textarea name="message" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

## 🎨 Personalizacion

### Cambiar tipografía
En `tailwind.config.cjs`:
```javascript
fontFamily: {
  sans: ['Inter', 'Geist', 'system-ui', 'sans-serif']
}
```

### Cambiar colores de marca
```javascript
colors: {
  accent: '#tu-color-aqui'
}
```

### Modificar contenido
- Edita `src/pages/index.astro` para cambiar textos, secciones, etc.
- Los componentes reutilizables están en `src/components/`

## 🐛 Troubleshooting

| Problema | Solución |
|----------|----------|
| Los enlaces se rompen en producción | Verifica que `PUBLIC_BASE` coincida con tu ruta de despliegue |
| El modo oscuro no persiste | Asegúrate de que `localStorage` esté habilitado |
| Imágenes no cargan | Verifica las rutas en `public/images/` sean correctas |
| Build falla | Ejecuta `bun install` nuevamente y limpia la cache: `rm -rf .astro node_modules` |

## 📚 Recursos útiles

- [Documentación oficial de Astro](https://docs.astro.build/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)

---

**Hecho con ❤️ usando Astro + Tailwind CSS**
