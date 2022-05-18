const createResetToken = `
INSERT INTO password_resets (user_id, token, created_at, updated_at) VALUES (?, ?, NOW(), NOW())
`;

const updateResetToken = `
UPDATE password_resets SET token = ?, updated_at = NOW() WHERE user_id = ?
`;

const findResetTokenRowByUserId = `
SELECT * FROM password_resets WHERE user_id = ?
`;

module.exports = {
    createResetToken,
    updateResetToken,
    findResetTokenRowByUserId
}