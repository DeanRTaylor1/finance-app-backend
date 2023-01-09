import express, { Request, Response } from 'express'
import { BadRequestError, requireAuth } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { User } from '../../../models/postgres/user-model';

const router = express.Router();

router.post('/api/finances/expenses', requireAuth, async (req: Request, res: Response) => {
  const { item, cost, currency, tag, dateSpent, email } = req.body;

  console.log(req.body)

  if (!item || !cost || !currency || !tag || !dateSpent || !email) {
    throw new BadRequestError('Missing Attributes')
  }
  const { id } = await User.findByEmail(email);

  const result = await Expenses.insertNewExpense(item, cost, currency, tag, dateSpent, id);
  console.log(result);
  res.send(result);
})

export {router as expensesNewRouter}
