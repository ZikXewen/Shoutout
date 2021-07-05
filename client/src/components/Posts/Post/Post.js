import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Grow,
  Avatar,
} from "@material-ui/core";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ArrowIcon from "@material-ui/icons/Forward";
import ShareIcon from "@material-ui/icons/Share";
import SaveIcon from "@material-ui/icons/Bookmark";
import CommentIcon from "@material-ui/icons/ChatBubble";
import ReportIcon from "@material-ui/icons/Report";
import Image from "material-ui-image";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector((state) => state.auth);
  const [menuAnchor, setMenuAnchor] = useState(null);
  return (
    <Card className={classes.card}>
      <CardActions disableSpacing className={classes.likes}>
        <IconButton>
          <ArrowIcon className={classes.upArrow} />
        </IconButton>
        <Typography>{post.likes?.length - post.dislikes?.length}</Typography>
        <IconButton>
          <ArrowIcon className={classes.downArrow} />
        </IconButton>
      </CardActions>
      <Box display="flex" flexDirection="column" margin="10px 0" flex="1 0">
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar src={post.creatorImageUrl} className={classes.avatar} />
            <Typography>
              {`${post.creator} : ${moment(post.createdAt).fromNow()}`}
            </Typography>
          </Box>
          <Typography variant="h6">{post.title}</Typography>
          <Typography variant="body1" classname={classes.multiline}>
            {post.content}
          </Typography>
          <Box paddingX="38%">
            {post.sticker && <Image src={post.sticker} />}
          </Box>
        </CardContent>
        <CardActions>
          <Button>
            <CommentIcon style={{ marginRight: "5px" }} />
            Comments
          </Button>
          <Button style={{ marginRight: "max(auto, 5px)" }}>
            <ShareIcon style={{ marginRight: "5px" }} />
            Share
          </Button>
          <Button>
            <SaveIcon style={{ marginRight: "5px" }} />
            Save
          </Button>
          <Button>
            <ReportIcon style={{ marginRight: "5px" }} />
            Report
          </Button>
        </CardActions>
      </Box>
      {user && user.name === post.creator && (
        <Box padding="8px">
          <IconButton
            onClick={(e) => {
              setMenuAnchor(e.currentTarget);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <Popper
            open={Boolean(menuAnchor)}
            anchorEl={menuAnchor}
            transition
            disablePortal
          >
            {(props) => (
              <Grow {...props.TransitionProps}>
                <Paper>
                  <ClickAwayListener
                    onClickAway={() => {
                      setMenuAnchor(null);
                    }}
                  >
                    <MenuList>
                      <MenuItem>Edit</MenuItem>
                      <MenuItem
                        onClick={() => {
                          setMenuAnchor(null);
                          dispatch(deletePost(post._id));
                        }}
                      >
                        Delete
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      )}
    </Card>
  );
};
export default Post;
