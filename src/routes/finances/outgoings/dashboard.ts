import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../../common';
import { Expenses } from '../../../models/postgres/expenses-model';
import { JoinQueries } from '../../../models/postgres/join-queries';
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
  const outgoingsSum = await JoinQueries.getTotalCostByTagsByUserid(+id)
  const totalOutgoings = await Outgoings.sumRecordsByUser(+id);
  const totalExpenses = await Expenses.sumRecordsByUser(+id);
  const expenses = await Expenses.getExpensesInWithinDates(id, startdate, enddate)
  console.log(totalOutgoings.totalOutgoings, totalExpenses.totalExpenses)

  res.status(200).send({ outgoingsSum, total: +totalOutgoings.totalOutgoings + +totalExpenses.totalExpenses, totalOutgoings: totalOutgoings.totalOutgoings, monthlySalary, savingsTarget, currency, expenses })
})

export { router as dashboardDataValuesRouter }
