const express = require('express');
const router = express.Router();

const { register, login, forgotPassword, resetPassword, deleteUser } = require('../controllers/auth');

router.route('/register').post(register);

router.route('/login').post(login);

router.route('/forgotPassword').post(forgotPassword);

router.route('/resetPassword/:resetToken').put(resetPassword);

router.route('/deleteUser').delete(deleteUser);

module.exports = router;