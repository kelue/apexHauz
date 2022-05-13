const {
    createTableUsers: createTableUsersQuery,
    createTableCategories: createTableCategoriessQuery,
    createTableProperties: createTablePropertiesQuery,
    createPropertiesUserForeignKeys: createPropertiesUserForeignKeysQuery,
    createPropertiesCategoriesForeignKeys: createPropertiesCategoriesForeignKeysQuery,
} = require('../database/queries');
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
        process.exit(0);
    });

})();