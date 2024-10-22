export interface Account {
  id: string,
  balance: number,
  accountType: string,
}

// dummy database for testing: simulating in-memory database
const accountsDb: Account[] = [
  { id: '1', balance: 1000, accountType: 'savings' },
  { id: '2', balance: 5000, accountType: 'current' },
];

export const Account = {
  findById: async (id: string) => {
    const account = accountsDb.find(account => account.id == id);

    if (!account) {
      throw new Error('Account not found.');
    }

    return JSON.parse(JSON.stringify(account));
  },

  updateBalance: async (id: string, balance: number) => {
    let account = accountsDb.find(account => account.id == id);

    if (!account) {
      throw new Error('Account not found.');
    }

    return account.balance = balance;
  },
};
