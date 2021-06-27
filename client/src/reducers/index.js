import { combineReducers } from "redux";
import posts from "./posts";
import user from "./auth";
export const reducers = combineReducers({ posts, user });
