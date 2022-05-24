const CreateError = require('http-errors');

const auth = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user?.is_admin) {
            throw new CreateError(403, 'Forbidden!');
        }
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