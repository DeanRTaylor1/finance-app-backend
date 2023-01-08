
import express, { Request, Response } from 'express'
import { BadRequestError, requireAuth } from '../../../common';
import { Outgoings } from '../../../models/postgres/outgoings-model';


const router = express.Router();

router.get('/api/finances/outgoings', requireAuth, async (req: Request, res: Response) => {

  const { email } = req.headers;
  console.log(email)

  if(typeof email !== 'string'){
    throw new BadRequestError('Details not provided')
  }
  const items = await Outgoings.getRecordsByUser(email)

  console.log(items)

  res.status(200).send(items)

})

export { router as getOutgoingsRouter }
