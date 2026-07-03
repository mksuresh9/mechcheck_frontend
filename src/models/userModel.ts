import db from '../db';
import bcrypt from 'bcrypt';

export async function createUser({ name, email, password, role = 'customer' }: any) {
  const hash = await bcrypt.hash(password, 10);
  const result = await db.query(
    `INSERT INTO users (name, email, password_hash, role, created_at) VALUES ($1,$2,$3,$4,now()) RETURNING id,name,email,role`,
    [name, email, hash, role]
  );
  return result.rows[0];
}

export async function findByEmail(email: string) {
  const res = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  return res.rowCount ? res.rows[0] : null;
}

export async function findById(id: string) {
  const res = await db.query('SELECT id,name,email,role,created_at FROM users WHERE id = $1', [id]);
  return res.rowCount ? res.rows[0] : null;
}

export async function getAllUsers() {
  const res = await db.query('SELECT id,name,email,role,created_at FROM users ORDER BY created_at DESC');
  return res.rows;
}
