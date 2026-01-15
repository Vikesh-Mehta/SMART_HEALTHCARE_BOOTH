import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import healthRoutes from './routes/health.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
let db;
const mongoUri = process.env.VITE_MONGODB_URI || '';

// Validate MongoDB URI
if (!mongoUri || mongoUri === 'your_mongodb_atlas_connection_string_here') {
  console.warn('⚠️  WARNING: MongoDB connection string not configured!');
  console.warn('📝 Please update VITE_MONGODB_URI in .env file');
  console.warn('🔗 Get your connection string from: https://cloud.mongodb.com/');
}

// Create MongoDB client only if URI is valid
const client = mongoUri && mongoUri !== 'your_mongodb_atlas_connection_string_here' 
  ? new MongoClient(mongoUri) 
  : null;

async function connectDB() {
  if (!client) {
    console.log('⚠️  Skipping MongoDB connection - connection string not configured');
    return;
  }
  
  try {
    await client.connect();
    db = client.db('smart_health_booths');
    console.log('✅ Connected to MongoDB Atlas');
    
    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('health_records').createIndex({ userId: 1, createdAt: -1 });
    await db.collection('appointments').createIndex({ userId: 1, date: 1 });
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Please check your MongoDB Atlas connection string in .env file');
    process.exit(1);
  }
}

// Make db available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/health', healthRoutes);

app.get('/api/health-check', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    database: db ? 'connected' : 'not configured'
  });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});

export { db };
