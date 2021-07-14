import { FETCH, PATCH } from "../constants/actionTypes";
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH:
      return action.payload;
    case PATCH:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
