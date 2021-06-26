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
});
