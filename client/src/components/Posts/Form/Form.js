import { useState } from "react";
import { createPost } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

import Stickers from "../../../img/stickers";
import useStyles from "./styles";

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [stickerPop, setStickerPop] = useState(false);
  const [openTags, setOpenTags] = useState(false);
  const [focusShare, setFocusShare] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    tags: "",
    sticker: "",
  });
  const handleClear = () => {
    setFocusShare(false);
    setOpenTags(false);
    setFormData({
      content: "",
      tags: "",
      sticker: "",
    });
  };
  const handleSubmit = () => {
    let tags = [...new Set(formData.tags.trim().split(" "))].filter(
      (tag) => tag !== ""
    );
    dispatch(
      createPost({
        ...formData,
        tags,
        creatorName: user.name,
        creatorId: user._id,
        creatorImageUrl: user.imageUrl,
      })
    );
    handleClear();
  };
  return (
    <>
      <Card>
        <CardContent className={classes.cardHeader}>
          <Avatar src={user.imageUrl} className={classes.avatar} />
          <Container className={classes.shareForm}>
            <TextField
              variant="outlined"
              label={
                focusShare ? "Content" : `Share your own idea, ${user.name}`
              }
              fullWidth
              className={classes.shareField}
              size="small"
              value={formData.content}
              onFocus={() => {
                setFocusShare(true);
              }}
              onBlur={() => {
                if (!formData.content) setFocusShare(false);
              }}
              onChange={(e) => {
                setFormData({ ...formData, content: e.target.value });
              }}
              inputProps={{ maxLength: 50 }}
            />
            <Collapse in={openTags}>
              <TextField
                label="Tags (space separated)"
                variant="outlined"
                fullWidth
                size="small"
                className={classes.shareField}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    tags: e.target.value,
                  });
                }}
                value={formData.tags.replace("  ", " ")}
                inputProps={{ maxLength: 50 }}
              />
            </Collapse>
            <Collapse in={formData.sticker}>
              <Box paddingX="38%">
                <Image src={formData.sticker} />
              </Box>
            </Collapse>
          </Container>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setOpenTags(!openTags);
              setFormData({ ...formData, tags: "" });
            }}
          >
            {openTags ? "Clear Tags" : "Add Tags"}
          </Button>
          <Button
            onClick={() => {
              setStickerPop(true);
            }}
          >
            Add Stickers
          </Button>
          <Button
            style={{ marginLeft: "auto" }}
            disabled={!formData.content && !formData.sticker && !formData.tags}
            onClick={handleClear}
            color="secondary"
          >
            Clear
          </Button>
          <Button
            disabled={!formData.content}
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
        <DialogActions>
          <Button
            fullWidth
            onClick={() => {
              setFormData({ ...formData, sticker: "" });
              setStickerPop(false);
            }}
          >
            Clear Stickers
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
