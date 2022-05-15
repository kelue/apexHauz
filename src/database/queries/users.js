const createNewUser = `
INSERT INTO users VALUES(null, ? , ? , ? , ? , ? , ? , ? , NOW(), NOW())
`;

const findUserByEmail = `
SELECT * FROM users WHERE email = ? 
`;

const findUserById = `
SELECT * FROM users WHERE id = ?
`;

module.exports = {
    createNewUser,
    findUserByEmail,
    findUserById
}