import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  progress: {
    margin: "30px",
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  paging: {
    alignItems: "center",
  },
  pageItem: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
}));
