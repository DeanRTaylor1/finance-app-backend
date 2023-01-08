import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '../../common';
import { User } from '../../models/postgres/user-model';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/finances/user',
  requireAuth,
  body('monthlySalary')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Salary must be a number'),
  body('savingsTarget')
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Savings target must be a number'),
  validateRequest,
  async (req: Request, res: Response) => {
    //   'update user profile here'
    //
    const { email, username, monthlySalary, currency, phone, savingsTarget } = req.body;

    const response = await User.updateExistingUser({
      email,
      username,
      monthlySalary,
      currency,
      phone,
      savingsTarget
    });

    res.send({
      email: response.email,
      monthlySalary: response.monthlySalary,
      currency: response.currency,
      phone: response.phone,
      savingsTarget: response.savingsTarget
    });
  }
);

export { router as updateUserRouter };
