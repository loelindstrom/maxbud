import { defineConfig } from 'vite'
import baseConfig from './vite.config.mjs' // Import the default config

export default defineConfig({
  ...baseConfig,  // Merge in the base configuration
  base: '/maxbud/',  // Set base path to match github repo name
  build: {
    outDir: 'dist-ghpages',  // Specify your output directory here
  },
})
