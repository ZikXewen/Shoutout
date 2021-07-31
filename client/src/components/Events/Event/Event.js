import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  Typography,
} from "@material-ui/core";
import Image from "material-ui-image";
import moment from "moment";
import { useState } from "react";
import Comment from "./Comment/Comment";

import useStyles from "./styles";

export default ({ event }) => {
  const classes = useStyles();
  const [openDescription, setOpenDescription] = useState(false);
  const [enableComment, setEnableComment] = useState(false);
  return (
    <Card className={classes.card}>
      <CardActionArea onClick={() => setOpenDescription(!openDescription)}>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <Image src={event.banner} aspectRatio={10 / 4} />
          </Grid>
          <Grid item xs={12} lg={5}>
            <CardContent className={classes.content}>
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                className={classes.title}
              >
                <Avatar
                  src={event.creatorImageUrl}
                  className={classes.avatar}
                />
                <Typography variant="body2">
                  <b>{event.creatorName}</b>
                  {event.school && <span> @ {event.school}</span>}
                </Typography>
              </Box>
              <Typography variant="body1" className={classes.multiline}>
                <b>{event.title}</b>
              </Typography>
              <Typography variant="body2">
                Begin: {moment(event.beginTime).format("MMMM Do YYYY, h:mm a")}
              </Typography>
              <Typography variant="body2">
                {event.endTime &&
                  "End: " +
                    moment(event.endTime).format("MMMM Do YYYY, h:mm a")}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </CardActionArea>
      <Collapse in={openDescription} timeout={150}>
        <CardContent className={classes.padBottom}>
          <Typography variant="body2" className={classes.description}>
            {event.description}
          </Typography>
          {event.link && (
            <Button
              fullWidth
              className={classes.button}
              href={
                /^(http|https):/.test(event.link)
                  ? event.link
                  : "http://" + event.link
              }
            >
              Event Link: {event.link}
            </Button>
          )}
          <Collapse in={openDescription} timeout={150}>
            <Comment eventId={event._id} open={openDescription} />
          </Collapse>
        </CardContent>
      </Collapse>
    </Card>
  );
};
