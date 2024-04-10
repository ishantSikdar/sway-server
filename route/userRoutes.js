const { Router } = require('express');
const { signUp, signIn, home } = require('../constant/endpoints');
const { signupRoute, signinRoute, homeRoute } = require("../controller/userController");
const { validateBodyMiddleware } = require('../middleware/validation/validateBodyMiddleware');
const { signUpSchema, signInSchema } = require('../validation/schema/user');
const { userAuthMiddleware } = require('../middleware/authentication/jwtAuthMiddleware');

const router = Router();

router.post(signUp, validateBodyMiddleware(signUpSchema), signupRoute);
router.post(signIn, validateBodyMiddleware(signInSchema), signinRoute);


module.exports = router;