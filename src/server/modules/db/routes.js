import { Router } from 'express';

import { get, set } from './controllers';
import { authJwt } from '../../services/auth.service';

const router = new Router();

router.get('/', authJwt, get);
router.put('/', authJwt, set);

export default router;
