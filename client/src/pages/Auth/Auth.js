import {
  Snackbar,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import Image from "material-ui-image";

import { login } from "../../actions/auth";
import useStyles from "./styles";
import logoPng from "../../img/logo.png";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  const googleSuccess = async (res) => {
    const profile = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(login({ profile, token }));
    } catch (error) {
      setLoginError(true);
    }
  };
  const googleFailure = () => setLoginError(true);
  return (
    <Grid container justify="center">
      <Grid item xs={10} md={7}>
        <Snackbar
          open={loginError}
          autoHideDuration={5000}
          onClose={(e, reason) => {
            if (reason !== "clickaway") setLoginError(false);
          }}
        >
          <Alert severity="error" onClose={() => setLoginError(false)}>
            <AlertTitle>Login Unsuccessful</AlertTitle>
            Please try again.
          </Alert>
        </Snackbar>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <img src={logoPng} className={classes.logo} />
            <Typography align="center" variant="h3" className={classes.title}>
              Welcome to Shoutout
            </Typography>
            <Typography align="center" variant="h5" className={classes.title}>
              Connect to your community now!
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableSpacing>
            <GoogleLogin
              clientId="21631352903-g430h145c3bka2afomtlk30snnuhsiim.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.button}
                  size="large"
                  color="primary"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  {renderProps.disabled ? <CircularProgress /> : "Login"}
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Button
              variant="outlined"
              fullWidth
              className={classes.button}
              href="https://docs.google.com/document/d/1cI5HFn2Gh8dJ-7zkMWgM6dLvAk6LuIRGadzkupsDHYo/edit"
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Auth;
