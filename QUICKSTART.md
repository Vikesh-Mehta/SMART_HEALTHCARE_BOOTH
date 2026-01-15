# Quick Start Guide - Smart Health Booths

## 🚀 Get Started in 5 Minutes

### Step 1: Setup MongoDB Atlas (2 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and create an account
3. Create a free cluster (M0 Sandbox)
4. Click "Database Access" → "Add New Database User"
   - Username: `healthboothuser`
   - Password: Generate a secure password (save it!)
   - User Privileges: Read and write to any database
5. Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
6. Click "Connect" on your cluster → "Connect your application"
7. Copy the connection string

### Step 2: Configure Environment (1 minute)

1. Open the `.env` file in the project root
2. Replace with your values:
```env
VITE_MONGODB_URI=mongodb+srv://healthboothuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/smart_health_booths?retryWrites=true&w=majority
VITE_JWT_SECRET=my_super_secret_jwt_key_123456789
VITE_API_URL=http://localhost:3001/api
```

Replace:
- `YOUR_PASSWORD` with the password you generated
- `cluster0.xxxxx` with your actual cluster address from Atlas

### Step 3: Install & Run (2 minutes)

Open terminal and run:

```bash
# Install dependencies (takes ~1 minute)
npm install
cd server
npm install
cd ..

# Start the application (takes ~10 seconds)
npm run dev:all
```

Wait for:
```
✓ Server running on port 3001
✓ Connected to MongoDB Atlas
➜ Local: http://localhost:5173
```

### Step 4: Create Your Account

1. Open http://localhost:5173
2. Click "Sign up"
3. Fill in:
   - **Name**: Your full name
   - **Email**: your.email@example.com
   - **Password**: At least 6 characters
   - **Confirm Password**: Same as above
   - *(Optional)* Phone, Date of Birth, Gender, Blood Group, Address
4. Click "Sign Up"

✨ **You're all set!** The dashboard will load with your profile.

## ✅ What You Can Do Now

### Dashboard
- View your health metrics
- See recent activities
- Check upcoming appointments
- Quick access to all features

### Health Checkup
- Record vital signs
- Track blood pressure, heart rate, sugar levels
- View health history

### Virtual Consultation
- Browse available doctors
- Schedule appointments
- Get medical advice

### Profile
- Update personal information
- Manage medical history
- View appointment history

## 🎯 Next Steps

1. **Add Health Data**: Go to Health Checkup and record your first measurements
2. **Schedule Consultation**: Book a virtual doctor appointment
3. **Complete Profile**: Add your medical history in Profile page

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- Check your `.env` file has the correct MongoDB URI
- Verify you whitelisted 0.0.0.0/0 in MongoDB Atlas Network Access
- Make sure your password doesn't have special characters (use alphanumeric)

### "Port 3001 already in use"
Another application is using the port. Kill it:
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <number> /F

# Mac/Linux
lsof -i :3001
kill -9 <number>
```

### "Login not working"
- Clear browser cache and cookies
- Check browser console for errors (F12)
- Verify backend is running (should see "Connected to MongoDB Atlas" message)

### Need Help?
Check the full [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md) for detailed information.

## 🎉 Tips

- **Test Account**: Create one with dummy data to explore features
- **Health Records**: Add some sample health data to see visualizations
- **Dark Mode**: Toggle with the moon/sun icon in header
- **Mobile**: Try it on your phone - it's fully responsive!

---

**Ready to go! Enjoy using Smart Health Booths! 🏥**
