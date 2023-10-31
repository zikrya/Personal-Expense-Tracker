module.exports = {
  collectCoverage: true,
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.ts', '.jsx'],
  collectCoverageFrom: [
      '**src/**/*.{js,ts,jsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
  ],
};