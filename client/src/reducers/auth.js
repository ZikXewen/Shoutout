import { AUTH } from "../constants/actionTypes";

const initialState = JSON.parse(localStorage.getItem("user")) || null;

export default (auth = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return JSON.parse(localStorage.getItem("user")) || null;
    default:
      return auth;
  }
};
