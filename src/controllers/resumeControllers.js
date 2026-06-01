import { Resume } from "../models/resume.js";
import createHttpError from "http-errors";

export const getResumes= async (req,res)=>{
    const resumes= await Resume.find();
    res.status(200).json(resumes);
};
export const createResume = async (req,res)=>{
   const resume= await Resume.create(req.body);
   res.status(201).json(resume);
};
export const getResumeById = async (req,res)=>{
  const {resumeId} = req.params;
  const resume = await Resume.findById(resumeId);
  if(!resume){
    throw createHttpError(404,'Resume not found');
  }
  res.status(200).json(resume);
};
export const updateResumePersInfo = async (req,res)=>{
  const {resumeId} = req.params;
  const body = req.body;
  const resume = await Resume.findByIdAndUpdate({_id:resumeId}, body, {returnDocument:'after'});
  res.status(200).json(resume);
};
export const updateSkills = async (req,res)=>{
  const {resumeId}=req.params;
  const {skills}=req.body;
  const result = await Resume.findByIdAndUpdate(
    resumeId,
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
    { _id: resumeId, "languages._id": langId },
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
    { _id: resumeId, "experience._id": expId },
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
    { _id: resumeId, "education._id": eduId },
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
  });
  if(!resume){
    throw createHttpError(404,'Resume not found');
  }
  res.status(200).json(resume);
};

