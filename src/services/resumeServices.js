import { Resume } from "../models/resume.js";

export const createEmptyResume = async (userId, userData = {}) => {
  const newResume = await Resume.create({
    owner: userId,
    personalInfo: {
      fullname: userData.fullname || '',
      email: userData.email || '',
      job: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    languages: []
  });
  return newResume;
};

export const syncUserInfoToResumes = async (userId, { username, email }, excludeId = null) => {
  const resumeUpdates = {};
  if (username !== undefined) resumeUpdates['personalInfo.fullname'] = username; // маппинг
  if (email !== undefined) resumeUpdates['personalInfo.email'] = email;

  if (Object.keys(resumeUpdates).length === 0) return;

  const filter = { owner: userId };
  if (excludeId) filter._id = { $ne: excludeId };

  await Resume.updateMany(filter, { $set: resumeUpdates });
};
