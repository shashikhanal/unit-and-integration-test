import { Account } from '../../src/models/account';
import { getAccountById } from '../../src/services/accountService';

jest.mock('../../src/models/account'); // mocking the Account model

// Unit test complexity - Easy
describe('Account service', () => {
  it('should return the correct account when called with a valid ID', async () => {
    // mock Account.findById to return a fake account
    const mockAccount = { id: '1', balance: 1000, accountType: 'savings' };
    (Account.findById as jest.Mock).mockResolvedValue(mockAccount);

    const account = await getAccountById('1');
    expect(account).toEqual(mockAccount);
    // make sure Account.findById function is called at least once
    expect(Account.findById).toHaveBeenCalledWith('1');
  });
});