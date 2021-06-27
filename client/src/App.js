import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.user);
  return user ? (
    <BrowserRouter>
      <Navbar />
      <Grid container justify="center">
        <Grid item xs={12} md={7}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/posts" />
            </Route>
            <Route path="/">
              <Feed />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </BrowserRouter>
  ) : (
    <Auth />
  );
};
export default App;
