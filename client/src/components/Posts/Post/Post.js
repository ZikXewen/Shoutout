import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@material-ui/core";
import OutlinedArrowIcon from "@material-ui/icons/ForwardOutlined";
import ArrowIcon from "@material-ui/icons/Forward";
import moment from "moment";

import useStyles from "./styles";

const Post = ({ post }) => {
  const classes = useStyles();
  console.log(post);
  return (
    <Card className={classes.card}>
      <CardActions disableSpacing className={classes.likes}>
        <IconButton>
          <ArrowIcon className={classes.upArrow} />
        </IconButton>
        <Typography>0</Typography>
        <IconButton>
          <ArrowIcon className={classes.downArrow} />
        </IconButton>
      </CardActions>
      <CardContent>
        {/* prettier-ignore */}
        <Typography>{`${post.creator} : ${moment(post.createdAt).fromNow()}`}</Typography>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
    </Card>
  );
};
export default Post;
