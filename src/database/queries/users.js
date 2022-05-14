const createNewUser = `
INSERT INTO users VALUES(null, ? , ? , ? , ? , ? , ? , ? , NOW(), NOW())
`;


const findUserByEmail = `
SELECT * FROM users WHERE email = ? `;

module.exports = {
    createNewUser,
    findUserByEmail
}