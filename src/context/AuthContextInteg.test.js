const { createElement, generateText, validateInput } = require('./AuthContext1'); 

describe('Integration Test', () => {
  it('should generate text using the generateText function', () => {
    const email = 'test@example.com';
    const password = 'testPassword';

    const text = generateText(email, password);

    expect(text).toBe('Email is entered');
  });
});
