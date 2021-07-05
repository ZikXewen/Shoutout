import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);

export const updateUser = (user) => API.post("/users", user);
export const getSticker = (userId, stickerName) =>
  API.patch(`/users/${userId}/${stickerName}`);
