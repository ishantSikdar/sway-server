const { Router } = require('express');
const { API_URI_SIGNUP, API_URI_SIGNIN } = require('../constant/endpoints');
const { signupRoute, signinRoute, homeRoute } = require("../controller/userController");
const { validateBodyMiddleware } = require('../middleware/validation/validateBodyMiddleware');
const { signUpSchema, signInSchema } = require('../validation/schema/user');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');

const router = Router();

router.post(API_URI_SIGNUP, validateBodyMiddleware(signUpSchema), signupRoute);
router.post(API_URI_SIGNIN, validateBodyMiddleware(signInSchema), signinRoute);


module.exports = router;