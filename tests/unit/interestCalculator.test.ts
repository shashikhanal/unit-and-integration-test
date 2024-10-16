import { calculateInterest } from "../../src/utility/interestCalculator";

describe('Interest Calculator', () => {
  it('calculates interest for savings accounts correctly', () => {
    const balance = 1000;
    const interest = calculateInterest(balance, 'savings');
    expect(interest).toBe(50); // 5% of 1000
  });

  it('calculates interest for current accounts correctly', () => {
    const balance = 1000;
    const interest = calculateInterest(balance, 'current');
    expect(interest).toBe(10); // 1% of 1000
  });

  it('throws an error for invalid account types', () => {
    const balance = 1000;
    expect(() => calculateInterest(balance, 'invalid')).toThrow('Invalid account type.');
  });
});