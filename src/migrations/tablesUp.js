const {
    createTableUsers: createTableUsersQuery,
    createTableCategories: createTableCategoriessQuery,
    createTableProperties: createTablePropertiesQuery,
    createTableImages: createTableImagesQuery,
    createTableReports: createTableReportsQuery,
    createPasswordResetsTable: createPasswordResetsTableQuery,
    createPropertiesUserForeignKeys: createPropertiesUserForeignKeysQuery,
    createPropertiesCategoriesForeignKeys: createPropertiesCategoriesForeignKeysQuery,
    createImagesPropertyForeignKeys: createImagesPropertyForeignKeysQuery,
    createReportsUsersForeignKeys: createReportsUsersForeignKeysQuery,
    createReportsPropertiesForeignKeys: createReportsPropertiesForeignKeysQuery,
    createPasswordResetsUserForeignKeys: createPasswordResetsUserForeignKeysQuery
} = require('../database/queries/tables_queries');
db = require('../config/db.config');

(() => {
    db.query(createTableUsersQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Users Table Created Successfully');
    });
    db.query(createTableCategoriessQuery, (err, _) => {
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
    db.query(createTableReportsQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Reports Table Created Successfully');
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
    db.query(createReportsUsersForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Reports & Users Foreign Keys Created Successfully');
    });
    /* Creating a foreign key between the reports and properties tables. */
    db.query(createReportsPropertiesForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Reports & Properties Foreign Keys Created Successfully');
    });
    db.query(createPasswordResetsUserForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Password_resets & Users Foreign Keys Created Successfully');
        process.exit(0);
    });

})();