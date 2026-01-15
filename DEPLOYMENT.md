# Smart Health Booths - Deployment Guide

## Prerequisites

1. **MongoDB Atlas Account**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a new cluster
   - Get your connection string

2. **Node.js** (v18 or higher)
3. **npm** or **yarn**

## Environment Setup

### 1. Configure MongoDB Atlas

1. Log in to MongoDB Atlas
2. Create a new cluster (free tier is fine for testing)
3. In "Database Access", create a new user with read/write permissions
4. In "Network Access", add your IP address (or 0.0.0.0/0 for testing)
5. Click "Connect" → "Connect your application"
6. Copy the connection string

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_health_booths?retryWrites=true&w=majority
VITE_JWT_SECRET=your_very_long_and_secure_secret_key_here_change_in_production
VITE_API_URL=http://localhost:3001/api
```

**Important**: Replace the MongoDB URI with your actual connection string from Atlas.

## Local Development

### 1. Install Dependencies

```bash
# Install client dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 2. Run the Application

#### Option A: Run both client and server together
```bash
npm run dev:all
```

#### Option B: Run separately
Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Production Deployment

### Deploy to Vercel (Frontend)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - `VITE_MONGODB_URI`
   - `VITE_JWT_SECRET`
   - `VITE_API_URL` (set to your backend URL)

### Deploy Backend to Railway/Render

#### Option 1: Railway

1. Sign up at [Railway.app](https://railway.app)
2. Create new project → Deploy from GitHub
3. Select the `server` folder
4. Add environment variables:
   - `VITE_MONGODB_URI`
   - `VITE_JWT_SECRET`
   - `PORT=3001`

#### Option 2: Render

1. Sign up at [Render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Set:
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables

### Deploy Full Stack to Heroku

1. Install Heroku CLI
2. Create `Procfile` in root:
```
web: npm run server
```

3. Deploy:
```bash
heroku create your-app-name
heroku config:set VITE_MONGODB_URI="your-mongodb-uri"
heroku config:set VITE_JWT_SECRET="your-secret"
git push heroku main
```

## Database Collections

The application uses these MongoDB collections:
- `users` - User profiles and authentication
- `health_records` - Health checkup data
- `appointments` - Virtual consultations

## First Time Setup

1. Visit the application
2. Click "Sign up" to create a new account
3. Fill in your details
4. Login with your credentials
5. Start using the dashboard!

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/appointments` - Get appointments
- `POST /api/user/appointments` - Create appointment

### Health
- `GET /api/health/records` - Get health records
- `GET /api/health/metrics/latest` - Get latest metrics
- `POST /api/health/records` - Create health record
- `GET /api/health/activities` - Get recent activities

## Troubleshooting

### MongoDB Connection Issues
- Check your connection string is correct
- Verify IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### CORS Errors
- Update CORS settings in `server/index.js` to include your frontend URL

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

## Security Notes

⚠️ **Important for Production**:
1. Change JWT_SECRET to a strong random string
2. Enable MongoDB Atlas IP whitelist
3. Use environment variables for all secrets
4. Enable HTTPS
5. Implement rate limiting
6. Add input validation and sanitization

## Support

For issues or questions, please refer to the documentation or create an issue on GitHub.
