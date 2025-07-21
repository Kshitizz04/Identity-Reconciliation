import  {Router} from 'express';
import { tempRoute } from '../controllers/identify.controller.ts';
import tseslint from './../node_modules/typescript-eslint/dist/config-helper';

const identifyRouter = Router();

identifyRouter.get('/identify', tempRoute);

export default identifyRouter;