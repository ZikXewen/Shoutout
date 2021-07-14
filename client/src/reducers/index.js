import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import events from "./events";
export const reducers = combineReducers({ posts, auth, events });
