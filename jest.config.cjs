module.exports = {
    collectCoverage: true,
    testEnvironment: 'jsdom',
    extensionsToTreatAsEsm: ['.ts', '.jsx'],
    collectCoverageFrom: [
        '**src/**/*.{js,ts,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
    ],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
  };