# 🎯 SETUP INSTRUCTIONS - READ THIS FIRST!

## What Was Done

Your Smart Health Booths project has been completely migrated from Supabase to MongoDB Atlas with full authentication system. Here's what's new:

### ✅ Completed Features
- Full user authentication (register/login/logout)
- MongoDB Atlas database integration
- Real user profiles (no dummy data)
- Protected routes for authenticated users
- Health records management
- Appointment system
- User dashboard with real data

## 🚀 How to Run This Project

### Prerequisites
1. **Node.js** v18+ installed
2. **npm** package manager
3. **MongoDB Atlas account** (free tier available)

### Step-by-Step Setup

#### 1. Install Dependencies (2 minutes)

```bash
# In the project root
npm install

# Install server dependencies
cd server
npm install
cd ..
```

#### 2. Setup MongoDB Atlas (3-5 minutes)

**A. Create MongoDB Account:**
1. Visit https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Click "Build a Database"
4. Choose FREE tier (M0 Sandbox)
5. Select cloud provider and region (any)
6. Click "Create"

**B. Create Database User:**
1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `healthboothuser`
5. Password: Click "Autogenerate Secure Password" and COPY IT!
6. Database User Privileges: "Atlas admin" or "Read and write to any database"
7. Click "Add User"

**C. Whitelist Your IP:**
1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (adds 0.0.0.0/0)
4. Click "Confirm"

**D. Get Connection String:**
1. Click "Database" (left sidebar)
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://healthboothuser:<password>@...`)

#### 3. Configure Environment Variables (1 minute)

1. Open the `.env` file in the project root directory
2. Update it with your values:

```env
VITE_MONGODB_URI=mongodb+srv://healthboothuser:YOUR_PASSWORD_HERE@cluster0.xxxxx.mongodb.net/smart_health_booths?retryWrites=true&w=majority
VITE_JWT_SECRET=ThisIsMySecretKeyForJWT123456789ChangeInProduction
VITE_API_URL=http://localhost:3001/api
```

**Important:** 
- Replace `YOUR_PASSWORD_HERE` with the password you copied
- Replace `cluster0.xxxxx` with your actual cluster address from the connection string
- You can change `VITE_JWT_SECRET` to any long random string (for security)

#### 4. Run the Application (1 minute)

Open your terminal in the project folder and run:

```bash
npm run dev:all
```

This command starts both:
- Backend server on port 3001
- Frontend app on port 5173

Wait for these messages:
```
✓ Connected to MongoDB Atlas
✓ Server running on port 3001
➜ Local: http://localhost:5173
```

#### 5. Access the Application

1. Open your browser
2. Go to: **http://localhost:5173**
3. You should see the Smart Health Booths landing page

#### 6. Create Your First Account

1. Click the **"Get Started"** or **"Sign Up"** button
2. Fill in the registration form:
   - **Name:** Your full name (required)
   - **Email:** A valid email (required)
   - **Password:** At least 6 characters (required)
   - **Confirm Password:** Same as password (required)
   - *Optional fields:* Phone, Date of Birth, Gender, Blood Group, Address
3. Click **"Sign Up"**
4. You'll be automatically logged in and redirected to your dashboard

## 🎉 You're All Set!

Now you can:
- ✅ View your personalized dashboard
- ✅ Update your profile
- ✅ Add health records
- ✅ Schedule appointments
- ✅ Track your health metrics

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
**Problem:** Connection string is incorrect or IP not whitelisted

**Solution:**
1. Double-check `.env` file has correct MongoDB URI
2. Make sure password in URI matches the one you set
3. Verify 0.0.0.0/0 is in Network Access list
4. Remove any `<` or `>` brackets from the password in the URI

### "Port 3001 is already in use"
**Problem:** Another app is using port 3001

**Solution (Windows):**
```bash
netstat -ano | findstr :3001
taskkill /PID <number> /F
```

**Solution (Mac/Linux):**
```bash
lsof -i :3001
kill -9 <PID>
```

### "Module not found" errors
**Problem:** Dependencies not installed

**Solution:**
```bash
npm install
cd server
npm install
cd ..
```

### "Login not working"
**Problem:** Backend not running or environment variables wrong

**Solution:**
1. Check terminal - should see "Connected to MongoDB Atlas"
2. Verify `.env` file exists and has all 3 variables
3. Try restarting with `npm run dev:all`

### "Blank page" or "Can't fetch data"
**Problem:** CORS or API connection issue

**Solution:**
1. Make sure `VITE_API_URL=http://localhost:3001/api` in `.env`
2. Check both frontend AND backend are running
3. Clear browser cache (Ctrl+Shift+Delete)
4. Try incognito/private browsing mode

## 📚 Additional Resources

- **Quick Start:** See `QUICKSTART.md` for rapid setup
- **Deployment:** See `DEPLOYMENT.md` for production deployment
- **Full Docs:** See `README.md` for complete documentation
- **Migration Details:** See `MIGRATION_GUIDE.md` and `MIGRATION_SUMMARY.md`

## 🎯 What's Next?

1. **Test the features:** Create health records, appointments, update profile
2. **Customize:** Modify colors, add features, personalize it
3. **Deploy:** Follow `DEPLOYMENT.md` to put it online

## ⚠️ Important Notes

- This is a **development setup** - for production, use strong JWT secrets and specific IP whitelisting
- The `.env` file is **not committed to git** - keep it secure
- Always use HTTPS in production
- Change JWT_SECRET before deploying to production

## 🆘 Still Having Issues?

1. Check all steps were followed exactly
2. Review error messages in terminal
3. Check browser console (F12) for errors
4. Make sure Node.js v18+ is installed: `node --version`
5. Try creating a completely new MongoDB cluster and start over

## ✨ Success Indicators

You know everything works when:
- ✅ Terminal shows "Connected to MongoDB Atlas"
- ✅ Browser opens to http://localhost:5173
- ✅ You can create an account
- ✅ After signup, you see your dashboard
- ✅ Your name appears in the header
- ✅ Dashboard shows your information

---

**Need help? Check the troubleshooting section or review the detailed guides!**

**Happy coding! 🚀**
