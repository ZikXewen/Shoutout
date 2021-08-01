import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  card: {
    marginTop: "20px",
    padding: "30px",
  },
  button: {
    margin: "5px 0",
  },
  title: {
    marginBottom: "10px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    width: "100%",
    maxWidth: "600px",
    minWidth: "300px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));
