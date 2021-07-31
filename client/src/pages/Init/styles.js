import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  card: {
    marginTop: "20px",
    padding: "30px",
  },
  button: {
    margin: "5px 0",
    textTransform: "none",
  },
  title: {
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
}));
