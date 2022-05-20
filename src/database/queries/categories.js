const findCategoryById = `
SELECT * FROM categories WHERE id = ?
`;

const findCategoryByName = `
SELECT * FROM categories WHERE name = ?
`;

module.exports = {
    findCategoryById,
    findCategoryByName
}