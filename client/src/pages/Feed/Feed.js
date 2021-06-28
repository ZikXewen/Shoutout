import { Container, Toolbar, Button } from "@material-ui/core";
import { Link, Switch, Route } from "react-router-dom";

import useStyles from "./styles";
import Posts from "../../components/Posts/Posts";
import { Grid } from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";

const Feed = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <Grid container justify="center">
        <Grid item xs={12} md={7}>
          <Container>
            {/* prettier-ignore */}
            <Toolbar className={classes.typesBar}>
        <Button fullWidth component = {Link} to="/posts">Posts</Button>
        <Button fullWidth component = {Link} to="/events">Events</Button>
        <Button fullWidth component = {Link} to="/announcements">Announcements</Button>
      </Toolbar>
            <Switch>
              <Route exact path="/posts">
                <Posts />
              </Route>
            </Switch>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};
export default Feed;
