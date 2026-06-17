# 🚀 YouTube Clone - Complete Setup Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js 16+** - Download from [nodejs.org](https://nodejs.org)
- **npm or yarn** - Comes with Node.js
- **Git** - Download from [git-scm.com](https://git-scm.com)
- **MongoDB** - Local or cloud instance (MongoDB Atlas)
- **Postman** (optional) - For testing API endpoints

## ⚡ Quick Start (5 Minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/SaimRaza885/Youtube_Backend.git
cd Youtube_Backend
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/youtube
# JWT_SECRET=your_secret_key
# PORT=5000

# Start the server
npm run dev
```

Backend will run on: `http://localhost:5000`

### 3. Frontend Setup

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 📋 Detailed Setup Instructions

### Backend Setup (Complete)

#### Step 1: Database Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB Community Edition
# Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
# Mac: brew install mongodb-community
# Linux: Follow official guide

# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/youtube`

#### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

**Dependencies installed:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `multer` - File uploads
- `cors` - Cross-origin requests
- `morgan` - Request logging
- `nodemon` - Auto-reload (dev)

#### Step 3: Environment Configuration

Create `.env` file in backend directory:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/youtube
# OR for Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/youtube

# JWT
JWT_SECRET=your_super_secret_key_12345
JWT_EXPIRE=7d

# File Upload
MAX_FILE_SIZE=500000000
UPLOAD_DIR=./uploads

# CORS
CORS_ORIGIN=http://localhost:5173

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

#### Step 4: Start Backend

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

✅ Backend running on `http://localhost:5000`

---

### Frontend Setup (Complete)

#### Step 1: Install Frontend Dependencies

```bash
cd frontend
npm install
```

**Key Dependencies:**
- `react` - UI library
- `react-router-dom` - Routing
- `axios` - HTTP client
- `tailwindcss` - Styling

#### Step 2: Environment Configuration

Create `.env.local` file in frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
```

#### Step 3: Start Frontend Development Server

```bash
npm run dev
```

✅ Frontend running on `http://localhost:5173`

---

## 🧪 Testing the Application

### 1. Test User Registration

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User"
  }'
```

### 2. Test User Login

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Use Browser

Open `http://localhost:5173` and:
1. Register a new account
2. Login
3. Upload a video
4. Search for videos
5. Add comments
6. Create playlists

---

## 📦 Project Structure

### Backend Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Video.js
│   │   ├── Comment.js
│   │   └── Playlist.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── videos.js
│   │   ├── comments.js
│   │   └── playlists.js
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── videoController.js
│   │   ├── commentController.js
│   │   └── playlistController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── upload.js
│   └── app.js
├── .env.example
├── .gitignore
└── package.json
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── UI components
│   │   └── index.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── VideoContext.jsx
│   │   └── UIContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   └── ...
│   ├── services/
│   │   ├── api.js
│   │   └── endpoints.js
│   ├── hooks/
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── .env.example
└── package.json
```

---

## 🐛 Common Issues & Solutions

### Backend Issues

#### ❌ MongoDB Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Start MongoDB service: `mongod`
- Or use MongoDB Atlas with correct connection string

#### ❌ Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Kill process on port 5000
# Windows:
taskkill /PID <PID> /F
# Mac/Linux:
kill -9 <PID>

# Or use different port
PORT=5001 npm run dev
```

#### ❌ JWT Token Errors
```
Error: Invalid token
```
**Solution:**
- Check JWT_SECRET is set in .env
- Ensure token is included in Authorization header

### Frontend Issues

#### ❌ CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Ensure backend CORS is configured correctly
- Check VITE_API_BASE_URL in .env.local

#### ❌ API Not Found
```
VITE_API_BASE_URL is not configured
```
**Solution:**
- Create .env.local file
- Add: `VITE_API_BASE_URL=http://localhost:5000/api`

#### ❌ Videos Not Loading
```
404 Not Found
```
**Solution:**
- Ensure backend is running
- Check MongoDB is connected
- Verify videos exist in database

---

## 🚀 Deployment Guide

### Deploy Backend to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Deploy Frontend to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel

# Set environment variables in Vercel dashboard
# VITE_API_BASE_URL=https://your-backend.herokuapp.com/api
```

### Deploy to Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/users/register
Body: { username, email, password, fullName }
Response: { user, token }
```

#### Login
```
POST /api/users/login
Body: { email, password }
Response: { user, token }
```

#### Get Profile
```
GET /api/users/profile
Headers: { Authorization: Bearer <token> }
Response: { user }
```

### Video Endpoints

#### Get All Videos
```
GET /api/videos?limit=12&sort=-createdAt
Response: { data: [videos] }
```

#### Upload Video
```
POST /api/videos/upload
Headers: { Authorization: Bearer <token> }
Body: FormData { title, description, videoFile, thumbnail }
Response: { video }
```

#### Get Video Details
```
GET /api/videos/:videoId
Response: { video }
```

---

## 🔧 Development Tips

### Enable Debug Logging

**Backend:**
```bash
DEBUG=* npm run dev
```

**Frontend:**
Open DevTools (F12) and check Console tab

### Use Postman for API Testing

1. Import API collection
2. Set authentication token
3. Test endpoints
4. View response data

### Database Management

```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use YouTube database
use youtube

# View collections
show collections

# Query users
db.users.find()

# Query videos
db.videos.find()
```

---

## 📞 Support & Help

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check README.md files
- **Email**: your@email.com
- **Discord**: Join our community server

---

## ✅ Checklist Before Production

- [ ] Update all environment variables
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Test all features
- [ ] Check security headers
- [ ] Optimize images and videos

---

**Happy coding! 🎉**
