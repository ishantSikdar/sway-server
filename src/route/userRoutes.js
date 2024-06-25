const { Router } = require('express');
const { API_URI_SIGNUP, API_URI_SIGNIN, API_URI_USER_DETAILS } = require('../constant/endpoints');
const { signupRoute, signinRoute, userDetailsRoute, editUserDetailsRoute } = require("../controller/userController");
const { validateBodyMiddleware, validateStringifiedBodyMiddleware } = require('../middleware/validation/validateBodyMiddleware');
const { signUpSchema, signInSchema } = require('../validation/schema/user');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');
const { multerUpload } = require('../config/multerConfig');

const router = Router();

router.post(API_URI_SIGNUP, multerUpload.single('image'), validateStringifiedBodyMiddleware(signUpSchema), signupRoute);
router.post(API_URI_SIGNIN, validateBodyMiddleware(signInSchema), signinRoute);
router.get(API_URI_USER_DETAILS, userAuthMiddleware, userDetailsRoute);
router.put(API_URI_USER_DETAILS, userAuthMiddleware, multerUpload.single('image'), editUserDetailsRoute);

module.exports = router;