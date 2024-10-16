import { calculateInterest } from "../../src/utility/interestCalculator";

describe('Interest Calculator', () => {
  it('adds two numbers', () => {
    const sum = calculateInterest(5, 4);
    expect(sum).toBe(9);
  });
});