import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { User } from '../../../models/postgres/user-model';

const router = express.Router();

router.get(
  '/api/finances/expenses',
  requireAuth,
  async (req: Request, res: Response) => {
    const { email, page } = req.headers;

    if (!page || typeof email !== 'string' || isNaN(+page!)) {
      throw new BadRequestError('Missing Parameters');
    }

    console.log(email, page);
    const { id } = await User.findByEmail(email);
    const allItems = await Expenses.findAll(id, +page);

    console.log(allItems);

    res.status(200).send(allItems);
  }
);

export { router as expensesIndexRouter };
