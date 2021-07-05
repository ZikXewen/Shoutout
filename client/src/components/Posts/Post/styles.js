import { makeStyles } from "@material-ui/core";
export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
  },
  likes: {
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
    marginRight: "15px",
  },
  multiline: {
    whiteSpace: "pre-line",
  },
});
