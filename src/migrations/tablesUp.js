const { createTableUsers: createTableUsersQuery } = require('../database/queries');
db = require('../config/db.config');

(() => {
    db.query(createTableUsersQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('Users Table Created Successfully');
        process.exit(0);
    });
})();