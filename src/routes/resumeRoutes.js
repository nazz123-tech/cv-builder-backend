import { Router } from 'express';
import { createResume, deleteResume, getResumeById, getResumes, updateEducation, updateExperience, updateLanguage, updateResumePersInfo, updateSkills,  } from '../controllers/resumeControllers.js';
import { celebrate } from 'celebrate';
import { createResumeSchema, educationParamSchema, experienceParamSchema, languageParamSchema, patchEducationSchema, patchExperienceSchema, patchLanguageSchema, resumeIdParamSchema,  } from '../validations/resumeValidations.js';

const router=Router();

router.get('/resumes',getResumes);
router.post('/resumes',celebrate(createResumeSchema),createResume);
router.get('/resumes/:resumeId',celebrate(resumeIdParamSchema),getResumeById);
router.patch('/resumes/:resumeId',celebrate(resumeIdParamSchema),updateResumePersInfo);
router.patch('/resumes/:resumeId/experience/:expId',celebrate(experienceParamSchema),celebrate(patchExperienceSchema),updateExperience);
router.patch('/resumes/:resumeId/education/:eduId',celebrate(educationParamSchema),celebrate(patchEducationSchema),updateEducation);
router.patch('/resumes/:resumeId/language/:lanId',celebrate(languageParamSchema),celebrate(patchLanguageSchema),updateLanguage);
router.patch('/resumes/:resumeId/skills',celebrate(resumeIdParamSchema),updateSkills);
router.delete('/resumes/:resumeId',celebrate(resumeIdParamSchema), deleteResume);


export default router;

