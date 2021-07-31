import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
  avatar: {
    width: "25px",
    height: "25px",
    marginRight: "10px",
  },
  multiline: {
    display: "inline-block",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    maxHeight: "50px",
    overflowY: "auto",
    width: "100%",
  },
  title: {
    marginBottom: "10px",
  },
  button: {
    textTransform: "none",
  },
  content: { padding: "10px" },
  description: {
    display: "inline-block",
    wordBreak: "break-word",
    marginBottom: "8px",
    whiteSpace: "pre-wrap",
    maxHeight: "100px",
    overflowY: "auto",
    width: "100%",
  },
  padBottom: {
    "&:last-child": {
      paddingBottom: "10px",
    },
  },
}));
