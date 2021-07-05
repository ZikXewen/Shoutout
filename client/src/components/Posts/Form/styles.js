import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  avatar: {
    height: "35px",
    width: "35px",
  },
  typesBar: {
    justifyContent: "center",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  shareForm: {
    display: "flex",
    flexDirection: "column",
  },
  shareField: {
    margin: "5px",
  },
  sticker: {
    transition: "100ms",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));
