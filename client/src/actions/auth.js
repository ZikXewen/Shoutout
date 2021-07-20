import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const login = (user) => async (dispatch) => {
  try {
    const { googleId, imageUrl, name } = user.profile;
    const { data } = await api.updateUser({ googleId, imageUrl, name });
    data.token = user.token;
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: AUTH });
  } catch (error) {
    console.log(error);
  }
};
export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: AUTH });
  } catch (error) {
    console.log(error);
  }
};
export const getSticker = (userId, stickerName) => async (dispatch) => {
  try {
    const { data } = await api.getSticker(userId, stickerName);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: AUTH });
  } catch (error) {
    console.log(error);
  }
};
export const setSchool = (userId, school) => async (dispatch) => {
  try {
    const { data } = await api.setSchool(userId, school);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: AUTH });
  } catch (error) {
    console.log(error);
  }
};
