import { FETCH } from "../constants/actionTypes";
import * as api from "../api";
export const createEvent = (newEvent) => async (dispatch) => {
  try {
    await api.createEvent(newEvent);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};
export const fetchEvents = (page) => async (dispatch) => {
  try {
    const { data } = await api.fetchEvents(page);
    dispatch({ type: FETCH, payload: data });
  } catch (err) {
    console.log(err);
  }
};
