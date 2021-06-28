import { LOGIN, LOGOUT } from "../constants/actionTypes";

export const login = (user) => async (dispatch) => {
  try {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: LOGIN, payload: user });
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
