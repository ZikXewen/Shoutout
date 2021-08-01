import { Box, CircularProgress, Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../actions/events";

import Form from "./Form/Form";
import Event from "./Event/Event";
import { countEvents } from "../../api";
import useStyles from "./styles";
import { Pagination } from "@material-ui/lab";

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const events = useSelector((state) => state.posts);
  const [eventsCount, setEventsCount] = useState();
  const [curPage, setCurPage] = useState(0);
  useEffect(() => {
    countEvents().then(({ data }) => {
      setEventsCount(data.count);
      dispatch(fetchEvents(curPage, user.school));
    });
  }, [curPage]);
  return (
    <Box display="flex" flexDirection="column">
      <Form />
      {events[0] && events[0].beginTime ? (
        <Container className={classes.events} disableGutters>
          <Pagination
            count={Math.ceil(eventsCount / 10)}
            onChange={(e, v) => setCurPage(v - 1)}
          />
          {events.map((event) => (
            <Event event={event} />
          ))}
        </Container>
      ) : (
        <CircularProgress className={classes.events} />
      )}
    </Box>
  );
};
