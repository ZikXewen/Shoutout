import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import ArrowIcon from "@material-ui/icons/Forward";
import ShareIcon from "@material-ui/icons/Share";
import SaveIcon from "@material-ui/icons/Bookmark";
import CommentIcon from "@material-ui/icons/ChatBubble";
import ReportIcon from "@material-ui/icons/Report";
import Image from "material-ui-image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { deletePost, likePost, dislikePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Card className={classes.card}>
      <CardActions disableSpacing className={classes.col}>
        <IconButton
          onClick={() => {
            dispatch(likePost(post._id, user._id));
          }}
        >
          <ArrowIcon
            className={classes.upArrow}
            style={{
              color: post.likes.find((like) => like === user._id)
                ? "green"
                : "grey",
            }}
          />
        </IconButton>
        <Typography>{post.likes.length - post.dislikes.length}</Typography>
        <IconButton
          onClick={() => {
            dispatch(dislikePost(post._id, user._id));
          }}
        >
          <ArrowIcon
            className={classes.downArrow}
            style={{
              color: post.dislikes.find((dislike) => dislike === user._id)
                ? "green"
                : "grey",
            }}
          />
        </IconButton>
      </CardActions>
      <Box
        display="flex"
        flexDirection="column"
        margin="10px 0"
        flex="1 0"
        width="70%"
      >
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar src={post.creatorImageUrl} className={classes.avatar} />
            <Typography>
              {`${post.creatorName} : ${moment(post.createdAt).fromNow()}`}
            </Typography>
          </Box>
          <Typography variant="h6" classname={classes.multiline}>
            {post.content}
          </Typography>
          <List className={classes.tags}>
            {post.tags.map((tag) => (
              <ListItem
                marginX="10px"
                className={classes.tag}
              >{`#${tag}`}</ListItem>
            ))}
          </List>
          <Box paddingX={mdScreen ? "38%" : "30%"}>
            {post.sticker && <Image src={post.sticker} />}
          </Box>
        </CardContent>
        <CardActions>
          <Button>
            <CommentIcon style={{ marginRight: "5px" }} />
            {smScreen && "Comments"}
          </Button>
          <Button style={{ marginRight: "max(auto, 5px)" }}>
            <ShareIcon style={{ marginRight: "5px" }} />
            {smScreen && "Share"}
          </Button>
          <Button>
            <SaveIcon style={{ marginRight: "5px" }} />
            {smScreen && "Save"}
          </Button>
          <Button>
            <ReportIcon style={{ marginRight: "5px" }} />
            {smScreen && "Report"}
          </Button>
        </CardActions>
      </Box>
      {user && user.name === post.creatorName && (
        <Box padding="8px">
          <IconButton
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            fullWidth
          >
            <DialogTitle>
              Are you sure you want to delete this post? (Irreversible)
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  setTimeout(() => {
                    dispatch(deletePost(post._id));
                  }, 100); //Timeout for animation, can disable later
                }}
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                }}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </Card>
  );
};
export default Post;
