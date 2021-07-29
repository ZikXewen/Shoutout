import { Container, Button } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Link, Switch, Route, useHistory } from "react-router-dom";

import useStyles from "./styles";
import Posts from "../../components/Posts/Posts";
import Events from "../../components/Events/Events";
import { Grid } from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";

const Feed = () => {
  const history = useHistory();
  const classes = useStyles();
  const [postType, setPostType] = useState(
    window.location.pathname.replace("/", "")
  );
  useEffect(() => {
    history.listen((location) => {
      setPostType(window.location.pathname.replace("/", ""));
    });
  }, []);
  return (
    <>
      <Navbar />
      <Grid container justify="center">
        <Grid item xs={12} md={7}>
          <Container>
            {/* prettier-ignore */}
            <ToggleButtonGroup exclusive className={classes.typesBar} value={postType}>
              <ToggleButton value="posts" component={Link} to="/posts" style={{width: "100%"}}><b>Posts</b></ToggleButton>
              <ToggleButton value="events" component={Link} to="/events" style={{width: "100%"}}><b>Events</b></ToggleButton>
              <ToggleButton value="announcements" component={Link} to="/announcements" style={{width: "100%"}}><b>Announcements</b></ToggleButton>
            </ToggleButtonGroup>
            <Switch>
              <Route exact path="/posts">
                <Posts />
              </Route>
              <Route exact path="/events">
                <Events />
              </Route>
            </Switch>
          </Container>
        </Grid>
      </Grid>
      <Button component={Link} to="/shop" className={classes.stickerShop}>
        Get Stickers!
      </Button>
    </>
  );
};
export default Feed;
