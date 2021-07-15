import { Box, CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../actions/events";

import Form from "./Form/Form";
import Event from "./Event/Event";

export default () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchEvents(0));
  }, []);
  return (
    <Box display="flex" flexDirection="column">
      <Form />
      {events[0] && events[0].beginTime ? (
        events.map((event) => <Event event={event} />)
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};
