import { FETCH, PATCH } from "../constants/actionTypes";
import * as api from "../api";

export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await api.getPosts(page);
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
