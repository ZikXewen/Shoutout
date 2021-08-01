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
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import InfoIcon from "@material-ui/icons/Info";
import SaveIcon from "@material-ui/icons/Bookmark";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logoPng from "../../img/logo.png";
import { logout } from "../../actions/auth";
import useStyles from "./styles";
const Navbar = ({ setFilter }) => {
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
            onClick={() => setFilter({})}
            style={{ padding: 0 }}
          >
            <img src={logoPng} style={{ height: "64px" }} />
          </Button>
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

          <ListItem
            button
            component={Link}
            to={user.school ? "/posts" : "/initialize"}
            onClick={() => {
              setFilter({});
              drawerClick();
            }}
          >
            <ListItemIcon style={{ paddingLeft: "12px" }}>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Community" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to={user.school ? "/posts" : "/initialize"}
            onClick={() => {
              setFilter({ savedBy: user._id });
              drawerClick();
            }}
          >
            <ListItemIcon style={{ paddingLeft: "12px" }}>
              <SaveIcon />
            </ListItemIcon>
            <ListItemText primary="Saved Posts" />
          </ListItem>
          <ListItem button disabled>
            <ListItemIcon style={{ paddingLeft: "12px" }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button disabled>
            <ListItemIcon style={{ paddingLeft: "12px" }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};
export default Navbar;
