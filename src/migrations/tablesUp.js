/* Importing the queries from the tables_queries.js file. */
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


/* Importing the database configuration file. */
db = require('../config/db.config');

(() => {
    /* Creating a table called users. */
    db.query(createTableUsersQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Users Table Created Successfully');
    });

    /* Creating a table called categories. */
    db.query(createTableCategoriessQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Categories Table Created Successfully');
    });

    /* Creating a table called properties. */
    db.query(createTablePropertiesQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Properties Table Created Successfully');
    });

    /* Creating a table called images. */
    db.query(createTableImagesQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Images Table Created Successfully');
    });

    /* Creating a table called reports. */
    db.query(createTableReportsQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Reports Table Created Successfully');
    });

    /* Creating a table called password_resets. */
    db.query(createPasswordResetsTableQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Password Resets Table Created Successfully');
    });

    /* Creating a foreign key between the properties and users tables. */
    db.query(createPropertiesUserForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Properties & Users Foreign Keys Created Successfully');
    });

    /* Creating a foreign key between the properties and categories tables. */
    db.query(createPropertiesCategoriesForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Properties & Categories Foreign Keys Created Successfully');
    });

    /* Creating a foreign key between the images and properties tables. */
    db.query(createImagesPropertyForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Images & Properties Foreign Keys Created Successfully');
    });

    /* Creating a foreign key between the reports and users tables. */
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


    /* Creating a foreign key between the password_resets and users tables. */
    db.query(createPasswordResetsUserForeignKeysQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Password_resets & Users Foreign Keys Created Successfully');
        process.exit(0);
    });

})();