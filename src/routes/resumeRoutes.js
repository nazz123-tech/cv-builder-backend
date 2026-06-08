import { Router } from 'express';
import { addEducation, addExperience, addLanguage, createResume, deleteResume, getAllResumes, getResumeById, getResumesForAdmin, updateEducation, updateExperience, updateLanguage, updateResumePersInfo, updateSkills,  } from '../controllers/resumeControllers.js';
import { celebrate } from 'celebrate';
import { createResumeSchema, educationParamSchema, experienceParamSchema, languageParamSchema, patchEducationSchema, patchExperienceSchema, patchLanguageSchema, resumeIdParamSchema,  } from '../validations/resumeValidations.js';
import { authenticate } from '../middleware/authenticate.js';
const router=Router();

router.get('/admin/resumes',getResumesForAdmin);

router.use('/resumes',authenticate);

router.get('/resumes',getAllResumes);
router.post('/resumes',celebrate(createResumeSchema),createResume);
router.get('/resumes/:resumeId',celebrate(resumeIdParamSchema),getResumeById);
router.delete('/resumes/:resumeId',celebrate(resumeIdParamSchema), deleteResume);

router.patch('/resumes/:resumeId/personal',celebrate(resumeIdParamSchema),updateResumePersInfo);
router.patch('/resumes/:resumeId/skills',celebrate(resumeIdParamSchema),updateSkills);

router.post('/resumes/:resumeId/experience',celebrate(patchExperienceSchema),addExperience);
router.patch('/resumes/:resumeId/experience/:expId',celebrate(experienceParamSchema),celebrate(patchExperienceSchema),updateExperience);

router.post('/resumes/:resumeId/education',celebrate(patchEducationSchema),addEducation);
router.patch('/resumes/:resumeId/education/:eduId',celebrate(educationParamSchema),celebrate(patchEducationSchema),updateEducation);

router.post('/resumes/:resumeId/languages',celebrate(patchLanguageSchema),addLanguage);
router.patch('/resumes/:resumeId/language/:lanId',celebrate(languageParamSchema),celebrate(patchLanguageSchema),updateLanguage);




export default router;

