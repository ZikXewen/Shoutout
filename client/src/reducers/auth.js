import { LOGIN, LOGOUT } from "../constants/actionTypes";

const initialState = JSON.parse(localStorage.getItem("user")) || null;

export default (auth = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return null;
    default:
      return auth;
  }
};
