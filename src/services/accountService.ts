import { Account } from "../models/account";

const getAccountById = async (id: string) => {
  // simulating database call
  return await Account.findById(id);
}

export { getAccountById };