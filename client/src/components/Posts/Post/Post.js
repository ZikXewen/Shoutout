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
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  Collapse,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import ArrowIcon from "@material-ui/icons/Forward";
import SaveIcon from "@material-ui/icons/Bookmark";
import CommentIcon from "@material-ui/icons/ChatBubble";
import ReportIcon from "@material-ui/icons/Report";
import Image from "material-ui-image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { deletePost, likePost, dislikePost } from "../../../actions/posts";
import Comment from "./Comment/Comment";
import useStyles from "./styles";
import { savePost } from "../../../actions/auth";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [enableComment, setEnableComment] = useState(false);
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const mdScreen = useMediaQuery(theme.breakpoints.up("md"));
  useEffect(() => setEnableComment(false), [post]);
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
        flex="1"
        minWidth="0"
      >
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar src={post.creatorImageUrl} className={classes.avatar} />
            <Typography variant="body2">
              <b>{post.creatorName}</b>
              {` : ${moment(post.createdAt).fromNow()}`}
            </Typography>
          </Box>
          <Typography variant="body1" className={classes.content}>
            {post.content}
          </Typography>
          <List className={classes.tags}>
            {post.tags.map((tag) => (
              <ListItem className={classes.tag} disableGutters button>
                <i onClick={() => {}}>{`#${tag}`}</i>
              </ListItem>
            ))}
          </List>
          <Box paddingX={mdScreen ? "38%" : "30%"}>
            {post.sticker && <Image src={post.sticker} />}
          </Box>
        </CardContent>

        {smScreen ? (
          <CardActions>
            <Button onClick={() => setEnableComment(!enableComment)}>
              <CommentIcon style={{ marginRight: "5px" }} />
              Comments
            </Button>
            <Button onClick={() => dispatch(savePost(user._id, post._id))}>
              <SaveIcon style={{ marginRight: "5px" }} />
              Save
            </Button>
            <Button>
              <ReportIcon style={{ marginRight: "5px" }} />
              Report
            </Button>
          </CardActions>
        ) : (
          <CardActions style={{ justifyContent: "space-evenly" }}>
            <IconButton onClick={() => setEnableComment(!enableComment)}>
              <CommentIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(savePost(user._id, post._id))}>
              <SaveIcon />
            </IconButton>
            <IconButton>
              <ReportIcon />
            </IconButton>
          </CardActions>
        )}
        <Collapse in={enableComment} timeout={150}>
          <Comment postId={post._id} open={enableComment} />
        </Collapse>
      </Box>
      {user && user.name === post.creatorName && (
        <Box padding="8px" position="absolute" top="0" right="0">
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
