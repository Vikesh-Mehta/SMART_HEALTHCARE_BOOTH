import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, phone, dob, gender, bloodGroup, address } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const db = req.db;
    
    // Check if user exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      email,
      password: hashedPassword,
      name,
      phone: phone || '',
      dob: dob || '',
      gender: gender || '',
      bloodGroup: bloodGroup || '',
      address: address || '',
      height: '',
      weight: '',
      allergies: '',
      chronicConditions: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('users').insertOne(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertedId, email },
      process.env.VITE_JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertedId,
        email,
        name,
        phone,
        dob,
        gender,
        bloodGroup,
        address
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const db = req.db;
    
    // Find user
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.VITE_JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Verify token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET || 'default-secret');
    const db = req.db;
    
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
