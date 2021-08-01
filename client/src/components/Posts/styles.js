import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  progress: {
    margin: "30px",
  },
  posts: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  paging: {
    alignItems: "center",
    marginTop: "15px",
  },
  pageItem: {
    display: "flex",
    justifyContent: "center",
  },
  page: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
}));
