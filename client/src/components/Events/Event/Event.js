import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Image from "material-ui-image";
import moment from "moment";

import useStyles from "./styles";

export default ({ event }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} lg={7}>
          <Image src={event.banner} aspectRatio={10 / 4} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <CardContent>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Avatar src={event.creatorImageUrl} className={classes.avatar} />
              <Typography>{event.creatorName}</Typography>
              {event.school && <Typography>@{event.school}</Typography>}
            </Box>
            <Typography variant="h6">{event.title}</Typography>
            <Typography className={classes.multiline}>
              {event.description}
            </Typography>
            <Typography>
              {moment(event.beginTime).format("MMMM Do YYYY, h:mm a")}
            </Typography>
            <Typography>
              {event.endTime &&
                moment(event.endTime).format("MMMM Do YYYY, h:mm a")}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
