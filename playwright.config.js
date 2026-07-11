const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://reqres.in/api/',
    extraHTTPHeaders: {
      'x-api-key': 'pro_241e97451cdfc83099bdef91576dcc7036bfbdd532567e6c5d8539d6393a2561',
      'X-Reqres-Env':'prod'
    },
  },
});
