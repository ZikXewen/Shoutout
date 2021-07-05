import { useEffect } from "react";
import { getPosts } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { Container, CircularProgress } from "@material-ui/core";

import Form from "./Form/Form";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Container>
      <Form />
      {!posts.length ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <Container className={classes.posts} disableGutters>
          {posts.map((post, index) => (
            <Post post={post} key={`post${index}`} />
          ))}
        </Container>
      )}
    </Container>
  );
};
export default Posts;
