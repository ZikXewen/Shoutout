import decode from "jwt-decode";
import { logout } from "../actions/auth";
export default (store) => (next) => (action) => {
  const auth = JSON.parse(localStorage.getItem("user"));
  if (auth?.token && decode(auth?.token).exp < Date.now() / 1000) {
    alert("Session Timed Out\nPlease Login again");
    const nxt = next(logout());
    return nxt;
    // Learn more about promise...
  }
  return next(action);
};
