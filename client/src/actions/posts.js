import { FETCH_ALL, CREATE, DELETE } from "../constants/actionTypes";
import * as api from "../api";
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.getPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const deletePost = (postId) => async (dispatch) => {
  try {
    await api.deletePost(postId);
    dispatch({ type: DELETE, payload: postId });
  } catch (error) {
    console.log(error);
  }
};
