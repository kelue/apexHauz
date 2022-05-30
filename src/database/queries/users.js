const createNewUser = `
INSERT INTO users VALUES(null, ? , ? , ? , ? , ? , ? , ? , NOW(), NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ? 
`;

const findUserById = `
SELECT * FROM users WHERE id = ?
`;

const updateUserPassword = `
UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?
`;

module.exports = {
    createNewUser,
    findUserByEmail,
    findUserById,
    updateUserPassword
}