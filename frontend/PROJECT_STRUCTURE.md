# Project Structure Overview

## Full Project Layout

```
Youtube_Backend/
│
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js          # User schema
│   │   │   ├── Video.js         # Video schema
│   │   │   ├── Comment.js       # Comment schema
│   │   │   └── Playlist.js      # Playlist schema
│   │   │
│   │   ├── routes/
│   │   │   ├── users.js         # User endpoints
│   │   │   ├── videos.js        # Video endpoints
│   │   │   ├── comments.js      # Comment endpoints
│   │   │   └── playlists.js     # Playlist endpoints
│   │   │
│   │   ├── controllers/
│   │   │   ├── userController.js      # User logic
│   │   │   ├── videoController.js     # Video logic
│   │   │   ├── commentController.js   # Comment logic
│   │   │   └── playlistController.js  # Playlist logic
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT authentication
│   │   │   ├── errorHandler.js  # Error handling
│   │   │   └── upload.js        # File upload handling
│   │   │
│   │   └── app.js               # Express app setup
│   │
│   ├── .env.example             # Environment template
│   ├── .gitignore               # Git ignore rules
│   ├── package.json             # Dependencies
│   └── README.md                # Backend documentation
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx       # Top navigation
│   │   │   │   ├── Sidebar.jsx      # Side navigation
│   │   │   │   └── Footer.jsx       # Footer
│   │   │   │
│   │   │   ├── Button.jsx           # Reusable button
│   │   │   ├── Card.jsx             # Card component
│   │   │   ├── Input.jsx            # Input field
│   │   │   ├── Modal.jsx            # Modal dialog
│   │   │   ├── Toast.jsx            # Notifications
│   │   │   ├── Avatar.jsx           # User avatar
│   │   │   ├── Badge.jsx            # Badge component
│   │   │   ├── Skeleton.jsx         # Loading skeleton
│   │   │   ├── Spinner.jsx          # Loading spinner
│   │   │   └── index.js             # Component exports
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Auth state
│   │   │   ├── VideoContext.jsx     # Video state
│   │   │   └── UIContext.jsx        # UI state
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Register page
│   │   │   ├── Home.jsx             # Home page
│   │   │   ├── Upload.jsx           # Upload page
│   │   │   ├── VideoPlayer.jsx      # Video player page
│   │   │   ├── Channel.jsx          # Channel page
│   │   │   ├── Search.jsx           # Search page
│   │   │   ├── Playlists.jsx        # Playlists page
│   │   │   ├── Profile.jsx          # Profile page
│   │   │   └── index.js             # Page exports
│   │   │
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance
│   │   │   └── endpoints.js         # API endpoints
│   │   │
│   │   ├── hooks/
│   │   │   ├── useFetch.js          # Data fetching
│   │   │   ├── useRequireAuth.js    # Route protection
│   │   │   ├── useLocalStorage.js   # Local storage
│   │   │   └── useDebounce.js       # Debouncing
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css          # Global styles
│   │   │
│   │   ├── App.jsx                  # Main app component
│   │   └── main.jsx                 # React entry point
│   │
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite config
│   ├── tailwind.config.js           # Tailwind config
│   ├── postcss.config.js            # PostCSS config
│   ├── .eslintrc.json               # ESLint config
│   ├── .env.example                 # Environment template
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Dependencies
│   ├── README.md                    # Frontend documentation
│   ├── SETUP_GUIDE.md               # Detailed setup
│   ├── QUICK_START.md               # Quick start guide
│   └── PROJECT_STRUCTURE.md         # This file
│
└── .gitignore                       # Root git ignore
```

---

## Component Hierarchy

```
App
├── Router
│   ├── AuthProvider
│   │   ├── VideoProvider
│   │   │   └── UIProvider
│   │   │       ├── Header
│   │   │       ├── Sidebar
│   │   │       ├── Routes
│   │   │       │   ├── Login
│   │   │       │   ├── Register
│   │   │       │   ├── Home
│   │   │       │   │   └── Card (video grid)
│   │   │       │   ├── Upload
│   │   │       │   ├── VideoPlayer
│   │   │       │   │   └── Comments
│   │   │       │   ├── Channel
│   │   │       │   ├── Search
│   │   │       │   ├── Playlists
│   │   │       │   └── Profile
│   │   │       ├── Footer
│   │   │       └── ToastContainer
```

---

## Data Flow

### Authentication Flow
```
Register/Login Form
    ↓
AuthContext (login function)
    ↓
API Call (axios)
    ↓
Backend Verification
    ↓
Token Response
    ↓
Store in localStorage
    ↓
Update AuthContext state
    ↓
Redirect to Home
```

### Video Upload Flow
```
Upload Form (FormData)
    ↓
validation
    ↓
API Call with multipart/form-data
    ↓
Backend Processing
    ↓
File Storage
    ↓
Database Record
    ↓
Success Response
    ↓
Toast Notification
    ↓
Redirect
```

### Video Display Flow
```
Home Page Loads
    ↓
useEffect Hook
    ↓
API Call (videoAPI.getAllVideos)
    ↓
Display Skeleton Loaders
    ↓
Data Response
    ↓
Render Video Cards
    ↓
Click to Watch
    ↓
Navigate to VideoPlayer
```

---

## File Naming Conventions

### Components
- **PascalCase**: `VideoCard.jsx`, `Header.jsx`
- Folder for layout: `layout/Header.jsx`

### Pages
- **PascalCase**: `Home.jsx`, `VideoPlayer.jsx`
- Always in `pages/` folder

### Hooks
- **camelCase** with `use` prefix: `useFetch.js`, `useAuth.js`
- Always in `hooks/` folder

### Context
- **PascalCase** with `Context` suffix: `AuthContext.jsx`
- Always in `context/` folder

### Services
- **camelCase**: `api.js`, `endpoints.js`
- Always in `services/` folder

---

## Key Technologies

### Backend
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Context API** - State management
- **Vite** - Build tool

---

## Available Routes

### Public Routes
- `/` - Home page
- `/login` - Login page
- `/register` - Register page
- `/video/:videoId` - Video player
- `/channel/:channelId` - Channel page
- `/search` - Search page
- `/trending` - Trending videos

### Protected Routes
- `/upload` - Video upload
- `/playlists` - User playlists
- `/profile` - User profile
- `/subscriptions` - Subscribed channels

---

## State Management

### AuthContext
```javascript
{
  user: Object,
  token: String,
  isAuthenticated: Boolean,
  loading: Boolean,
  error: String,
  login(email, password): Promise,
  register(username, email, password, fullName): Promise,
  logout(): void,
  updateProfile(data): Promise
}
```

### VideoContext
```javascript
{
  videos: Array,
  selectedVideo: Object,
  filters: Object,
  updateFilters(filters): void
}
```

### UIContext
```javascript
{
  sidebarOpen: Boolean,
  notifications: Array,
  toggleSidebar(): void,
  addNotification(message, type): void,
  removeNotification(id): void
}
```

---

## API Endpoints Summary

### Users
- `POST /api/users/register` - Register
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Get profile
- `PATCH /api/users/profile` - Update profile

### Videos
- `GET /api/videos` - Get all
- `GET /api/videos/:id` - Get single
- `POST /api/videos/upload` - Upload
- `PATCH /api/videos/:id` - Update
- `DELETE /api/videos/:id` - Delete
- `GET /api/videos/search` - Search

### Comments
- `GET /api/videos/:videoId/comments` - Get comments
- `POST /api/videos/:videoId/comments` - Add comment
- `PATCH /api/comments/:id` - Update
- `DELETE /api/comments/:id` - Delete

### Playlists
- `GET /api/playlists` - Get all
- `POST /api/playlists` - Create
- `PATCH /api/playlists/:id` - Update
- `DELETE /api/playlists/:id` - Delete
- `POST /api/playlists/:id/videos/:videoId` - Add video

### Channels
- `GET /api/channels/:id` - Get channel
- `PATCH /api/channels/:id` - Update
- `POST /api/channels/:id/subscribe` - Subscribe
- `GET /api/channels/:id/videos` - Get videos

---

## Development Workflow

### Adding a New Feature

1. **Backend**
   - Create model if needed
   - Add route
   - Create controller
   - Test with Postman

2. **Frontend**
   - Add API endpoint to `services/endpoints.js`
   - Create page component
   - Add route in `App.jsx`
   - Create context if needed

3. **Testing**
   - Test in browser
   - Check console for errors
   - Verify API calls

---

## Next Steps

1. ✅ Follow `QUICK_START.md` to run locally
2. ✅ Read `SETUP_GUIDE.md` for detailed setup
3. ✅ Check backend README for API docs
4. ✅ Customize colors in `tailwind.config.js`
5. ✅ Add your features
6. ✅ Deploy to production

---

**Happy coding! 🚀**
