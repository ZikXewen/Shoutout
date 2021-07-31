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
export const fetchEvents = (page, school) => async (dispatch) => {
  try {
    const { data } = await api.fetchEvents(page, school);
    dispatch({ type: FETCH, payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const countComments = (eventId) => async (dispatch) => {
  try {
    const { data } = await api.countEventComments(eventId);
    return data.count;
  } catch (error) {
    console.log(error);
  }
};
export const fetchComments = (eventId, page) => async (dispatch) => {
  try {
    const { data } = await api.fetchEventComments(eventId, page);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const createComment = (newComment) => async (dispatch) => {
  try {
    const { data } = await api.createEventComment(newComment);
  } catch (error) {
    console.log(error);
  }
};
