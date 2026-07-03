import { Router } from 'express';
import health from './health';
import auth from './auth';
import users from './users';
import bookings from './bookings';
import payments from './payments';
import notifications from './notifications';

const router = Router();

router.use('/health', health);
router.use('/auth', auth);
router.use('/users', users);
router.use('/bookings', bookings);
router.use('/payments', payments);
router.use('/notifications', notifications);

export default router;
