
import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { deleteUser, getCurrentUser, updateTheme, updateUserAvatar, updateUserInfo } from "../controllers/userControllers.js";
import { updateUserValidation } from "../validations/userValidations.js";
import { upload } from "../middleware/multer.js";
import { celebrate } from "celebrate";

const router = Router();

router.use('/users', authenticate);

router.get('/users/current',getCurrentUser);
router.patch(
  "/users/me/avatar",
  upload.single("avatar"),
  updateUserAvatar
);
router.patch(
  '/users/me',
  authenticate,
  upload.single('avatar'),
  celebrate(updateUserValidation),
  updateUserInfo,
);
router.patch('/users/me/theme',updateTheme);
router.delete('/users/me', deleteUser);

export default router;
