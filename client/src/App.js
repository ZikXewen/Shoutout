import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Feed from "./pages/Feed/Feed";
const App = () => {
  return (
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
  );
};
export default App;
