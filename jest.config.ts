import type { Config } from 'jest';
import path from 'path';

const stripesConfig = require('@folio/jest-config-stripes');
const acqConfig = require('@folio/stripes-acq-components/jest.config');

const config: Config = {
  ...stripesConfig,
  collectCoverageFrom: [
    ...stripesConfig.collectCoverageFrom,
    ...acqConfig.collectCoverageFrom,
    '**/(lib|src)/**/*.{ts,tsx}',
  ],
  testMatch: [
    ...stripesConfig.testMatch,
    ...acqConfig.testMatch,
    '**/(lib|src)/**/?(*.)test.{ts,tsx}',
  ],
  setupFiles: [
    ...stripesConfig.setupFiles,
    ...acqConfig.setupFiles,
    path.join(__dirname, './test/jest/setupFiles.ts'),
  ],
};

export default config;
