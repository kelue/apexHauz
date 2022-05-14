const findCategoryById = `
SELECT * FROM categories WHERE id = ?
`;

module.exports = {
    findCategoryById
}