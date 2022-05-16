const { dropDB: dropDBQuery } = require('../database/queries/tables_queries');
const connection = require('../config/db.config.init');

(() => {
    connection.query(dropDBQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('DB Dropped');
        process.exit(0);
    });
})();