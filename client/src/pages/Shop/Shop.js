import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Button,
} from "@material-ui/core";
import Image from "material-ui-image";
import { useDispatch, useSelector } from "react-redux";
import { getSticker } from "../../actions/auth";

import Navbar from "../../components/Navbar/Navbar";
import Stickers from "../../img/stickers";
import useStyles from "./styles";

export default () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Grid container justify="center">
        <Grid item sm={11} md={7} className={classes.container}>
          <Typography variant="h4" align="center" className={classes.title}>
            Sticker Shop
          </Typography>
          <Grid container spacing={3}>
            {Object.keys(Stickers).map(
              (key, ind) =>
                !user.stickers.includes(key) && (
                  <Grid item xs={12} sm={3}>
                    <Card>
                      <CardMedia>
                        <Image src={Stickers[key]} style={{ margin: "5%" }} />
                      </CardMedia>
                      <CardActionArea
                        className={classes.getButton}
                        onClick={async () => {
                          dispatch(getSticker(user._id, key));
                        }}
                      >
                        <Typography
                          variant="button"
                          className={classes.getText}
                          align="center"
                        >
                          Get
                        </Typography>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
