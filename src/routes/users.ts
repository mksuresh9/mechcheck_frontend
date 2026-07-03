import { Router } from 'express';
import { listUsers, getUser } from '../controllers/userController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

router.get('/', authenticate, requireRole('admin'), listUsers);
router.get('/:id', authenticate, requireRole('admin'), getUser);

export default router;
