import { Account } from '../../src/models/account';
import { getAccountById, updateAccountBalance } from '../../src/services/accountService';

jest.mock('../../src/models/account'); // mocking the Account model

// Unit test complexity - Easy
describe('Account service: getAccountById()', () => {
  it('should return the correct account when called with a valid ID', async () => {
    // mock Account.findById to return a fake account
    const mockAccount = { id: '1', balance: 1000, accountType: 'savings' };
    (Account.findById as jest.Mock).mockResolvedValue(mockAccount);

    const account = await getAccountById('1');
    expect(account).toEqual(mockAccount);
    // make sure Account.findById function is called at least once
    expect(Account.findById).toHaveBeenCalledWith('1');
  });

  it('should return null if the account does not exist', async () => {
    (Account.findById as jest.Mock).mockResolvedValue(null);

    const account = await getAccountById('9991a');
    expect(account).toBeNull();
    expect(Account.findById).toHaveBeenCalledWith('9991a');
  });
});

describe('Account service: updateAccountBalance()', () => {
  it('should update the balance successfully', async () => {
    // mock Account.findById to return a fake account
    const mockUpdatedAccount = { id: '1', balance: 1500, accountType: 'savings' };
    (Account.updateBalance as jest.Mock).mockResolvedValue(mockUpdatedAccount);

    const account = await updateAccountBalance('1', 1500);
    expect(account).toEqual(mockUpdatedAccount);
    // make sure Account.updateBalance function is called at least once
    expect(Account.updateBalance).toHaveBeenCalledWith('1', 1500);
  });
});