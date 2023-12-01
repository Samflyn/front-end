import { Router } from 'express';
import { create, getList, getOne } from '../controllers/control';

const router = Router();

router.post('/', create);

router.get('/', getList);

router.get('/:name', getOne);

export default router;
