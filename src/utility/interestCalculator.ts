
export const calculateInterest = (balance: number, accountType: string): number => {
  let interest: number = 0;

  switch(accountType){
    case 'savings':
      interest = 0.05 * balance; // 5% interest rate
      break;
    case 'current':
      interest = 0.01 * balance; // 1% interest rate
      break;
    default:
      throw new Error('Invalid account type.');
  }

  return interest;
}