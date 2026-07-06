const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://reqres.in/api/',
    extraHTTPHeaders: {
      'x-api-key': 'free_user_3G7XKENJNoJ9DqhHP1y5LUnk502',
      'X-Reqres-Env':'prod'
    },
  },
});
