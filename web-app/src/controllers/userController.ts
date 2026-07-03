import { Request, Response } from 'express';
import * as UserModel from '../models/userModel';

export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await UserModel.getAllUsers();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
