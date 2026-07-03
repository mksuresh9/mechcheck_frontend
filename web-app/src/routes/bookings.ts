import { Router } from 'express';
import { createBooking, getBooking, listBookings } from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createBooking);
router.get('/:id', authenticate, getBooking);
router.get('/', authenticate, listBookings);

export default router;
