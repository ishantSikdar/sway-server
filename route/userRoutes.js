const { Router } = require('express');
const { signup, signin } = require('../constant/endpoints');
const userController = require("../controller/userController")

const router = Router();

router.post(signup, userController.signup)
router.post(signin, userController.signin)


module.exports = router;