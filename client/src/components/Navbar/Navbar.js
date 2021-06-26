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
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MoodIcon from "@material-ui/icons/Mood";
import { useState } from "react";
import useStyles from "./styles";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
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
          <Typography variant="h5">Komuniti</Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={drawerClick} className={classes.drawer}>
        <List className={classes.list}>
          <ListItem>
            <IconButton onClick={drawerClick} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5">Komuniti</Typography>
          </ListItem>
          {["Community", "Contact", "Profile", "Notification", "Support"].map(
            (text, index) => (
              <ListItem button>
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
