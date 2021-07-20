import Post from "../models/Post.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

export const getUser = async (req, res) => {
  const { googleId, name, imageUrl } = req.body;
  const _id = googleId;
  try {
    const oldUser = await User.findById(_id);
    if (!oldUser) {
      const newUser = await User.create({ _id, name, imageUrl });
      res.status(201).json(newUser);
    } else {
      if (oldUser.name !== name || oldUser.imageUrl !== imageUrl) {
        oldUser.name = name;
        oldUser.imageUrl = imageUrl;
        await User.findByIdAndUpdate(_id, oldUser);
        await Post.updateMany(
          { creatorId: _id },
          { $set: { creatorName: name, creatorImageUrl: imageUrl } }
        );
        await Event.updateMany(
          { creatorId: _id },
          { $set: { creatorName: name, creatorImageUrl: imageUrl } }
        );
      }
      res.status(200).json(oldUser);
    }
  } catch (error) {
    res.status(500).json({ message: "Someting went wrong!" });
    console.log(error);
  }
};
export const setSchool = async (req, res) => {
  const { userId, school } = req.params;
  try {
    const newUser = await User.findByIdAndUpdate(userId, { $set: { school } });
    newUser.school = school;
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};
export const getSticker = async (req, res) => {
  const { userId, stickerName } = req.params;
  try {
    const oldUser = await User.findById(userId);
    oldUser.stickers = [...oldUser.stickers, stickerName];
    await User.findByIdAndUpdate(userId, oldUser);
    res.status(200).json(oldUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
    console.log(error);
  }
};
