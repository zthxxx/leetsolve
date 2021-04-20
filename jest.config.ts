import type { Config } from '@jest/types'


/**
 * https://jestjs.io/docs/configuration
 */
const config: Config.InitialOptions = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/packages/**/*.test.ts'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/coverage/',
    '/dist/',
    '/lib/',
    '/es/',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/scripts/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!**/lib/**',
    '!**/es/**',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
      isolatedModules: true,
    },
  },

  // https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping
  moduleNameMapper: {
    '^@leetsolve/kit': '<rootDir>/packages/kit/src',
    '^@leetsolve/problems': '<rootDir>/packages/problems/src',
  },
}

export default config
