# 🎯 Quick Start Guide - YouTube Clone

## 🏃 5-Minute Quick Start

### Terminal 1: Start MongoDB
```bash
mongod
```

### Terminal 2: Start Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

✅ Backend: `http://localhost:5000`

### Terminal 3: Start Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

✅ Frontend: `http://localhost:5173`

---

## 🎮 Try It Out

1. **Register**: Click "Create Account" on home page
2. **Login**: Enter your credentials
3. **Upload**: Click upload button to add a video
4. **Search**: Find videos using search bar
5. **Comment**: Leave comments on videos
6. **Playlist**: Create and manage playlists
7. **Subscribe**: Subscribe to channels

---

## 📁 Key Files

### Backend
- `backend/.env` - Configuration
- `backend/src/app.js` - Express app
- `backend/src/routes/` - API routes
- `backend/src/models/` - Database schemas

### Frontend
- `frontend/.env.local` - API URL config
- `frontend/src/App.jsx` - Main app component
- `frontend/src/pages/` - Page components
- `frontend/src/services/` - API calls
- `frontend/src/context/` - State management

---

## 🔑 Test Credentials

After registration, use your created account:
```
Email: your@email.com
Password: your_password
```

---

## 🚨 Troubleshooting

### MongoDB not connecting?
```bash
# Start MongoDB
mongod
# or use MongoDB Atlas connection string
```

### Port in use?
```bash
# Kill process on port 5000 (Backend)
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

### API 404 errors?
```bash
# Check VITE_API_BASE_URL in frontend/.env.local
# Should be: http://localhost:5000/api
```

---

## 📖 Full Documentation

Read `SETUP_GUIDE.md` for detailed instructions.

---

**You're all set! 🚀**
