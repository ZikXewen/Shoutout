import { useEffect, useState } from "react";
import { fetchPosts, countPosts } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  CircularProgress,
  Grid,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

import Form from "./Form/Form";
import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [curPage, setCurPage] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  const [sortType, setSortType] = useState("Newest");
  const [menuAnchor, setMenuAnchor] = useState(null);
  const sortTypes = ["Newest", "Popular", "Trending"];
  useEffect(() => {
    dispatch(countPosts())
      .then(setPostsCount)
      .then(() => dispatch(fetchPosts(curPage, sortType)));
  }, [curPage, sortType]);
  return (
    <Container disableGutters>
      <Form />
      {posts[0] && posts[0].likes ? (
        <Container className={classes.posts} disableGutters>
          <Grid container className={classes.paging}>
            <Grid item xs={12} md={9} className={classes.pageItem}>
              <Pagination
                count={Math.ceil(postsCount / 10)}
                onChange={(e, v) => setCurPage(v - 1)}
              />
            </Grid>
            <Grid item xs={12} md={3} className={classes.pageItem}>
              <Button fullWidth onClick={(e) => setMenuAnchor(e.currentTarget)}>
                Sort By: {sortType}
              </Button>
              <Menu
                anchorEl={menuAnchor}
                getContentAnchorEl={null}
                open={Boolean(menuAnchor)}
                onClose={() => setMenuAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                {sortTypes.map((type) => (
                  <MenuItem
                    onClick={() => {
                      setSortType(type);
                      setMenuAnchor(null);
                    }}
                  >
                    {type}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Grid>
          {posts.map((post, index) => (
            <Post post={post} key={`post${index}`} />
          ))}
        </Container>
      ) : (
        <CircularProgress className={classes.progress} />
      )}
    </Container>
  );
};
export default Posts;
