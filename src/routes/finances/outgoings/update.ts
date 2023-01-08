
import express, { Request, Response } from 'express'
import { BadRequestError, requireAuth } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';


const router = express.Router();

router.put('/api/finances/outgoings', requireAuth, async (req: Request, res: Response) => {

  const { email, item, currency, userId, tag, cost } = req.body;

  const existingItem = await Outgoings.updateExistingRecord(email, item, currency, tag, cost)

  console.log(existingItem)
  if(!existingItem){
    throw new BadRequestError('Item does not exist')
  }

  res.send([existingItem])

})

export { router as updateDutgoingRouter }
