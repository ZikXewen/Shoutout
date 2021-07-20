import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";
import Shop from "./pages/Shop/Shop";
import Init from "./pages/Init/Init";
const App = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Switch>
      {user
        ? user.school
          ? [
              <Route exact path="/shop" component={Shop} />,
              <Redirect exact from="/auth" to="/" />,
              <Route
                exact
                path={["/posts", "/events", "/announcements"]}
                component={Feed}
              />,
              <Redirect from="/" to="/posts" />,
            ]
          : [
              <Route exact path="/initialize" component={Init} />,
              <Redirect from="/" to="/initialize" />,
            ]
        : [
            <Route exact path="/auth" component={Auth} />,
            <Redirect from="/" to="/auth" />,
          ]}
    </Switch>
  );
};
export default App;
