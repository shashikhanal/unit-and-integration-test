import { Account } from "../models/account";

const getAccountById = async (id: string) => {
  // simulating database call
  return await Account.findById(id);
}

const updateAccountBalance = async (id: string, balance: number) => {
  // simulating database update
  return await Account.updateBalance(id, balance);
}

export { getAccountById, updateAccountBalance };