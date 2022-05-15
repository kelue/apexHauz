const { dropDB: dropDBQuery } = require('../database/queries/tables_queries');
db = require('../config/db.config');

(() => {
    db.query(dropDBQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('DB Dropped');
        process.exit(0);
    });
})();