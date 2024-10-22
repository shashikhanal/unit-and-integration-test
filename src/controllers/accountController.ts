import { Router, Request, Response } from 'express';
import { getAccountById, updateAccountBalance } from '../services/accountService';

const router = Router();

router.get('/account/:id', async (req: Request, res: Response) => {
  const accountId = req.params.id;

  try {
    const account = await getAccountById(accountId);
    res.json(account);
  } catch {
    res.status(404).json({
      error: 'Error occured when getting Account!'
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