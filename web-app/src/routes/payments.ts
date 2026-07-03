import { Router } from 'express';
import { razorpayWebhook, createOrder } from '../controllers/paymentController';

const router = Router();

router.post('/razorpay/webhook', razorpayWebhook);
router.post('/orders', createOrder);

export default router;
