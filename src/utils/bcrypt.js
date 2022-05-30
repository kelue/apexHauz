const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, 10);
}

const passwordMatched = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    passwordMatched,
}