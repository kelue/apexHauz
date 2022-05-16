const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./secrets');

const generate = (id) => jwt.sign({ user_id: id }, JWT_SECRET_KEY, { expiresIn: '1d' });

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}