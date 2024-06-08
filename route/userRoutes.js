const { Router } = require('express');
const { API_URI_SIGNUP, API_URI_SIGNIN, API_URI_USER_DETAILS } = require('../constant/endpoints');
const { signupRoute, signinRoute, homeRoute, userDetailsRoute } = require("../controller/userController");
const { validateBodyMiddleware } = require('../middleware/validation/validateBodyMiddleware');
const { signUpSchema, signInSchema } = require('../validation/schema/user');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');

const router = Router();

router.post(API_URI_SIGNUP, validateBodyMiddleware(signUpSchema), signupRoute);
router.post(API_URI_SIGNIN, validateBodyMiddleware(signInSchema), signinRoute);
router.get(API_URI_USER_DETAILS, userAuthMiddleware, userDetailsRoute);


module.exports = router;