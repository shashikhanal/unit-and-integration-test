import { Router, Request, Response } from 'express';
import { getAccountById, updateAccountBalance } from '../services/accountService';
import * as externalApi from '../api/externalApi';

const router = Router();

router.get('/account/:id', async (req: Request, res: Response) => {
  const accountId = req.params.id;
  const currency = req.query.currency ? String(req.query.currency) : 'USD';

  try {
    let account = await getAccountById(accountId);
    const exchangeRate = await externalApi.getExchangeRate(currency);
    account.balance = account.balance * exchangeRate;

    res.json(account);
  } catch (error) {
    let errorMessage = 'Error occured when getting Account!';

    if (error instanceof Error && error.message) {
      errorMessage = error.message;
    }

    res.status(404).json({
      error: errorMessage
    });
  }
});

router.post('/account/update', async (req: Request, res: Response) => {
  const accountId: string = req.body.id;
  const balance: number = Number(req.body.balance);

  try {
    const response = await updateAccountBalance(accountId, balance)
    res.json(response);
  } catch {
    res.status(400).json({
      error: 'Error occured when updating Account balance!'
    })
  }
});

export default router;