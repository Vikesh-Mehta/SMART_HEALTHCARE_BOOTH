import express from 'express';
import { ObjectId } from 'mongodb';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get health records
router.get('/records', verifyToken, async (req, res) => {
  try {
    const db = req.db;
    const records = await db.collection('health_records')
      .find({ userId: new ObjectId(req.userId) })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();

    res.json(records);
  } catch (error) {
    console.error('Get health records error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get latest health metrics
router.get('/metrics/latest', verifyToken, async (req, res) => {
  try {
    const db = req.db;
    const latestRecord = await db.collection('health_records')
      .findOne(
        { userId: new ObjectId(req.userId) },
        { sort: { createdAt: -1 } }
      );

    if (!latestRecord) {
      return res.json({
        heartRate: { value: 0, unit: 'bpm', status: 'normal' },
        bloodPressure: { value: '0/0', unit: 'mmHg', status: 'normal' },
        bloodSugar: { value: 0, unit: 'mg/dL', status: 'normal' },
        oxygenLevel: { value: 0, unit: '%', status: 'normal' }
      });
    }

    res.json(latestRecord.metrics);
  } catch (error) {
    console.error('Get latest metrics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create health record
router.post('/records', verifyToken, async (req, res) => {
  try {
    const { metrics, notes } = req.body;

    const db = req.db;
    
    const record = {
      userId: new ObjectId(req.userId),
      metrics,
      notes: notes || '',
      createdAt: new Date()
    };

    const result = await db.collection('health_records').insertOne(record);
    
    res.status(201).json({
      message: 'Health record created successfully',
      record: { ...record, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Create health record error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent activities
router.get('/activities', verifyToken, async (req, res) => {
  try {
    const db = req.db;
    
    // Combine health records and appointments into activities
    const healthRecords = await db.collection('health_records')
      .find({ userId: new ObjectId(req.userId) })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const appointments = await db.collection('appointments')
      .find({ userId: new ObjectId(req.userId), status: 'Completed' })
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    const activities = [
      ...healthRecords.map(record => ({
        id: record._id,
        type: 'checkup',
        title: 'Health Checkup',
        date: record.createdAt,
        description: 'Health metrics recorded',
        icon: 'Activity'
      })),
      ...appointments.map(apt => ({
        id: apt._id,
        type: 'consultation',
        title: apt.type,
        date: new Date(apt.date),
        description: `Consulted with ${apt.doctor}`,
        icon: 'VideoIcon'
      }))
    ];

    // Sort by date
    activities.sort((a, b) => b.date - a.date);

    res.json(activities.slice(0, 10));
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
