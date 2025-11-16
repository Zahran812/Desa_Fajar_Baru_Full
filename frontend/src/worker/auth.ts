import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Env } from "./index";

interface AuthUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
  rt_number?: string;
  phone?: string;
}

// Extend Hono context to include user
declare module 'hono' {
  interface ContextVariableMap {
    user?: AuthUser;
  }
}

const JWT_SECRET = "your-super-secret-jwt-key-change-in-production";
const COOKIE_NAME = "auth_session";

const auth = new Hono<{ Bindings: Env }>();

// Password hash for demo accounts
const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

const generateToken = (user: AuthUser): string => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
    expiresIn: '7d'
  });
};

const verifyToken = (token: string): AuthUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch {
    return null;
  }
};

// Middleware to check authentication
const authMiddleware = async (c: any, next: any) => {
  const token = getCookie(c, COOKIE_NAME);
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const user = verifyToken(token);
  if (!user) {
    return c.json({ error: 'Invalid token' }, 401);
  }

  // Get full user data from database
  const { results } = await c.env.DB.prepare(
    'SELECT id, username, email, full_name, role, status, rt_number, phone FROM users WHERE id = ? AND status = "active"'
  ).bind(user.id).all();

  if (results.length === 0) {
    return c.json({ error: 'User not found' }, 401);
  }

  c.set('user', results[0]);
  await next();
};

// Login endpoint - now supports phone-based login
auth.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const { phone, password } = body;

    if (!phone || !password) {
      return c.json({ error: 'Phone number and password are required' }, 400);
    }

    // Get user from database - first try by phone, then by username for backward compatibility
    let results;
    const { results: phoneResults } = await c.env.DB.prepare(
      'SELECT * FROM users WHERE phone = ?'
    ).bind(phone).all();

    if (phoneResults.length > 0) {
      results = phoneResults;
    } else {
      // Fallback to username-based lookup for existing accounts
      const { results: usernameResults } = await c.env.DB.prepare(
        'SELECT * FROM users WHERE username = ?'
      ).bind(phone).all();
      results = usernameResults;
    }

    if (results.length === 0) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    const user = results[0] as any;

    // Check demo accounts with new phone numbers
    let passwordValid = false;
    
    if (phone === '08123456789' && password === 'operator123') {
      passwordValid = true;
    } else if (phone === '081234560011' && password === 'dusun123') {
      passwordValid = true;
    } else if (phone === '081234560000' && password === 'pengguna123') {
      passwordValid = true;
    } else if (user.username === 'operatordesa' && password === 'operator123') {
      passwordValid = true;
    } else if (user.username === 'dusun1' && password === 'dusun123') {
      passwordValid = true;
    } else if (user.username === 'pengguna1' && password === 'pengguna123') {
      passwordValid = true;
    } else {
      // For non-demo accounts, use bcrypt comparison
      passwordValid = await bcrypt.compare(password, user.password_hash);
    }

    if (!passwordValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    if (user.status !== 'active') {
      return c.json({ error: 'Account is not active' }, 401);
    }

    // Update last login
    await c.env.DB.prepare(
      'UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?'
    ).bind(user.id).run();

    // Generate JWT token
    const token = generateToken({
      id: user.id,
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
      status: user.status,
      rt_number: user.rt_number,
      phone: user.phone
    });

    // Set cookie
    setCookie(c, COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    });

    return c.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
        rt_number: user.rt_number,
        phone: user.phone
      }
    });

  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Register endpoint - updated for new field structure
auth.post('/api/auth/register', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      full_name,
      nik,
      phone,
      password,
      rt_number,
      rw_number,
      dusun,
      village,
      district,
      regency,
      province,
      address,
      birth_place,
      birth_date,
      gender,
      blood_type,
      religion,
      marital_status,
      occupation,
    } = body;

    if (!full_name || !nik || !phone || !password) {
      return c.json({ error: 'Required fields are missing' }, 400);
    }

    // Check if phone or NIK already exists
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT id FROM users WHERE phone = ? OR username = ?'
    ).bind(phone, nik).all();

    if (existingUser.length > 0) {
      return c.json({ error: 'Nomor telepon atau NIK sudah terdaftar' }, 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate username from NIK
    const username = nik;

    // Use provided address text as-is
    const fullAddress = `${address || ''}`.replace(/^[,\s]+|[,\s]+$/g, '');

    // Insert new user with extended KTP fields
    const result = await c.env.DB.prepare(`
      INSERT INTO users (
        username, email, password_hash, full_name, role, status, phone,
        address, rt_number, rw_number, village, dusun, district, regency, province,
        birth_place, birth_date, gender, blood_type, religion, marital_status, occupation
      )
      VALUES (
        ?, ?, ?, ?, 'citizen', 'pending', ?,
        ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?
      )
    `).bind(
      username, null, hashedPassword, full_name, phone,
      fullAddress, rt_number || null, rw_number || null, village || null, dusun || null, district || null, regency || null, province || null,
      birth_place || null, birth_date || null, gender || null, blood_type || null, religion || null, marital_status || null, occupation || null
    ).run();

    return c.json({
      success: true,
      message: 'Pendaftaran berhasil! Akun Anda menunggu persetujuan operator desa.',
      user_id: result.meta.last_row_id
    });

  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Forgot password endpoint
auth.post('/api/auth/forgot-password', async (c) => {
  try {
    const body = await c.req.json();
    const { phone } = body;

    if (!phone) {
      return c.json({ error: 'Phone number is required' }, 400);
    }

    // Check if phone exists in database
    const { results } = await c.env.DB.prepare(
      'SELECT id, full_name FROM users WHERE phone = ?'
    ).bind(phone).all();

    if (results.length === 0) {
      return c.json({ error: 'Nomor telepon tidak ditemukan' }, 404);
    }

    // In a real implementation, you would:
    // 1. Generate a reset token
    // 2. Send SMS with reset link/code
    // 3. Store the token with expiration

    // For now, we'll just return a success message
    return c.json({
      success: true,
      message: 'Instruksi reset kata sandi telah dikirim ke nomor telepon Anda'
    });

  } catch (error) {
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get current user
auth.get('/api/auth/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ user });
});

// Logout endpoint
auth.post('/api/auth/logout', async (c) => {
  setCookie(c, COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 0,
    path: '/'
  });

  return c.json({ success: true });
});

// Get pending registrations (operator only)
auth.get('/api/auth/pending-users', authMiddleware, async (c) => {
  const user = c.get('user');
  
  if (!user || user.role !== 'operator') {
    return c.json({ error: 'Access denied' }, 403);
  }

  const { results } = await c.env.DB.prepare(
    'SELECT id, username, email, full_name, phone, address, rt_number, created_at FROM users WHERE status = "pending" ORDER BY created_at DESC'
  ).all();

  return c.json({ users: results });
});

// Get users by role (operator only)
auth.get('/api/auth/users', authMiddleware, async (c) => {
  const user = c.get('user');
  
  if (!user || user.role !== 'operator') {
    return c.json({ error: 'Access denied' }, 403);
  }

  const role = c.req.query('role');
  let query = 'SELECT id, username, email, full_name, role, status, rt_number, phone, address, created_at FROM users WHERE role != "operator"';
  const params: string[] = [];
  
  if (role) {
    query += ' AND role = ?';
    params.push(role);
  }
  
  query += ' ORDER BY created_at DESC';

  const { results } = await c.env.DB.prepare(query).bind(...params).all();

  return c.json({ users: results });
});

// Create dusun head account (operator only)
auth.post('/api/auth/create-dusun-head', authMiddleware, async (c) => {
  const user = c.get('user');
  
  if (!user || user.role !== 'operator') {
    return c.json({ error: 'Access denied' }, 403);
  }

  try {
    const body = await c.req.json();
    const { username, password, full_name, email, phone, rt_number } = body;

    if (!username || !password || !full_name || !rt_number) {
      return c.json({ error: 'Required fields are missing' }, 400);
    }

    // Check if username already exists
    const { results: existingUser } = await c.env.DB.prepare(
      'SELECT id FROM users WHERE username = ?'
    ).bind(username).all();

    if (existingUser.length > 0) {
      return c.json({ error: 'Username already exists' }, 400);
    }

    // Check if RT number already has an admin
    const { results: existingAdmin } = await c.env.DB.prepare(
      'SELECT id FROM users WHERE rt_number = ? AND role = "dusun_head" AND status = "active"'
    ).bind(rt_number).all();

    if (existingAdmin.length > 0) {
      return c.json({ error: 'RT/Dusun ini sudah memiliki admin' }, 400);
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Insert new dusun head user
    const result = await c.env.DB.prepare(`
      INSERT INTO users (username, email, password_hash, full_name, role, status, phone, rt_number)
      VALUES (?, ?, ?, ?, 'dusun_head', 'active', ?, ?)
    `).bind(username, email || null, hashedPassword, full_name, phone || null, rt_number).run();

    // Get the created user
    const { results: newUser } = await c.env.DB.prepare(
      'SELECT id, username, email, full_name, role, status, rt_number, phone, created_at FROM users WHERE id = ?'
    ).bind(result.meta.last_row_id).all();

    return c.json({
      success: true,
      message: 'Akun kepala dusun berhasil dibuat',
      user: newUser[0]
    });

  } catch (error) {
    console.error('Create dusun head error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Approve/reject user registration (operator only)
auth.post('/api/auth/approve-user', authMiddleware, async (c) => {
  const user = c.get('user');
  
  if (!user || user.role !== 'operator') {
    return c.json({ error: 'Access denied' }, 403);
  }

  const body = await c.req.json();
  const { user_id, action } = body; // action: 'approve' or 'reject'

  if (!user_id || !action) {
    return c.json({ error: 'User ID and action are required' }, 400);
  }

  const newStatus = action === 'approve' ? 'active' : 'rejected';

  await c.env.DB.prepare(
    'UPDATE users SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?'
  ).bind(newStatus, user_id).run();

  return c.json({ success: true, message: `User ${action}d successfully` });
});

export { auth, authMiddleware };
