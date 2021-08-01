import axios from "axios";
const API = axios.create({ baseURL: "https://shoutoutofficial.herokuapp.com" });

export const countPosts = () => API.get("/posts/count");
export const fetchPosts = (page, sortType, filter) =>
  API.post(`/posts/fetch/${sortType}/${page}`, filter);
export const createPost = (newPost) => API.post("/posts", newPost);
export const deletePost = (postId) => API.delete(`/posts/${postId}`);
export const likePost = (postId, userId) =>
  API.patch(`/posts/like/${postId}/${userId}`);
export const dislikePost = (postId, userId) =>
  API.patch(`/posts/dislike/${postId}/${userId}`);
export const countComments = (postId) =>
  API.get(`/posts/${postId}/comments/count`);
export const fetchComments = (postId, page) =>
  API.get(`/posts/${postId}/comments/${page}`);
export const createComment = (newComment) =>
  API.post(`/posts/${newComment.postId}/comments`, newComment);
export const savePost = (postId, userId) =>
  API.post(`/posts/save/${postId}/${userId}`);

export const updateUser = (user) => API.post("/users", user);
export const getSticker = (userId, stickerName) =>
  API.patch(`/users/${userId}/${stickerName}`);
export const setSchool = (userId, school) =>
  API.patch(`/users/school/${userId}/${school}`);

export const countEvents = () => API.get("/events/count");
export const createEvent = (event) => API.post("/events", event);
export const fetchEvents = (page, school) =>
  API.get(`/events/${school}/${page}`);
export const countEventComments = (eventId) =>
  API.get(`/events/${eventId}/comments/count`);
export const fetchEventComments = (eventId, page) =>
  API.get(`/events/${eventId}/comments/${page}`);
export const createEventComment = (newComment) =>
  API.post(`/events/${newComment.eventId}/comments`, newComment);
