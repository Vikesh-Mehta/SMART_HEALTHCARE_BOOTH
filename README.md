# Smart Health Booths 🏥

AI-integrated self-service healthcare solution for rural communities, providing 24/7 medical assistance without requiring a full hospital.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with MongoDB Atlas
- **Health Dashboard**: Real-time health metrics and monitoring
- **Virtual Consultations**: Connect with doctors remotely
- **Health Checkups**: Record and track vital health metrics
- **Medicine Advisor**: AI-powered medication guidance
- **Profile Management**: Complete user profile and medical history
- **Appointment System**: Schedule and manage virtual consultations

## 🛠️ Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development
- TailwindCSS + Shadcn/ui components
- React Router for navigation
- Axios for API calls

### Backend
- Node.js + Express
- MongoDB Atlas (Cloud Database)
- JWT authentication
- bcryptjs for password hashing

## 📋 Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (free tier)
- Git

## 🔧 Local Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Smart_Health_Booths
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster (free M0 tier)
3. Create database user:
   - Database Access → Add New Database User
   - Choose password authentication
4. Whitelist IP:
   - Network Access → Add IP Address → `0.0.0.0/0` (for development)
5. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the connection string

### 4. Environment Configuration

Create `.env` file in root directory:

```env
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
VITE_JWT_SECRET=your_super_secret_jwt_key_min_32_characters
VITE_API_URL=http://localhost:3001/api
```

Replace `username`, `password`, and `cluster` with your MongoDB Atlas credentials.

### 5. Run the Application

```bash
npm run dev:all
```

Access at:
- Frontend: http://localhost:8080
- Backend: http://localhost:3001

## 🚀 Deployment Guide

### Prerequisites
- GitHub account
- Vercel account (for frontend)
- Render/Railway account (for backend)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/yourusername/smart-health-booths.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy Backend (Render)

1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `smart-health-booths-api`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   VITE_MONGODB_URI=<your-mongodb-connection-string>
   VITE_JWT_SECRET=<your-secret-key>
   PORT=3001
   ```

6. Click "Create Web Service"
7. Copy the deployed URL (e.g., `https://smart-health-booths-api.onrender.com`)

### Step 3: Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
   ```
   VITE_MONGODB_URI=<your-mongodb-connection-string>
   VITE_JWT_SECRET=<your-secret-key>
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   (Replace with your Render backend URL from Step 2)

6. Click "Deploy"
7. Your app will be live at `https://your-project.vercel.app`

### Alternative: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add environment variables (same as Render)
5. Railway will auto-detect and deploy

### Important Notes

- ⚠️ Update `VITE_API_URL` in Vercel with your actual backend URL
- ⚠️ Never commit `.env` file to GitHub (already in .gitignore)
- ⚠️ Use strong secrets for production `VITE_JWT_SECRET`
- ⚠️ Update MongoDB IP whitelist for production (remove 0.0.0.0/0, add specific IPs)

## 📁 Project Structure

```
Smart_Health_Booths/
├── src/                    # Frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── contexts/         # Auth context
│   └── services/         # API services
├── server/               # Backend source
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   └── index.js        # Server entry
├── public/             # Static assets
└── .env               # Environment variables
```

## 🔌 API Endpoints

**Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/verify`  
**User**: `/api/user/profile`, `/api/user/appointments`  
**Health**: `/api/health/records`, `/api/health/metrics/latest`

## 🔒 Security

- JWT authentication
- bcrypt password hashing
- Protected API routes
- CORS configuration
- Environment variable protection

## 📝 Scripts

```bash
npm run dev              # Frontend only
npm run dev:server       # Backend only
npm run dev:all         # Both (recommended)
npm run build           # Production build
```

## 🐛 Troubleshooting

**MongoDB Connection Error**: Check connection string and IP whitelist  
**CORS Error**: Verify backend CORS allows frontend URL  
**Port in use**: Change PORT in .env or kill process

## 📄 License

MIT License

---

**Built with ❤️ for accessible rural healthcare**
