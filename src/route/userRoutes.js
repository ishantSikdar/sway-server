const { Router } = require('express');
const { API_URI_SIGNUP, API_URI_SIGNIN, API_URI_USER_DETAILS, API_URI_USER_PHOTO, API_URI_USER_BANNER } = require('../constant/endpoints');
const { signupRoute, signinRoute, userDetailsRoute, editUserDetailsRoute, editUserProfilePictureRoute, editUserBannerPictureRoute } = require("../controller/userController");
const { validateBodyMiddleware, validateStringifiedBodyMiddleware } = require('../middleware/validation/validateBodyMiddleware');
const { signUpSchema, signInSchema, editUserSchema } = require('../validation/schema/user');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { multerUpload } = require('../config/multerConfig');

const router = Router();

router.post(API_URI_SIGNUP, multerUpload.single('image'), validateStringifiedBodyMiddleware(signUpSchema), signupRoute);
router.post(API_URI_SIGNIN, validateBodyMiddleware(signInSchema), signinRoute);
router.get(API_URI_USER_DETAILS, userAuthMiddleware, userDetailsRoute);
router.put(API_URI_USER_DETAILS, userAuthMiddleware, multerUpload.single('image'), validateStringifiedBodyMiddleware(editUserSchema), editUserDetailsRoute);
router.patch(API_URI_USER_PHOTO, userAuthMiddleware, multerUpload.single('image'), editUserProfilePictureRoute);
router.patch(API_URI_USER_BANNER, userAuthMiddleware, multerUpload.single('image'), editUserBannerPictureRoute);

module.exports = router;