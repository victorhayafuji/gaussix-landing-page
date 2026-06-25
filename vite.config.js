import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

const entry = (path) => fileURLToPath(new URL(path, import.meta.url));

// Paridade local com o Netlify: serve /privacidade e /termos (sem barra final)
// a partir do index.html da pasta, tanto no dev quanto no preview. Em produção
// quem faz isso é o public/_redirects.
const LEGAL_CLEAN_URLS = {
  '/privacidade': '/privacidade/index.html',
  '/termos': '/termos/index.html',
};
function legalCleanUrls() {
  const middleware = (req, _res, next) => {
    const path = (req.url || '').split('?')[0];
    if (LEGAL_CLEAN_URLS[path]) req.url = LEGAL_CLEAN_URLS[path];
    next();
  };
  return {
    name: 'legal-clean-urls',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    legalCleanUrls(),
  ],
  // Multi-page (home + páginas legais), sem roteamento client-side → sem SPA fallback.
  appType: 'mpa',
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        // Home (SPA com navegação por âncora)
        main: entry('./index.html'),
        // Páginas legais (multi-page → URLs reais /privacidade e /termos no Netlify)
        privacidade: entry('./privacidade/index.html'),
        termos: entry('./termos/index.html'),
      },
    },
  },
});
