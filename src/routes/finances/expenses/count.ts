import express, { Request, Response } from 'express';
import { BadRequestError } from '../../../common';
import { requireAuth } from '../../../common/middlewares/require-auth';
import { Expenses } from '../../../models/postgres/expenses-model';
import { User } from '../../../models/postgres/user-model';

const router = express.Router();

router.get(
  '/api/finances/expenses/count',
  requireAuth,
  async (req: Request, res: Response) => {
    const { email } = req.headers;
    if (!email || typeof email !== 'string') {
      throw new BadRequestError('Missing Paramaters');
    }
    const { id } = await User.findByEmail(email);

    const count = await Expenses.getExpenseCountByUser(id);
    // console.log(count)

    res.status(200).send(count);
  }
);

export { router as expenseCountRouter };
