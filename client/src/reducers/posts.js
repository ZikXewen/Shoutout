import { CREATE, DELETE, FETCH_ALL } from "../constants/actionTypes";
export default (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case "CLEAR":
      return [];
    default:
      return posts;
  }
};
