module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "__mocks__/styleMock.js"
  },
  testEnvironment: 'jsdom'
};