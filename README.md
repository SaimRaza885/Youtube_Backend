# YouTube Clone - MERN Stack

A full-stack video streaming platform built with the MERN stack (MongoDB, Express, React, Node.js). Features user authentication, video upload and streaming, comments, likes, playlists, subscriptions, and channel management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
- [Frontend Pages & Routes](#frontend-pages--routes)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Backend (API)
- User registration & login with JWT-based authentication
- Video upload with Cloudinary cloud storage
- Video streaming with view count tracking
- Comment system with CRUD operations
- Like/Unlike for videos, comments, and tweets
- Playlist creation and management
- Channel subscription system
- Tweets/community posts
- Channel dashboard with analytics (views, subscribers, likes)
- Pagination, sorting, and filtering for videos

### Frontend (React SPA)
- User registration and login with JWT tokens
- Video browsing, searching, and streaming
- Video upload with thumbnail support
- Like/Unlike and commenting on videos
- Channel pages with subscriber management
- Playlist creation and video organization
- Tweets/community posts on channels
- Watch history tracking
- Responsive design with dark theme
- Toast notifications and loading skeletons

---

## Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB + Mongoose | Database & ODM |
| Cloudinary | Media storage |
| JSON Web Tokens | Authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |

### Frontend

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| Axios | HTTP client |
| Context API | State management |
| Lucide React | Icon library |

---

## Architecture

```
Youtube_Backend/
├── backend/          # Express REST API server (port 8000)
│   ├── src/
│   │   ├── controllers/    # Route handlers / business logic
│   │   ├── db/             # MongoDB connection
│   │   ├── middleware/     # Auth & file upload middleware
│   │   ├── models/         # Mongoose schemas (User, Video, Comment, etc.)
│   │   ├── routes/         # Express route definitions
│   │   ├── utils/          # Helpers (API response, error handling)
│   │   ├── app.js          # Express app configuration
│   │   └── index.js        # Server entry point
│   ├── .env.example
│   └── package.json
├── frontend/         # React SPA (port 5173)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth, Video, UI contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Route page components
│   │   ├── services/       # Axios API client
│   │   ├── utils/          # Utility functions
│   │   ├── App.jsx         # Root app with routing
│   │   └── main.jsx        # Entry point
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local or Atlas connection string)
- **Cloudinary** account (for media uploads)

### Backend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SaimRaza885/Youtube_Backend.git
   cd Youtube_Backend/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Copy `.env.example` to `.env` and fill in your values:
   ```env
   PORT=8000
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net
   CORS_ORIGIN=http://localhost:5173
   JWT_ACCESS_TOKEN_SECRET=<your-secret>
   JWT_ACCESS_TOKEN_EXPIRY=1d
   JWT_REFRESH_TOKEN_SECRET=<your-secret>
   JWT_REFRESH_TOKEN_EXPIRY=7d
   CLOUDINARY_CLOUD_NAME=<your-cloud-name>
   CLOUDINARY_API_KEY=<your-api-key>
   CLOUDINARY_API_SECRET=<your-api-secret>
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The API will run at `http://localhost:8000`.

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env.local` file:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1
   VITE_API_TIMEOUT=10000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## API Overview

All API routes are prefixed with `/api/v1`.

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/healthcheck` | Health status |

### Users
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/users/register` | No | Register new user |
| POST | `/users/login` | No | Login |
| POST | `/users/logout` | JWT | Logout |
| POST | `/users/refresh-token` | No | Refresh tokens |
| POST | `/users/change-password` | JWT | Change password |
| GET | `/users/current-user` | JWT | Get current user |
| PATCH | `/users/update-account` | JWT | Update profile |
| PATCH | `/users/avatar` | JWT | Update avatar |
| PATCH | `/users/cover-image` | JWT | Update cover image |
| GET | `/users/c/:username` | No | Get channel profile |
| GET | `/users/history` | JWT | Watch history |

### Videos
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/videos` | No | List videos (paginated, filterable) |
| POST | `/videos` | JWT | Publish a video |
| GET | `/videos/:id` | No | Get video details |
| DELETE | `/videos/:id` | JWT | Delete video (owner) |
| PATCH | `/videos/:id` | JWT | Update video metadata |
| PATCH | `/videos/toggle/publish/:id` | JWT | Toggle publish status |
| PATCH | `/videos/views/:id` | No | Increment view count |

### Comments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/comments/:videoId` | No | Get comments for a video |
| POST | `/comments/:videoId` | JWT | Add comment |
| DELETE | `/comments/c/:commentId` | JWT | Delete comment (owner) |
| PATCH | `/comments/c/:commentId` | JWT | Update comment (owner) |

### Likes
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/likes/toggle/v/:videoId` | JWT | Toggle video like |
| POST | `/likes/toggle/c/:commentId` | JWT | Toggle comment like |
| POST | `/likes/toggle/t/:tweetId` | JWT | Toggle tweet like |
| GET | `/likes/videos` | JWT | Liked videos |

### Tweets
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/tweets` | JWT | Create tweet |
| GET | `/tweets/user/:userId` | JWT | Get user's tweets |
| PATCH | `/tweets/:tweetId` | JWT | Update tweet (owner) |
| DELETE | `/tweets/:tweetId` | JWT | Delete tweet (owner) |

### Playlists
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/playlist` | JWT | Create playlist |
| GET | `/playlist/:playlistId` | JWT | Get playlist |
| PATCH | `/playlist/:playlistId` | JWT | Update playlist (owner) |
| DELETE | `/playlist/:playlistId` | JWT | Delete playlist (owner) |
| PATCH | `/playlist/add/:videoId/:playlistId` | JWT | Add video to playlist |
| PATCH | `/playlist/remove/:videoId/:playlistId` | JWT | Remove video from playlist |
| GET | `/playlist/user/:userId` | JWT | Get user's playlists |

### Subscriptions
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/subscriptions/c/:channelId` | JWT | Get channel subscribers |
| POST | `/subscriptions/c/:channelId` | JWT | Toggle subscription |
| GET | `/subscriptions/u/:subscriberId` | JWT | Get subscribed channels |

### Dashboard
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/stats` | JWT | Channel statistics |
| GET | `/dashboard/videos` | JWT | Channel owner's videos |

---

## Frontend Pages & Routes

| Path | Page | Auth Required |
|---|---|---|
| `/` | Home (video grid) | No |
| `/login` | Login | No |
| `/register` | Register | No |
| `/video/:videoId` | Video Player | No |
| `/channel/:username` | Channel | No |
| `/search` | Search Results | No |
| `/upload` | Upload Video | Yes |
| `/playlists` | Playlists | Yes |
| `/profile` | Profile | Yes |
| `/subscriptions` | Subscriptions | Yes |
| `/history` | Watch History | Yes |

---

## Project Structure

```
Youtube_Backend/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── user.controllers.js
│   │   │   ├── video.controllers.js
│   │   │   ├── comment.controllers.js
│   │   │   ├── like.controllers.js
│   │   │   ├── tweet.controllers.js
│   │   │   ├── playlist.controllers.js
│   │   │   ├── subscription.controllers.js
│   │   │   ├── dashboard.controllers.js
│   │   │   └── healthcheck.controllers.js
│   │   ├── db/
│   │   │   └── index.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── multer.middleware.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── video.model.js
│   │   │   ├── comment.model.js
│   │   │   ├── like.model.js
│   │   │   ├── tweet.model.js
│   │   │   ├── playlist.model.js
│   │   │   └── subscription.model.js
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── index.js
│   │   └── constants.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── video/
│   │   │   ├── comments/
│   │   │   └── common/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── tokens/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## Available Scripts

### Backend

| Script | Command | Description |
|---|---|---|
| `dev` | `nodemon src/index.js` | Start dev server with auto-reload |

### Frontend

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start Vite dev server |
| `build` | `vite build` | Build for production |
| `preview` | `vite preview` | Preview production build |
| `lint` | `eslint src` | Run ESLint |

---

## Deployment

### Backend

Deploy the `backend/` directory to services like:
- **Render** (Web Service)
- **Railway**
- **Heroku**
- **VPS** (DigitalOcean, AWS EC2)

Ensure environment variables are configured on the hosting platform.

### Frontend

Deploy the `frontend/` directory to services like:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**

Build command: `npm run build` (outputs to `dist/`). Set `VITE_API_BASE_URL` to your deployed backend URL.

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source. The backend is licensed under ISC, and the frontend is available under the MIT License.

---

## Author

**Saim Raza**

Project Repository: [https://github.com/SaimRaza885/Youtube_Backend](https://github.com/SaimRaza885/Youtube_Backend)
