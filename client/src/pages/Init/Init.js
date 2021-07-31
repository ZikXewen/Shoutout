import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import useStyles from "./styles";
import schoolList from "./schools";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { setSchool as setSchoolAction } from "../../actions/auth";

export default () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [school, setSchool] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const user = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <Grid container justify="center">
        <Grid item xs={10} md={7}>
          <Card className={classes.card}>
            <CardContent>
              <Typography align="center" variant="h3" className={classes.title}>
                Welcome to Shoutout
              </Typography>
              <Typography align="center" variant="h5" className={classes.title}>
                Seems like this is your first time here... <br /> Please choose
                your school.
              </Typography>
              <Typography
                align="center"
                variant="body1"
                className={classes.title}
              >
                Some events are school-based and this cannot be changed later.
              </Typography>
            </CardContent>
            <CardActions className={classes.actions} disableSpacing>
              <Autocomplete
                options={schoolList}
                value={school}
                onChange={(e, newSchool) => setSchool(newSchool)}
                fullWidth
                className={classes.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="School (If your school is not listed, just type and press Enter.)"
                    variant="outlined"
                  />
                )}
                freeSolo
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.button}
                disabled={!school}
                onClick={() => setOpenConfirm(true)}
              >
                Confirm
                {school
                  ? ` ${school}`
                  : " (Press Enter to Confirm Your School)"}
              </Button>
            </CardActions>
          </Card>
          <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>Confirm Your School</DialogTitle>
            <DialogContent>{`Is your school ${school}?\nThis can never be changed again!`}</DialogContent>
            <DialogActions>
              <Button
                fullWidth
                color="primary"
                onClick={() => dispatch(setSchoolAction(user._id, school))}
              >
                Sure
              </Button>
              <Button
                fullWidth
                color="secondary"
                onClick={() => setOpenConfirm(false)}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
