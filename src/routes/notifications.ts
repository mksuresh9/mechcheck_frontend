import { Router } from 'express';
import { listNotifications, sendNotification } from '../controllers/notificationController';
import { authenticate } from '../middleware/auth';
import { requireRole } from '../middleware/roles';

const router = Router();

router.get('/', authenticate, listNotifications);
router.post('/', authenticate, requireRole('admin'), sendNotification);

export default router;
