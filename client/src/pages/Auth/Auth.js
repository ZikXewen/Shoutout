import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();
  return (
    <Container className={classes.authBox}>
      <Card>
        <CardMedia />
        <CardContent>
          <Typography>Welcome to osu!</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};
export default Auth;
