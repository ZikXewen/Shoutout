import { makeStyles } from "@material-ui/core";
export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
    margin: "10px 0",
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
