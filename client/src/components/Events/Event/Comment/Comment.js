import {
  CircularProgress,
  ListItem,
  List,
  Box,
  TextField,
  IconButton,
  Avatar,
  Container,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";

import {
  countComments,
  fetchComments,
  createComment,
} from "../../../../actions/events";
import useStyles from "./styles";
import moment from "moment";

export default ({ eventId, open }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [curPage, setCurPage] = useState(0);
  const [count, setCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const classes = useStyles();
  const handleSubmit = () => {
    dispatch(
      createComment({
        eventId,
        content: newComment,
        creatorName: user.name,
        creatorId: user._id,
        creatorImageUrl: user.imageUrl,
      })
    ).then(handleFetch);
    setCurPage(0);
    setNewComment("");
  };
  const handleFetch = () => {
    dispatch(countComments(eventId))
      .then(setCount)
      .then(() => dispatch(fetchComments(eventId, curPage)))
      .then(setComments);
  };
  useEffect(() => {
    if (open) handleFetch();
  }, [curPage, open]);
  useEffect(() => setComments([]), [eventId]);
  return (
    <Container disableGutters>
      <Box display="flex" flexDirection="row" alignItems="center">
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          label="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          inputProps={{ maxLength: 50 }}
        />
        <IconButton onClick={handleSubmit} disabled={!newComment}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
      {comments[0] && (
        <Box marginTop="10px">
          <Pagination
            count={Math.ceil(count / 10)}
            onChange={(e, v) => {
              setCurPage(v - 1);
            }}
            size="small"
          />
          <List>
            {comments.map(
              ({ creatorName, content, creatorImageUrl, createdAt }) => (
                // THIS NEEDS STYLING
                <ListItem>
                  <Avatar src={creatorImageUrl} className={classes.avatar} />
                  <Typography className={classes.multiline}>
                    {creatorName}: {content}{" "}
                    <span style={{ color: "lightGray" }}>
                      - {moment(createdAt).fromNow()}
                    </span>
                  </Typography>
                </ListItem>
              )
            )}
          </List>
        </Box>
      )}
    </Container>
  );
};
