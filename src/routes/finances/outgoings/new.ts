
import express, { Request, Response } from 'express';
import { BadRequestError, currentUser, requireAuth } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';
import { User } from '../../../models/postgres/user-model';

const router = express.Router();
/* TODO add user-model integration  */

router.post(
  '/api/finances/outgoings',
  requireAuth,
  async (req: Request, res: Response) => {
    const { item, currency, email, tag, cost } = req.body;

    if (!currency || !email || !tag || !cost || !item) {
      throw new BadRequestError('Missing attribute`')
    }
    const existingItem = await Outgoings.findExistingItemByName(item)

    if (existingItem) {
      console.log(!!existingItem)

      throw new BadRequestError('Cannot create duplicate item please change the name')
    }
    const { id } = await User.findByEmail(email);
    

    const addedItem = await Outgoings.insertNewRecord(item, currency, id, tag, cost)
    //remove the postgres id from the return as it is unused


    const outgoings = await Outgoings.findAll()
    console.log(outgoings)

    res.send(addedItem);
  }
);

export { router as outgoingsNewRouter };
