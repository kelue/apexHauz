const { dropDB: dropDBQuery } = require('../database/queries');

(() => {
    require('../config/db.config').query(dropDBQuery, (err, _) => {
        if (err) {
            console.log("error: ", err);
            return;
        }
        console.log('DB Dropped');
        process.exit(0);
    });
})();