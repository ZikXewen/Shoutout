import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const countPosts = () => API.get("/posts/count");
export const getPosts = (page) => API.get(`/posts/${page}`);
export const createPost = (newPost) => API.post("/posts", newPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId, userId) =>
  API.patch(`/posts/like/${postId}/${userId}`);
export const dislikePost = (postId, userId) =>
  API.patch(`/posts/dislike/${postId}/${userId}`);

export const updateUser = (user) => API.post("/users", user);
export const getSticker = (userId, stickerName) =>
  API.patch(`/users/${userId}/${stickerName}`);

export const countEvents = () => API.get("/events/count");
export const createEvent = (event) => API.post("/events", event);
export const fetchEvents = (page) => API.get(`/events/${page}`);
