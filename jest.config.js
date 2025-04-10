const path = require('path');
const stripesConfig = require('@folio/jest-config-stripes');
const acqConfig = require('@folio/stripes-acq-components/jest.config');

const config = {
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

module.exports = config;
