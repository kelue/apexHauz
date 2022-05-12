const { createDB: createDBQuery } = require('../database/queries');

(() => {
    require('../config/db.config').query(createDBQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('DB Created');
        process.exit(0);
    });
})();