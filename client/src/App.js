import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import Auth from "./pages/Auth/Auth";
import Shop from "./pages/Shop/Shop";
import Init from "./pages/Init/Init";
import { useSelector } from "react-redux";
const App = () => {
  const user = useSelector((state) => state.auth);
  return (
    <Switch>
      {user ? (
        user.school ? (
          <>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/auth">
              <Redirect to="/" />
            </Route>
            <Route exact path={["/posts", "/events", "/announcements"]}>
              <Feed />
            </Route>
            <Redirect from="/" to="/posts" />
          </>
        ) : (
          <>
            <Route exact path="/initialize">
              <Init />
            </Route>
            <Redirect from="/" to="/initialize" />
          </>
        )
      ) : (
        <>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Redirect from="/" to="/auth" />
        </>
      )}
    </Switch>
  );
};
export default App;
