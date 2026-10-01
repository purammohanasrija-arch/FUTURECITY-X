import bcrypt from 'bcryptjs';
import { cityStore } from '../services/memoryStore.js';
import { generateToken } from '../middleware/authMiddleware.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, role = 'citizen', title, sector } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const existing = cityStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: ['admin', 'operator', 'citizen'].includes(role) ? role : 'citizen',
      title: title || (role === 'admin' ? 'City Administrator' : role === 'operator' ? 'Grid Operator' : 'Resident Citizen'),
      sector: sector || 'Central District',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      createdAt: new Date().toISOString()
    };

    cityStore.users.push(newUser);

    const token = generateToken(newUser);
    const { password: _, ...userSafe } = newUser;

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = cityStore.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      message: 'Login successful.',
      token,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const { password: _, ...userSafe } = req.user;
    res.json({
      success: true,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const quickDemoLogin = async (req, res) => {
  try {
    const { role = 'admin' } = req.params;
    const user = cityStore.users.find(u => u.role === role) || cityStore.users[0];

    const token = generateToken(user);
    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      message: `Logged in as demo ${role.toUpperCase()}.`,
      token,
      user: userSafe
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
