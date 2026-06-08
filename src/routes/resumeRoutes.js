import { Router } from 'express';
import { addEducation, addExperience, addLanguage, createResume, deleteResume,deleteEducation,deleteExperience,deleteLanguage, deleteSkill, getAllResumes, getResumeById, updateEducation, updateExperience, updateLanguage, updateResumePersInfo, updateSkills,  } from '../controllers/resumeControllers.js';
import { celebrate } from 'celebrate';
import { createResumeSchema, educationParamSchema, experienceParamSchema, languageParamSchema, patchEducationSchema, patchExperienceSchema, patchLanguageSchema, resumeIdParamSchema,  } from '../validations/resumeValidations.js';
import { authenticate } from '../middleware/authenticate.js';
const router=Router();


router.use('/resumes',authenticate);

router.get('/resumes',getAllResumes);
router.post('/resumes',celebrate(createResumeSchema),createResume);
router.get('/resumes/:resumeId',celebrate(resumeIdParamSchema),getResumeById);
router.delete('/resumes/:resumeId',celebrate(resumeIdParamSchema), deleteResume);

router.patch('/resumes/:resumeId/personal',celebrate(resumeIdParamSchema),updateResumePersInfo);
router.patch('/resumes/:resumeId/skills',celebrate(resumeIdParamSchema),updateSkills);
router.delete('/resumes/:resumeId/skills', celebrate(resumeIdParamSchema) , deleteSkill);

router.post('/resumes/:resumeId/experience', celebrate(patchExperienceSchema), addExperience);
router.patch('/resumes/:resumeId/experience/:expId', celebrate(experienceParamSchema), celebrate(patchExperienceSchema), updateExperience);
router.delete('/resumes/:resumeId/experience/:expId', celebrate(experienceParamSchema), deleteExperience);

router.post('/resumes/:resumeId/education', celebrate(patchEducationSchema), addEducation);
router.patch('/resumes/:resumeId/education/:eduId', celebrate(educationParamSchema), celebrate(patchEducationSchema), updateEducation);
router.delete('/resumes/:resumeId/education/:eduId', celebrate(educationParamSchema), deleteEducation);

router.post('/resumes/:resumeId/languages', celebrate(patchLanguageSchema), addLanguage);
router.patch('/resumes/:resumeId/languages/:lanId', celebrate(languageParamSchema), celebrate(patchLanguageSchema), updateLanguage);
router.delete('/resumes/:resumeId/languages/:lanId', celebrate(languageParamSchema), deleteLanguage);

export default router;

