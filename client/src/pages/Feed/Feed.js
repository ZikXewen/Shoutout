import { Container, Toolbar, Button } from "@material-ui/core";
import { Link, Switch, Route } from "react-router-dom";

import useStyles from "./styles";
import Posts from "../../components/Posts/Posts";

const Feed = () => {
  const classes = useStyles();

  return (
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
  );
};
export default Feed;
