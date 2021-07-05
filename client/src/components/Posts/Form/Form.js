import { useState } from "react";
import { createPost } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Container,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  TextField,
  Collapse,
  Grid,
  Avatar,
} from "@material-ui/core";
import Image from "material-ui-image";
import FaceIcon from "@material-ui/icons/Face";

import Stickers from "../../../img/stickers";
import useStyles from "./styles";

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [stickerPop, setStickerPop] = useState(false);
  const [focusShare, setFocusShare] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    sticker: "",
  });
  const handleClear = () => {
    setFormData({
      title: "",
      content: "",
      sticker: "",
    });
    setFocusShare(false);
  };
  const handleSubmit = () => {
    dispatch(
      createPost({
        ...formData,
        creator: user.name,
        creatorId: user._id,
        creatorImageUrl: user.imageUrl,
      })
    );
    handleClear();
  };
  console.log(user);
  return (
    <>
      <Card>
        <CardContent className={classes.cardHeader}>
          <Avatar src={user.imageUrl} className={classes.avatar} />
          <Container className={classes.shareForm}>
            <TextField
              variant="outlined"
              label={focusShare ? "Title" : `Share your own idea, ${user.name}`}
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
              inputProps={{ maxLength: 50 }}
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
                inputProps={{ maxLength: 500 }}
              />
              <Box paddingX="38%">
                {formData.sticker && <Image src={formData.sticker} />}
              </Box>
            </Collapse>
          </Container>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setStickerPop(true);
            }}
          >
            Add Stickers
          </Button>
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
      <Dialog
        onClose={() => {
          setStickerPop(false);
        }}
        open={stickerPop}
        fullWidth
      >
        <DialogTitle>Choose sticker for your post.</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {user.stickers.map((key, index) => (
              <Grid item xs={6} sm={3} className={classes.sticker}>
                <CardActionArea
                  onClick={() => {
                    setFormData({ ...formData, sticker: Stickers[key] });
                    setStickerPop(false);
                  }}
                >
                  <Image src={Stickers[key]} />
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
