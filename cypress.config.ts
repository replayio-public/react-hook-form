import { defineConfig } from 'cypress';
const cypressReplay = require('@replayio/cypress');
const fs = require('fs');

export default defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on = cypressReplay.wrapOn(on);
      cypressReplay.default(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      on('after:run', (afterRun: any) => {
        const data = JSON.stringify(afterRun.totalDuration);
        const filename = 'duration.json';
        fs.writeFileSync(filename, data);
        console.log('cypress-json-results: wrote results to %s', filename);
      });
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return config;
    },
    baseUrl: 'http://localhost:3000/',
  },
});
