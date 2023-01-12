import express, { Request, Response } from 'express';
import { BadRequestError, requireAuth } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';

const router = express.Router();

router.delete(
  '/api/finances/outgoings',
  requireAuth,
  async (req: Request, res: Response) => {
    const { item, userid } = req.headers;

    console.log(item, userid);

    if (!userid || typeof item !== 'string' || typeof +userid !== 'number') {
      throw new BadRequestError('Missing Parameters');
    }

    const existingItem = await Outgoings.findExistingItemByName(item);
    if (!existingItem) {
      throw new BadRequestError('Item does not exist');
    }
    await Outgoings.deleteOutgoingRecords(item, +userid);

    res.status(200).send([{ message: 'Removed Item Successfully' }]);
  }
);

export { router as deleteOutgoingRouter };
