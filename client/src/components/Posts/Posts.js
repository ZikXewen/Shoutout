import { useEffect, useState } from "react";
import { getPosts } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import { Container, CircularProgress } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import { countPosts } from "../../api";
import Form from "./Form/Form";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [curPage, setCurPage] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const getPostsCount = async () => {
    try {
      const { data } = await countPosts();
      setPostsCount(data.count);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPostsCount();
    dispatch(getPosts(curPage));
  }, [curPage]);
  return (
    <Container disableGutters>
      <Form />
      {!posts.length ? (
        <CircularProgress className={classes.progress} />
      ) : (
        <Container className={classes.posts} disableGutters>
          <Pagination
            count={Math.ceil(postsCount / 10)}
            onChange={(e, v) => {
              setCurPage(v - 1);
            }}
          />
          {posts.map((post, index) => (
            <Post post={post} key={`post${index}`} />
          ))}
        </Container>
      )}
    </Container>
  );
};
export default Posts;
