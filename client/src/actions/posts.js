import { FETCH, PATCH } from "../constants/actionTypes";
import * as api from "../api";

export const fetchPosts = (page, sortType, filter) => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(page, sortType, filter);
    dispatch({ type: FETCH, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const createPost = (newPost) => async (dispatch) => {
  try {
    await api.createPost(newPost);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await api.likePost(postId, userId);
    dispatch({ type: PATCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const dislikePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await api.dislikePost(postId, userId);
    dispatch({ type: PATCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const countPosts = () => async (dispatch) => {
  try {
    const { data } = await api.countPosts();
    return data.count;
  } catch (error) {
    console.log(error);
  }
};
export const countComments = (postId) => async (dispatch) => {
  try {
    const { data } = await api.countComments(postId);
    return data.count;
  } catch (error) {
    console.log(error);
  }
};
export const fetchComments = (postId, page) => async (dispatch) => {
  try {
    const { data } = await api.fetchComments(postId, page);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createComment = (newComment) => async (dispatch) => {
  try {
    await api.createComment(newComment);
  } catch (error) {
    console.log(error);
  }
};
export const savePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await api.savePost(postId, userId);
    dispatch({ type: PATCH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const reportPost = (postId, userId, reportType) => async (dispatch) => {
  try {
    await api.reportPost(postId, userId, reportType);
  } catch (error) {
    console.log(error);
  }
};
