const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controller/userController')
const { validateRequest } = require('../middleware/validateRequest');
const { createUserSchema, loginUserSchema } = require('../validationSchemas/userSchema');


router.route('/').post(validateRequest(createUserSchema), registerUser);
router.post('/login', validateRequest(loginUserSchema), authUser)
module.exports = router;