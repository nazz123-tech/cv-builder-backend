import { Router } from 'express';
import { createResume, getResumes } from '../controllers/resumeControllers.js';

const router=Router();

router.get('/resumes',getResumes);

router.post('/resumes',createResume);


export default router;

