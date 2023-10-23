const displayTotalSpent = require('./dashboard_test')

test('Shows the correct total spent', () => {
  expect(displayTotalSpent(1000, 300, 100, 400)).toBe(300);
});

test('Shows the correct error message', () => {
  expect(displayTotalSpent(1000, '', 100, 400)).toBe('Error in database. Spent should be an integer.');
});

test('Shows the correct error message with string number', () => {
  expect(displayTotalSpent(1000, '10', 100, 400)).toBe('Error in database. Spent should be an integer.');
});