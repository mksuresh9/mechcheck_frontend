import { Request, Response } from 'express';
import db from '../db';

export async function listNotifications(req: Request, res: Response) {
  const user = req.user;
  try {
    const r = await db.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100', [user.id]);
    res.json(r.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function sendNotification(req: Request, res: Response) {
  const { user_id, type, payload } = req.body;
  try {
    const r = await db.query('INSERT INTO notifications (user_id, type, payload, created_at) VALUES ($1,$2,$3,now()) RETURNING *', [user_id, type, payload]);
    res.status(201).json(r.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
