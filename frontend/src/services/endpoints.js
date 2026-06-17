import api from './api'

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.patch('/users/profile', data),
  logout: () => api.post('/users/logout'),
}

// Video APIs
export const videoAPI = {
  getAllVideos: (params) => api.get('/videos/', { params }),
  getVideoById: (id) => api.get(`/videos/${id}`),
  uploadVideo: (formData) => api.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  updateVideo: (id, data) => api.patch(`/videos/${id}`, data),
  deleteVideo: (id) => api.delete(`/videos/${id}`),
  searchVideos: (query) => api.get('/videos/search', { params: { q: query } }),
  getVideosByChannel: (channelId) => api.get(`/channels/${channelId}/videos`),
}

// Comment APIs
export const commentAPI = {
  getComments: (videoId, params) => api.get(`/videos/${videoId}/comments`, { params }),
  addComment: (videoId, data) => api.post(`/videos/${videoId}/comments`, data),
  updateComment: (commentId, data) => api.patch(`/comments/${commentId}`, data),
  deleteComment: (commentId) => api.delete(`/comments/${commentId}`),
}

// Like APIs
export const likeAPI = {
  likeVideo: (videoId) => api.post(`/videos/${videoId}/like`),
  unlikeVideo: (videoId) => api.post(`/videos/${videoId}/unlike`),
  likeComment: (commentId) => api.post(`/comments/${commentId}/like`),
  unlikeComment: (commentId) => api.post(`/comments/${commentId}/unlike`),
}

// Playlist APIs
export const playlistAPI = {
  getAllPlaylists: () => api.get('/playlists'),
  getPlaylistById: (id) => api.get(`/playlists/${id}`),
  createPlaylist: (data) => api.post('/playlists', data),
  updatePlaylist: (id, data) => api.patch(`/playlists/${id}`, data),
  deletePlaylist: (id) => api.delete(`/playlists/${id}`),
  addVideoToPlaylist: (playlistId, videoId) => api.post(`/playlists/${playlistId}/videos/${videoId}`),
  removeVideoFromPlaylist: (playlistId, videoId) => api.delete(`/playlists/${playlistId}/videos/${videoId}`),
}

// Channel APIs
export const channelAPI = {
  getChannelById: (id) => api.get(`/channels/${id}`),
  updateChannel: (id, data) => api.patch(`/channels/${id}`, data),
  subscribeChannel: (id) => api.post(`/channels/${id}/subscribe`),
  unsubscribeChannel: (id) => api.post(`/channels/${id}/unsubscribe`),
  getSubscribers: (id, params) => api.get(`/channels/${id}/subscribers`, { params }),
  getSubscriptions: (params) => api.get('/channels/subscriptions', { params }),
}

// Search API
export const searchAPI = {
  search: (query, params) => api.get('/search', { params: { q: query, ...params } }),
}
