# Smart Health Booths - MongoDB Atlas Migration

## Overview
This project has been successfully migrated from Supabase to MongoDB Atlas with complete authentication and user data management.

## What Changed

### Backend (NEW)
- **Server**: Node.js + Express backend in `/server` directory
- **Database**: MongoDB Atlas for all data storage
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **API Structure**:
  - `/api/auth` - Authentication routes (login, register, verify)
  - `/api/user` - User profile and appointments
  - `/api/health` - Health records and metrics

### Frontend Updates
- **Authentication Context**: React context for managing user state
- **API Service**: Axios-based API client with token management
- **Protected Routes**: Route guards for authenticated pages
- **Login/Signup**: New authentication components
- **Real Data**: Dashboard and Profile pages now use real user data from MongoDB

### Key Features
✅ User registration and login  
✅ JWT token-based authentication  
✅ Secure password hashing  
✅ Protected routes  
✅ User profile management  
✅ Health records tracking  
✅ Appointments management  
✅ Real-time data synchronization  

## Setup Instructions

### 1. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Create database user with read/write permissions
4. Whitelist your IP address or use 0.0.0.0/0 for development
5. Get your connection string

### 2. Environment Configuration
Update the `.env` file with your MongoDB credentials:
```env
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart_health_booths?retryWrites=true&w=majority
VITE_JWT_SECRET=your_secret_key_here_change_in_production
VITE_API_URL=http://localhost:3001/api
```

### 3. Installation
```bash
# Install all dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### 4. Running the Application
```bash
# Run both frontend and backend together
npm run dev:all

# OR run separately:
# Terminal 1: Backend
npm run dev:server

# Terminal 2: Frontend  
npm run dev
```

### 5. First Use
1. Open http://localhost:5173
2. Click "Sign up" to create an account
3. Fill in your information
4. Login with your credentials
5. Access your personalized dashboard!

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  phone: String,
  dob: String,
  gender: String,
  bloodGroup: String,
  address: String,
  height: String,
  weight: String,
  allergies: String,
  chronicConditions: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Health Records Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  metrics: {
    heartRate: { value, unit, status },
    bloodPressure: { value, unit, status },
    bloodSugar: { value, unit, status },
    oxygenLevel: { value, unit, status }
  },
  notes: String,
  createdAt: Date
}
```

### Appointments Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: users),
  date: String,
  time: String,
  doctor: String,
  type: String,
  status: String,
  createdAt: Date
}
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

## Testing Checklist

- [ ] User registration works
- [ ] User login works  
- [ ] Protected routes redirect to login
- [ ] Dashboard shows user data
- [ ] Profile can be updated
- [ ] Health records are saved
- [ ] Appointments can be created
- [ ] Logout works correctly

## Troubleshooting

**Issue**: Cannot connect to MongoDB  
**Solution**: Check your connection string and IP whitelist in MongoDB Atlas

**Issue**: CORS errors  
**Solution**: Ensure backend CORS is configured for your frontend URL

**Issue**: Login not working  
**Solution**: Verify JWT_SECRET is set in .env file

## Next Steps

1. ✅ Setup MongoDB Atlas account
2. ✅ Configure environment variables
3. ✅ Run the application locally
4. ✅ Test all features
5. ⏭️ Deploy to production (see DEPLOYMENT.md)

## Support

For questions or issues, please refer to the documentation or create an issue on the repository.
