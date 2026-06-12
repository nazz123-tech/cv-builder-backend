import {Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';


export const getResumesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
  }),
};

export const createResumeSchema = {
  [Segments.BODY]: Joi.object({
  personalInfo: Joi.object({
    fullname: Joi.string().min(3).max(50),
    job: Joi.string().min(2).max(50),
    email: Joi.string().email(),
    phone: Joi.string().pattern(/^\+?[0-9\s-]{7,15}$/),
    location: Joi.string(),
    summary: Joi.string().max(500),
  }),

  experience: Joi.array().items(
    Joi.object({
      company: Joi.string().required(),
      position: Joi.string().required(),
      startDate: Joi.date().required(),
      endDate: Joi.date().allow(null),
      description: Joi.string(),
      isCurrent: Joi.boolean().default(false),
    })
  ),

  education: Joi.array().items(
    Joi.object({
      institution: Joi.string().required(),
      degree: Joi.string().required(),
      graduationYear: Joi.number().integer().min(1950).max(2100),
    })
  ),

  skills: Joi.array().items(Joi.string()),

  languages: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      level: Joi.string().valid('Basic', 'Intermediate', 'Upper-Intermediate', 'Advanced').required(),
    })
  ),
}).optional()
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const resumeIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    resumeId: Joi.string().custom(objectIdValidator).required(),
  }),
};


export const experienceParamSchema = {
  [Segments.PARAMS]: Joi.object({
    resumeId: Joi.string().custom(objectIdValidator).required(),
    expId: Joi.string().custom(objectIdValidator).required(),
  }),
};


export const languageParamSchema = {
  [Segments.PARAMS]: Joi.object({
    resumeId: Joi.string().custom(objectIdValidator).required(),
    langId: Joi.string().custom(objectIdValidator).required(),
  }),
};


export const educationParamSchema = {
  [Segments.PARAMS]: Joi.object({
    resumeId: Joi.string().custom(objectIdValidator).required(),
    eduId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const patchPersonalInfoSchema = {
 [Segments.BODY]:Joi.object({
  "personalInfo.fullname": Joi.string().min(3).max(50),
  "personalInfo.job": Joi.string().min(2).max(50),
  "personalInfo.email": Joi.string().email(),
  "personalInfo.phone": Joi.string().pattern(/^\+?[0-9\s-]{7,15}$/),
  "personalInfo.location": Joi.string(),
  "personalInfo.summary": Joi.string().max(500),
})
};



export const patchExperienceSchema = {
  [Segments.BODY]:Joi.object({
  company: Joi.string(),
  position: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date().allow(null),
  description: Joi.string(),
  isCurrent: Joi.boolean(),
})
};
export const patchEducationSchema = {
  [Segments.BODY]:Joi.object({
  institution: Joi.string(),
  degree: Joi.string().max(50),
  graduationYear: Joi.number(),
})
};

export const patchLanguageSchema = {
  [Segments.BODY]: Joi.object({
  name: Joi.string(),
  level: Joi.string().valid('Basic', 'Intermediate', 'Upper-Intermediate', 'Advanced'),
})
};
