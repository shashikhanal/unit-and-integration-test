// simulating an external currency conversion API call
export const getExchangeRate = async (currency: string): Promise<number> => {
  if (currency === 'USD') return 1;
  if (currency === 'NPR') return 130;
  if (currency === 'EUR') return 0.85;

  throw new Error('Currency not supported.');
};