import {
  Drawer,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MoodIcon from "@material-ui/icons/Mood";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logoSvg from "../../img/logo.svg";
import { logout } from "../../actions/auth";
import useStyles from "./styles";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch = useDispatch();
  const drawerClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton onClick={drawerClick} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Button
            component={Link}
            to={user.school ? "/posts" : "/initialize"}
            style={{ padding: 0 }}
          >
            <img src={logoSvg} style={{ height: "64px", width: "64px" }} />
          </Button>
          <Typography
            style={{ marginLeft: "auto" }}
          >{`Logged in as... ${user.name}`}</Typography>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              dispatch(logout());
            }}
            className={classes.logoutButton}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={drawerClick} className={classes.drawer}>
        <List className={classes.list}>
          <ListItem key="menuHead">
            <IconButton onClick={drawerClick} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">Shoutout</Typography>
          </ListItem>
          {["Community", "Contact", "Profile", "Notification", "Support"].map(
            (text, index) => (
              <ListItem button key={`menu${index}`}>
                <ListItemIcon>
                  <MoodIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
    </>
  );
};
export default Navbar;
