import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveToCloudinary.js';
import { Resume } from '../models/resume.js';
import { syncUserInfoToResumes } from '../services/resumeServices.js';

export const getCurrentUser = (req, res) => {
  res.status(200).json(req.user);
};
export const updateUserAvatar = async (req, res) => {
	const { file, user } = req;
  if (!file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(file.buffer, user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { avatar: result.secure_url },
    { returnDocument: "after" },
  );

  res.status(200).json({ url: updatedUser.avatar });
};
export const updateUserInfo = async (req, res) => {
  const updateData = { ...req.body };

  if (req.file) {
    const result = await saveFileToCloudinary(req.file.buffer);

    updateData.avatar = result.secure_url;
  }

  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
  });

  if (!user) throw createHttpError(404, 'User not found');

  await syncUserInfoToResumes(req.user._id, {
  username: updateData.username,
  email: updateData.email,
});
  res.status(200).json(user);
};
export const deleteUser = async (req,res)=>{
  const { user }= req;
  await User.findOneAndDelete({_id: user._id});
  await Resume.deleteMany({ owner: req.user._id });
  res.status(204).json();
};

export const updateTheme = async (req, res) => {
  const { theme } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { theme },
    { new: true, runValidators: true }
  );

  res.status(200).json({ theme: updatedUser.theme });
};
