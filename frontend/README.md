# YouTube Clone - Frontend

A fully functional YouTube clone built with React 18, Vite, Tailwind CSS, and Context API. This frontend connects to a Node.js/Express backend API.

## 🚀 Features

### User Authentication
- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Protected routes for authenticated users
- ✅ Auto logout on token expiration
- ✅ Profile management

### Video Management
- ✅ Browse and search videos
- ✅ Upload videos with thumbnails
- ✅ Video player with controls
- ✅ View video details (title, description, views)
- ✅ Like/Unlike videos
- ✅ Comments on videos

### Channel & Playlists
- ✅ View channel information
- ✅ Channel videos grid
- ✅ Subscribe/Unsubscribe to channels
- ✅ Create and manage playlists
- ✅ Add videos to playlists

### UI/UX
- ✅ Dark theme with accent colors
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Toast notifications
- ✅ Loading skeletons
- ✅ Error handling
- ✅ Smooth animations and transitions

## 📋 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | React 18 |
| **Build Tool** | Vite |
| **Routing** | React Router v6 |
| **State Management** | Context API |
| **Styling** | Tailwind CSS |
| **HTTP Client** | Axios |
| **Forms** | React Hooks |
| **Package Manager** | NPM/Yarn |

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Avatar.jsx
│   │   ├── Badge.jsx
│   │   ├── Skeleton.jsx
│   │   ├── Spinner.jsx
│   │   └── index.js
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── VideoContext.jsx
│   │   └── UIContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Upload.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── Channel.jsx
│   │   ├── Search.jsx
│   │   ├── Playlists.jsx
│   │   ├── Profile.jsx
│   │   └── index.js
│   ├── services/
│   │   ├── api.js (Axios instance with interceptors)
│   │   └── endpoints.js (API endpoints)
│   ├── hooks/
│   │   ├── useFetch.js
│   │   ├── useRequireAuth.js
│   │   ├── useLocalStorage.js
│   │   └── useDebounce.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .gitignore
└── package.json
```

## 🛠 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend API running (see backend setup)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Environment Setup

Create a `.env.local` file in the frontend directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000
```

**Environment Variables:**
- `VITE_API_BASE_URL`: Backend API URL (default: http://localhost:5000/api)
- `VITE_API_TIMEOUT`: HTTP request timeout in milliseconds (default: 10000)

### Step 4: Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🔑 Key Features Explained

### Context API State Management

**AuthContext**
- Manages user authentication state
- Handles login/register/logout
- Stores JWT tokens in localStorage
- Auto-redirects to login on token expiration

```javascript
const { user, token, isAuthenticated, login, register, logout } = useAuth()
```

**VideoContext**
- Manages global video state
- Handles video filtering and sorting
- Stores selected video

```javascript
const { videos, selectedVideo, filters, updateFilters } = useVideo()
```

**UIContext**
- Manages UI state (sidebar, notifications)
- Toast notification system
- Dark/Light mode toggle

```javascript
const { sidebarOpen, toggleSidebar, addNotification } = useUI()
```

### Custom Hooks

**useFetch** - Simplified data fetching
```javascript
const { data, loading, error, execute } = useFetch()
```

**useRequireAuth** - Route protection
```javascript
const { isAuthenticated, loading } = useRequireAuth()
```

**useLocalStorage** - Browser storage
```javascript
const [value, setValue] = useLocalStorage('key', initialValue)
```

**useDebounce** - Debounced search
```javascript
const debouncedValue = useDebounce(searchInput, 500)
```

### API Service

Centralized API configuration with Axios:

```javascript
// Automatic token injection
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto logout on 401
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

## 🎨 Styling

### Tailwind CSS Configuration

Custom theme colors defined in `tailwind.config.js`:

```javascript
colors: {
  primary: '#0f0f0f',      // Main background
  secondary: '#212121',    // Cards, modals
  tertiary: '#2f2f2f',     // Hover states
  accent: '#dc2626',       // Primary action
  'text-primary': '#ffffff',
  'text-secondary': '#aaaaaa',
}
```

### Responsive Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect Repository**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add `VITE_API_BASE_URL` pointing to your backend API

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Deploy to Netlify

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Connect Repository**
   - Go to netlify.com and connect your GitHub
   - Select this repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add `VITE_API_BASE_URL=<backend-url>`

### Deploy to GitHub Pages

1. **Update vite.config.js**
   ```javascript
   export default {
     base: '/Youtube_Backend/',
     // ... rest of config
   }
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   git add dist
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

## 🔄 Connecting to Backend

### Backend Requirements

The backend API should provide these endpoints:

**Authentication**
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PATCH /api/users/profile` - Update profile

**Videos**
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get video details
- `POST /api/videos/upload` - Upload video
- `PATCH /api/videos/:id` - Update video
- `DELETE /api/videos/:id` - Delete video
- `GET /api/videos/search` - Search videos

**Comments**
- `GET /api/videos/:videoId/comments` - Get comments
- `POST /api/videos/:videoId/comments` - Add comment
- `PATCH /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

**Channels & Playlists**
- `GET /api/channels/:id` - Get channel info
- `GET /api/channels/:id/videos` - Get channel videos
- `POST /api/channels/:id/subscribe` - Subscribe
- `GET /api/playlists` - Get playlists
- `POST /api/playlists` - Create playlist
- `POST /api/playlists/:id/videos/:videoId` - Add to playlist

### Backend Setup

Refer to the backend repository for complete setup instructions.

## 🐛 Troubleshooting

### Issue: CORS Error
**Solution**: Make sure backend has CORS enabled:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
```

### Issue: API calls failing
**Solution**: Check `.env.local` for correct `VITE_API_BASE_URL`

### Issue: Token not persisting
**Solution**: Verify localStorage is enabled in browser

### Issue: Images/videos not loading
**Solution**: Check file upload paths in backend configuration

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [Your Name]

## 📞 Support

For support, email your@email.com or open an issue on GitHub.

---

**Happy Coding! 🎉**
