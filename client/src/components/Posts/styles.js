import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  progress: {
    margin: "30px",
  },
  typesBar: {
    justifyContent: "center",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
  },
  userIcon: {
    fontSize: "2.5em",
  },
  shareForm: {
    display: "flex",
    flexDirection: "column",
  },
  shareField: {
    margin: "5px",
  },
  posts: {
    display: "flex",
    flexDirection: "column-reverse",
  },
}));
