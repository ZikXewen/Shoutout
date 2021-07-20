import {
  CircularProgress,
  ListItem,
  List,
  Box,
  TextField,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";

import {
  countComments,
  fetchComments,
  createComment,
} from "../../../../actions/posts";
import useStyles from "./styles";
import moment from "moment";

export default ({ postId, open }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [curPage, setCurPage] = useState(0);
  const [count, setCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const classes = useStyles();
  const handleSubmit = () => {
    dispatch(
      createComment({
        postId,
        content: newComment,
        creatorName: user.name,
        creatorId: user._id,
        creatorImageUrl: user.imageUrl,
      })
    ).then(() => {
      setJustSubmitted(true);
    });
    setCurPage(0);
    setNewComment("");
  };
  const handleFetch = () => {
    dispatch(countComments(postId)).then(setCount);
    dispatch(fetchComments(postId, curPage)).then(setComments);
  };
  useEffect(() => {
    if (!justSubmitted) handleFetch();
    setJustSubmitted(false);
  }, [justSubmitted]);
  useEffect(() => {
    if (open) handleFetch();
  }, [curPage, open]);
  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <IconButton onClick={handleSubmit} disabled={!newComment}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
      {comments[0] ? (
        <>
          <Pagination
            count={Math.ceil(count / 10)}
            onChange={(e, v) => {
              setCurPage(v - 1);
            }}
          />
          <List>
            {comments.map(
              ({ creatorName, content, creatorImageUrl, createdAt }) => (
                // THIS NEEDS STYLING
                <ListItem>
                  <Avatar src={creatorImageUrl} className={classes.avatar} />
                  {creatorName}: {content} -- {moment(createdAt).fromNow()}
                </ListItem>
              )
            )}
          </List>
        </>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
