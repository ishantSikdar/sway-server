const { Router } = require('express');
const { signUp, signIn } = require('../constant/endpoints');
const userController = require("../controller/userController")

const router = Router();

router.post(signUp, userController.signup)
router.post(signIn, userController.signin)


module.exports = router;