import { makeStyles } from "@material-ui/core";
export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "100%",
    overflow: "auto",
  },
  tag: {
    width: "fit-content",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
  upArrow: {
    transform: "rotate(-90deg)",
  },
  downArrow: {
    transform: "rotate(+90deg)",
  },
  avatar: {
    width: "25px",
    height: "25px",
    marginRight: "10px",
  },
  multiline: {
    whiteSpace: "pre-line",
  },
});
