import { EFETCH } from "../constants/actionTypes";
export default (events = [], action) => {
  switch (action.type) {
    case EFETCH:
      return action.payload;
    default:
      return events;
  }
};
