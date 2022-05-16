const { createDB: createDBQuery } = require('../database/queries/tables_queries');
const connection = require('../config/db.config.init');

(() => {
    connection.query(createDBQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('DB Created');
        process.exit(0);
    });
})();