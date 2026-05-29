import { Resume } from "../models/resume";
import createHttpError from 'http-errors';

export const getResumes= async (req,res)=>{
    const resumes= await Resume.find();
    res.status(200).json(resumes);
};
export const createResume = async (req,res)=>{
   const resume= await Resume.create(req.body);
   res.status(201).json(resume);
};
