import express from 'express';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const db = req.db;
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.userId) });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const {
      name,
      phone,
      dob,
      address,
      gender,
      bloodGroup,
      height,
      weight,
      allergies,
      chronicConditions
    } = req.body;

    const db = req.db;
    
    const updateData = {
      name,
      phone,
      dob,
      address,
      gender,
      bloodGroup,
      height,
      weight,
      allergies,
      chronicConditions,
      updatedAt: new Date()
    };

    await db.collection('users').updateOne(
      { _id: new ObjectId(req.userId) },
      { $set: updateData }
    );

    const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(req.userId) });
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({
      message: 'Profile updated successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user appointments
router.get('/appointments', verifyToken, async (req, res) => {
  try {
    const db = req.db;
    const appointments = await db.collection('appointments')
      .find({ userId: new ObjectId(req.userId) })
      .sort({ date: -1 })
      .toArray();

    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create appointment
router.post('/appointments', verifyToken, async (req, res) => {
  try {
    const { date, time, doctor, type, status } = req.body;

    const db = req.db;
    
    const appointment = {
      userId: new ObjectId(req.userId),
      date,
      time,
      doctor,
      type,
      status: status || 'Scheduled',
      createdAt: new Date()
    };

    const result = await db.collection('appointments').insertOne(appointment);
    
    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: { ...appointment, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Generate sample data for new users (for testing)
router.post('/generate-sample-data', verifyToken, async (req, res) => {
  try {
    const db = req.db;
    const userId = new ObjectId(req.userId);

    // Check if user already has data
    const existingRecords = await db.collection('health_records').countDocuments({ userId });
    if (existingRecords > 0) {
      return res.json({ message: 'Sample data already exists' });
    }

    // Create sample health record
    const healthRecord = {
      userId,
      metrics: {
        heartRate: { value: 72, unit: 'bpm', status: 'normal' },
        bloodPressure: { value: '120/80', unit: 'mmHg', status: 'normal' },
        bloodSugar: { value: 95, unit: 'mg/dL', status: 'normal' },
        oxygenLevel: { value: 98, unit: '%', status: 'normal' }
      },
      notes: 'Initial health checkup - All vitals normal',
      createdAt: new Date()
    };

    // Create sample appointment
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const appointment = {
      userId,
      date: tomorrow.toISOString().split('T')[0],
      time: '10:00 AM',
      doctor: 'Dr. Ananya Singh',
      type: 'General Consultation',
      status: 'Scheduled',
      createdAt: new Date()
    };

    await Promise.all([
      db.collection('health_records').insertOne(healthRecord),
      db.collection('appointments').insertOne(appointment)
    ]);

    res.json({ 
      message: 'Sample data created successfully',
      data: { healthRecord, appointment }
    });
  } catch (error) {
    console.error('Generate sample data error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
