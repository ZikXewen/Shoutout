import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/posts" />
      </Route>
      <Route exact path="/auth">
        {user ? <Redirect to="/" /> : <Auth />}
      </Route>
      <Route path="/">{user ? <Feed /> : <Redirect to="/auth" />}</Route>
    </Switch>
  );
};
export default App;
