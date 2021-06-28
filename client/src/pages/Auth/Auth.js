import {
  Grid,
  Card,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { getDomain } from "tldjs";
import { login } from "../../actions/auth";
import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allowedDomain = ["satitpatumwan.ac.th", "triamudom.ac.th"];
  const googleSuccess = async (res) => {
    const profile = res?.profileObj;
    const token = res?.tokenId;
    try {
      if (allowedDomain.includes(getDomain(profile.email.split("@").pop())))
        dispatch(login({ profile, token }));
      else alert("Domain not allowed");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = () => {
    console.log("Login Failed");
  };
  return (
    <Grid container justify="center">
      <Grid item xs={10} md={7}>
        <Card className={classes.card}>
          <Typography
            fullWidth
            align="center"
            variant="h5"
            className={classes.title}
          >
            Connect to your community now!
          </Typography>
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
          <Button variant="outlined" fullWidth className={classes.button}>
            Learn More
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
};
export default Auth;
