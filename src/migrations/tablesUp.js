const {
    createTableUsers: createTableUsersQuery,
    createTableCategories: createTableCategoriesQuery,
    createTableProperties: createTablePropertiesQuery,
    createTableImages: createTableImagesQuery,
    createPasswordResetsTable: createPasswordResetsTableQuery,
    createPropertiesUserForeignKeys: createPropertiesUserForeignKeysQuery,
    createPropertiesCategoriesForeignKeys: createPropertiesCategoriesForeignKeysQuery,
    createImagesPropertyForeignKeys: createImagesPropertyForeignKeysQuery,
    createPasswordResetsUserForeignKeys: createPasswordResetsUserForeignKeysQuery
} = require('../database/queries/tables_queries');
const { connection: db } = require('../config/db.config');

db.query(createTableUsersQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Users Table Created Successfully');
});
db.query(createTableCategoriesQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Categories Table Created Successfully');
});
db.query(createTablePropertiesQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Properties Table Created Successfully');
});
db.query(createTableImagesQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Images Table Created Successfully');
});
db.query(createPasswordResetsTableQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Password Resets Table Created Successfully');
});
db.query(createPropertiesUserForeignKeysQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Properties & Users Foreign Keys Created Successfully');
});
db.query(createPropertiesCategoriesForeignKeysQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Properties & Categories Foreign Keys Created Successfully');
});
db.query(createImagesPropertyForeignKeysQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Images & Properties Foreign Keys Created Successfully');
});
db.query(createPasswordResetsUserForeignKeysQuery, (err, _) => {
    if (err) {
        console.log("error: ", err);
        return;
    }
    console.log('Password_resets & Users Foreign Keys Created Successfully');
    process.exit(0);
});
