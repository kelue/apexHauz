const CreateError = require('http-errors');
const jwt = require('jsonwebtoken');
require('dotenv').config({
    path: '../../.env',
});

const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // const token = req.header('Authorization').replace('Bearer ', '');
        const cookies = req.signedCookies;

        if (!cookies?.authToken) throw new CreateError(401, 'Not Authorized');

        const token = cookies.authToken;

        if (!token) throw new CreateError(401, 'Not authorized!');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            throw new CreateError(401, 'Not authorized!') // TODO: Throw an instance of http-errors instead
        }

        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(error.status ?? 500).json({
            status: 'error',
            error: error.message ?? 'An error occured on the server. Try again or contact administrator if error persists.',
        })
    }
    // next()
}

module.exports = auth;