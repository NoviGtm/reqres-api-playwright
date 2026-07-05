const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://reqres.in/api',
    extraHTTPHeaders: {
      'x-api-key': 'reqres-free-v1',
    },
  },
});
