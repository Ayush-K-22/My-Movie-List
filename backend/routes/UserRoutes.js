import express from "express"
import
{createUser, updateUserInfo, loginUser, logOutCurUser, getAllUsers, curUserprofile}
from "../controllers/userController.js";
import {authorizeAdmin, authenticate} from "../middlewares/authMiddleware.js"
const router = express.Router();

router.route('/')
    .post(createUser)
    .get(authenticate, authorizeAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logOutCurUser);
router.route('/profile')
    .get(authenticate, curUserprofile)
    .put(authenticate, updateUserInfo);

export default router;