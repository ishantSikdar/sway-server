const { Router } = require('express');
const { signUp, signIn } = require('../constant/endpoints');
const userController = require("../controller/userController");
const { validateBodyMiddleware } = require('../middleware/validation/validateBodyMiddleware');
const { signUpSchema, signInSchema } = require('../validation/schema/user');

const router = Router();

router.post(signUp, validateBodyMiddleware(signUpSchema), userController.signup);
router.post(signIn, validateBodyMiddleware(signInSchema), userController.signin);


module.exports = router;