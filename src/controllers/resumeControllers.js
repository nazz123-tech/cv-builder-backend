import { Resume } from "../models/resume.js";
import createHttpError from "http-errors";
import { createEmptyResume} from "../services/resumeServices.js";

export const getAllResumes= async (req,res)=>{
  const { page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;
  const resumesQuery=Resume.find({owner:req.user._id});
  const [totalResumes, resumes] =await Promise.all([
      resumesQuery.clone().countDocuments(),
      resumesQuery.skip(skip).limit(perPage),
    ]);
    const totalPages = Math.ceil(totalResumes / perPage);
     res.status(200).json({
      resumes,
      perPage,
      page,
      totalPages
     });
};
export const createResume = async (req,res)=>{
  const { _id, username, email } = req.user;
    const resume = await createEmptyResume(_id, {
      fullname: username,
      email: email
    });
   res.status(200).json(resume);
};
export const getResumeById = async (req,res)=>{
  const {resumeId} = req.params;
  const resume = await Resume.findById(resumeId);
  if(!resume){
    throw createHttpError(404,'Resume not found');
  }
  res.status(200).json(resume);
};
export const updateResumePersInfo = async (req, res, next) => {
  try {
    const { resumeId } = req.params;
    const { job, phone, location, summary } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, owner: req.user._id },
      {
        $set: {
          'personalInfo.job': job,
          'personalInfo.phone': phone,
          'personalInfo.location': location,
          'personalInfo.summary': summary,
        },
      },
      { new: true }
    );

    if (!resume) throw createHttpError(404, 'Resume not found');

    res.status(200).json(resume);
  } catch (err) {
    next(err);
  }
};
export const updateSkills = async (req,res)=>{
  const {resumeId}=req.params;
  const {skills}=req.body;
  const result = await Resume.findByIdAndUpdate(
    {resumeId,
    },
    { $set: { skills } },
    { new: true },
    { returnDocument:"after"}
  );
  res.status(200).json(result);
};
export const updateLanguage = async (req, res) => {
  const { resumeId, langId } = req.params;

  const updateFields = {};
  for (const key in req.body) {
    updateFields[`languages.$.${key}`] = req.body[key];
  }

  const result = await Resume.findOneAndUpdate(
    { _id: resumeId,
       "languages._id": langId,
   },
    { $set: updateFields },
    { new: true, runValidators: true },
    {returnDocument: 'after'}
  );

  if (!result) return res.status(404).json({ message: "Language not found" });
  res.status(200).json(result);
};
export const updateExperience = async (req, res) => {
  const { resumeId, expId } = req.params;

  const updateFields = {};
  for (const key in req.body) {
    updateFields[`experience.$.${key}`] = req.body[key];
  }

  const result = await Resume.findOneAndUpdate(
    { _id: resumeId,
      "experience._id": expId,
     },
    { $set: updateFields },
    { new: true, runValidators: true },
    {returnDocument: 'after'}
  );

  if (!result) return res.status(404).json({ message: "Experience record not found" });
  res.status(200).json(result);
};
export const updateEducation = async (req, res) => {
  const { resumeId, eduId } = req.params;

  const updateFields = {};
  for (const key in req.body) {
    updateFields[`education.$.${key}`] = req.body[key];
  }

  const result = await Resume.findOneAndUpdate(
    { _id: resumeId, "education._id": eduId , userId: req.user._id, },
    { $set: updateFields },
    { new: true, runValidators: true },
    {returnDocument: 'after'}
  );

  if (!result) return res.status(404).json({ message: "Education record not found" });
  res.status(200).json(result);
};
export const  deleteResume = async (req,res)=>{
  const {resumeId} = req.params;
  const resume = await Resume.findOneAndDelete({
    _id:resumeId,
    userId: req.user._id,
  });
  if(!resume){
    throw createHttpError(404,'Resume not found');
  }
  res.status(200).json(resume);
};
export const addExperience = async (req, res) => {
  const { resumeId } = req.params;

  const result = await Resume.findByIdAndUpdate(
    resumeId ,
    { $push: { experience: req.body } },
    { new: true }
  );

  if (!result) return res.status(404).json({ message: "Resume not found" });

  res.status(201).json(result);
};
export const deleteExperience= async (req,res)=>{

  const { resumeId, expId } = req.params;

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, owner: req.user._id },
      { $pull: { experience: { _id: expId } } },
      { new: true }
    );
    if (!resume) throw createHttpError(404, 'Resume not found');
    res.status(200).json(resume);
};
export const deleteEducation= async (req,res)=>{

  const { resumeId, eduId } = req.params;

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, owner: req.user._id },
      { $pull: { education: { _id: eduId } } },
      { new: true }
    );
    if (!resume) throw createHttpError(404, 'Resume not found');
    res.status(200).json(resume);
};
export const deleteLanguage= async (req,res)=>{

  const { resumeId, lanId } = req.params;

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, owner: req.user._id },
      { $pull: { languages: { _id: lanId } } },
      { new: true }
    );
    if (!resume) throw createHttpError(404, 'Resume not found');
    res.status(200).json(resume);
};
export const deleteSkill = async (req, res, next) => {
    const { resumeId } = req.params;
    const { skill } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { _id: resumeId, owner: req.user._id },
      { $pull: { skills: skill } },
      { new: true }
    );
    if (!resume) throw createHttpError(404, 'Resume not found');
    res.status(200).json(resume);
};
export const addEducation = async (req, res) => {
  const { resumeId } = req.params;

  const result = await Resume.findByIdAndUpdate(
    resumeId ,
    { $push: { education: req.body } },
    { new: true }
  );

  if (!result) return res.status(404).json({ message: "Resume not found" });

  res.status(201).json(result);
};
export const addLanguage = async (req, res) => {
  const { resumeId } = req.params;
  const result = await Resume.findByIdAndUpdate(
   resumeId ,
    { $push: { languages: req.body } },
    { new: true }
  );

  if (!result) return res.status(404).json({ message: "Resume not found" });

  res.status(201).json(result);
};

