const User = require('../models/User');

const signInUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.genAuthToken();

        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000,
            signed: true,
        });

        res.status(200).json({
            status: 'success',
            data: user,
            token,
        })
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const signUpUser = async (req, res) => {
    const user = User.build(req.body);
    try {
        await user.save();
        res.status(201).json({
            status: 'success',
            data: user,
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

const signOutUser = async (req, res) => {
    try {
        const token = req.signedCookies.authToken;
        console.log(token);
        if (!token) throw createError(401, 'Not Authenticated!!!');

        res.cookie('authToken', '', {
            expires: new Date(Date.now() - 1000000000000),
        });
        res.status(200).json({
            status: 'success',
            data: {},
        });
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
}

module.exports = {
    signInUser,
    signUpUser,
    signOutUser,
}