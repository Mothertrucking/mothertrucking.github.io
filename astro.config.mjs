import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mothertrucking.co.nz',
  output: 'static',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-import variables into every component <style lang="scss"> block
          additionalData: `@use "/src/styles/variables" as *;`,
        },
      },
    },
  },
});
