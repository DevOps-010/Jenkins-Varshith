const { add, subtract } = require('../src/app');

// Simple test suite
test('add function correctly adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});

test('subtract function correctly subtracts two numbers', () => {
  expect(subtract(5, 2)).toBe(3);
}); 