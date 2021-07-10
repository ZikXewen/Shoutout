import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  progress: {
    margin: "30px",
  },
  typesBar: {
    margin: "30px 0",
    width: "100%",
    justifyContent: "center",
  },
  cardHeader: {
    display: "flex",
    flexDirection: "row",
  },
  userIcon: {
    fontSize: "3em",
    marginRight: "20px",
  },
  stickerShop: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
  },
}));
