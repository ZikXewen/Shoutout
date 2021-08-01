import { makeStyles } from "@material-ui/core";
export default makeStyles({
  card: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    position: "relative",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    overflow: "auto",
  },
  tag: {
    width: "fit-content",
    padding: "5px 7px",
    borderRadius: "3px",
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
  content: {
    display: "inline-block",
    wordBreak: "break-word",
    marginTop: "8px",
    whiteSpace: "pre-wrap",
    maxHeight: "100px",
    overflowY: "auto",
    width: "100%",
  },
});
