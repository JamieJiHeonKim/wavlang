const express = require('express');
const router = express.Router()
const { validateUser, validate } = require('../middleware/validator');

const { googleSigninController, googleSignupController, createUser, signIn } = require('../controllers/userController');

router.post('/google-signin', googleSigninController);
router.post('/google-signup', googleSignupController);
router.post('/new_user', validateUser, validate, createUser);
router.post('/signin', signIn);

module.exports = router;