import { LOGIN, LOGOUT, STICKER } from "../constants/actionTypes";
import * as api from "../api";

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(user.profile);
    data.token = user.token;
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: LOGIN, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.log(error);
  }
};
export const getSticker = (userId, stickerName) => async (dispatch) => {
  try {
    const { data } = await api.getSticker(userId, stickerName);
    localStorage.getItem("user");
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({ type: STICKER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
