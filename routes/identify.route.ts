import  {Router} from 'express';
import { identify } from '../controllers/identifyCustomer/identifyCustomer.controller.js';

const identifyRouter = Router();

identifyRouter.post('/identify', identify);

export default identifyRouter;