import { useEffect, useState } from "react";
import { createPost, getPosts } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  CircularProgress,
  Collapse,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [focusShare, setFocusShare] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    creator: "User",
  });
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  const handleClear = () => {
    setFormData({
      title: "",
      content: "",
      creator: "User",
    });
    setFocusShare(false);
  };
  const handleSubmit = () => {
    dispatch(createPost(formData));
    handleClear();
  };
  return (
    <Container>
      <Card>
        <CardContent className={classes.cardHeader}>
          <FaceIcon className={classes.userIcon} />
          <Container className={classes.shareForm}>
            <TextField
              variant="outlined"
              label={focusShare ? "Title" : "Share your own idea, User"}
              fullWidth
              className={classes.shareField}
              size="small"
              value={formData.title}
              onFocus={() => {
                setFocusShare(true);
              }}
              onBlur={() => {
                if (!formData.title && !formData.content) setFocusShare(false);
              }}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
            />
            <Collapse in={focusShare}>
              <TextField
                variant="outlined"
                label="Content"
                fullWidth
                className={classes.shareField}
                size="small"
                value={formData.content}
                onFocus={() => {
                  setFocusShare(true);
                }}
                onBlur={() => {
                  if (!formData.title && !formData.content)
                    setFocusShare(false);
                }}
                onChange={(e) => {
                  setFormData({ ...formData, content: e.target.value });
                }}
                multiline
                rowsMax="10"
              />
            </Collapse>
          </Container>
        </CardContent>
        <CardActions>
          <Button>Add Stickers</Button>
          <Button>Add Tags</Button>
          <Button
            style={{ marginLeft: "auto" }}
            disabled={!formData.title && !formData.content}
            onClick={handleClear}
            color="secondary"
          >
            Clear
          </Button>
          <Button
            disabled={!formData.title || !formData.content}
            onClick={handleSubmit}
            color="primary"
          >
            Share!
          </Button>
        </CardActions>
      </Card>
      {!posts.length ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <Container className={classes.posts}>
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </Container>
      )}
    </Container>
  );
};
export default Posts;
