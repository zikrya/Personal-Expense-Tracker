const { generateText } = require('./AuthContext1');
const { validateInput } = require("./AuthContext1");
//const { checkAndGenerate } = require("./AuthContext1");

test('should output email and password', () => {
  const text = generateText('email', 'password' );
  expect(text).toBe('Email is entered');
});
