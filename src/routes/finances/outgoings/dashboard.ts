import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { Outgoings } from '../../../models/postgres/outgoings-model';
import { User } from '../../../models/postgres/user-model';


const router = express.Router();

router.get('/api/finances/outgoings/dashboard', requireAuth, async (req: Request, res: Response) => {
  const { email, startdate, enddate } = req.headers;
  console.log(startdate, enddate)

  if (!email || typeof email !== 'string' || typeof startdate !== 'string' || typeof enddate !== 'string') {
    throw new BadRequestError('Missing Parameters');
  }

  const { id, monthlySalary, savingsTarget, currency } = await User.findByEmail(email);
  console.log(id, monthlySalary, savingsTarget)
  const count = await Outgoings.countRecordsByUser(+id)
  const total = await Outgoings.sumRecordsByUser(+id)
  const expenses = await Expenses.getExpensesInWithinDates(id, startdate, enddate)

  res.status(200).send({ count, total: total.totalOutgoings, monthlySalary, savingsTarget, currency, expenses })
})

export { router as dashboardDataValuesRouter }
