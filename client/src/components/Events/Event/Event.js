import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import moment from "moment";

export default ({ event }) => {
  return (
    <Card>
      <CardMedia component="img" src={event.banner} />
      <CardContent>
        <Typography>{event.title}</Typography>
        <Typography>{event.description}</Typography>
        <Typography>
          {moment(event.beginTime).format("MMMM Do YYYY, h:mm a")}
        </Typography>
        <Typography>
          {event.endTime &&
            moment(event.endTime).format("MMMM Do YYYY, h:mm a")}
        </Typography>
      </CardContent>
    </Card>
  );
};
