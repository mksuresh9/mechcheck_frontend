import { Request, Response } from 'express';

export async function razorpayWebhook(req: Request, res: Response) {
  // Validate signature using Razorpay secret and process events
  // For now, accept and return 200
  console.log('Received Razorpay webhook', req.body);
  res.status(200).json({ ok: true });
}

export async function createOrder(req: Request, res: Response) {
  // Server-side create order with Razorpay APIs
  res.status(201).json({ orderId: 'rzp_test_mock' });
}
