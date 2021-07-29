import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import ImageCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

import useStyles from "./styles";
import { createEvent } from "../../../actions/events";

export default () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openCreate, setOpenCreate] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    beginTime: null,
    endTime: null,
    link: "",
    banner: null,
  });
  const [crop, setCrop] = useState({ unit: "%", aspect: 10 / 4, width: 100 });
  const [image, setImage] = useState();
  const [schoolBased, setSchoolBased] = useState(false);
  const user = useSelector((state) => state.auth);

  const getCroppedImage = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL();
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpenCreate(true)}>
        Create an event
      </Button>
      {/* Change onClose for cancel confirmation later */}
      <Dialog open={openCreate} onClose={() => setOpenCreate(false)} fullWidth>
        <DialogTitle>Create an event</DialogTitle>

        <DialogContent className={classes.createContent}>
          <FormControlLabel
            control={
              <Checkbox
                checked={schoolBased}
                onChange={(e) => {
                  setSchoolBased(e.target.checked);
                }}
              />
            }
            label="School-based Event"
          />
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            size="small"
            className={classes.content}
            inputProps={{ maxLength: 50 }}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            size="small"
            className={classes.content}
            inputProps={{ maxLength: 200 }}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Box display="flex" flexDirection="row" className={classes.content}>
              <DateTimePicker
                disablePast
                strictCompareDates
                value={formData.beginTime}
                onChange={(beginTime) =>
                  setFormData({ ...formData, beginTime })
                }
                minDateMessage="Cannot plan event in the past."
                label="Begin"
                inputVariant="outlined"
                size="small"
                fullWidth
                style={{ marginRight: "10px" }}
              />
              <DateTimePicker
                disablePast
                strictCompareDates
                value={formData.endTime}
                onChange={(endTime) => setFormData({ ...formData, endTime })}
                minDate={formData.beginTime}
                minDateMessage="Cannot end event before begin."
                label="End (Optional)"
                inputVariant="outlined"
                size="small"
                fullWidth
              />
            </Box>
          </MuiPickersUtilsProvider>
          <TextField
            label="Event Link (Optional)"
            variant="outlined"
            fullWidth
            size="small"
            className={classes.content}
            inputProps={{ maxLength: 50 }}
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          />
          <Button component="label" className={classes.content}>
            Upload Banner (10:4)
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  banner: URL.createObjectURL(e.target.files[0]),
                })
              }
            />
          </Button>
          {formData.banner && (
            <ImageCrop
              src={formData.banner}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onImageLoaded={setImage}
              style={{ marginBottom: "10px" }}
              imageStyle={{ minWidth: "100%" }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            className={classes.content}
            onClick={() => {
              dispatch(
                createEvent({
                  ...formData,
                  banner: formData.banner ? getCroppedImage() : null,
                  creatorName: user.name,
                  creatorId: user._id,
                  creatorImageUrl: user.imageUrl,
                  school: schoolBased ? user.school : null,
                })
              );
              setFormData({
                title: "",
                description: "",
                beginTime: null,
                endTime: null,
                link: "",
                banner: null,
              });
              setCrop({ unit: "%", aspect: 10 / 4, width: 100 });
              setOpenCreate(false);
            }}
            disabled={
              !formData.title || !formData.description || !formData.beginTime
            }
          >
            Create!
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
