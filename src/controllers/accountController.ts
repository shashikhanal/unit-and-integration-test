import { Router, Request, Response } from 'express';
import { getAccountById } from '../services/accountService';

const router = Router();

router.get('/account/:id', async (req: Request, res: Response) => {
  const accountId = req.params.id;

  try {
    const account = await getAccountById(accountId);
    res.json(account);
  } catch {
    res.status(404).json({
      error: 'Account not found!'
    });
  }
});

export default router;