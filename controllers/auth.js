const crypto = require('crypto');
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');
const sendEmail = require('../utils/sendEmail');

exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password
        });
        /*  res.status(201).json({
             succes: true,
             user
         })*/
        sendToken(user, 201, res);
    } catch (error) {
        /* res.status(500).json({
            succes: false,
            error: error.message
        }) */
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        /*   res.status(400).json({
              succes: false,
              error: 'Please Provide Name or Password'
          }) */
        return next(new ErrorResponse('Please Provide Name or Password', 400))
    }

    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            /* res.status(404).json({ succes: false, error: 'Invalid Credentials' }) */
            return next(new ErrorResponse('Invalid Credentials', 404));
        }

        const isMatch = await user.matchPasswords(password);

        if (!isMatch) {
            /* res.status(404).json({ succes: false, error: 'Invalid Credentials' }) */
            return next(new ErrorResponse('Invalid Credentials', 404));
        }

        /* res.status(200).json({
            succes: true,
            token: "dfsdfgadsg"
        }) */
        console.log(user.username);
        sendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({ succes: false, error: error.message })
    }
}

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse('Email could not be sent', 404));
        }

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
            <h1>you have requested a new password reset</h1>
            <p>Please go to this link to reset your password</p>
            <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: message
            })

            res.status(200).json({ succes: true, data: 'email send' });
        } catch (error) {
            user.getResetPasswordToken = undefined;
            user.getResetPasswordExpired = undefined;

            await user.save();

            next(new ErrorResponse('Email could not be send', 500));

        }
    } catch (error) {
        next(error);
    }
}

exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse("Invalid Token", 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Updated Success",
            token: user.getSignedToken(),
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    /* const email = req.body.email; */
    const { email } = req.body;

    try {
        await User.findOneAndDelete(email);

        res.status(201).json({
            success: true,
            data: "User Deleted",
        });
        /*         console.log(email)
                res.send('hola ' + email) */

    } catch (error) {
        console.log('fail')
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
        succes: true,
        token,
        user: user.username
    })
}