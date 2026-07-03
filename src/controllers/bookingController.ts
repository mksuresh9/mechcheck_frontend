import { Request, Response } from 'express';
import db from '../db';

export async function createBooking(req: Request, res: Response) {
  const { customer_id, vehicle_id, scheduled_at, address, lat, lng } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO bookings (customer_id, vehicle_id, scheduled_at, address, lat, lng, status, created_at) VALUES ($1,$2,$3,$4,$5,$6,'pending',now()) RETURNING *`,
      [customer_id, vehicle_id, scheduled_at, address, lat, lng]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getBooking(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
    if (!result.rowCount) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function listBookings(req: Request, res: Response) {
  try {
    const result = await db.query('SELECT * FROM bookings ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
