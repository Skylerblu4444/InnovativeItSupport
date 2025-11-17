import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: { headless: true, baseURL: process.env.BASE_URL || 'http://localhost:3000' },
  testDir: './tests'
};

export default config;
