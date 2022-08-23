import { defineConfig } from 'cypress';
const cypressReplay = require('@replayio/cypress');

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressReplay.default(on, config);
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return config;
    },
    baseUrl: 'http://localhost:3000/',
  },
});
