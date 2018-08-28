(function () {
    "use strict";

    module.exports = function (db_config){

        db_config.client().connect();

        return {
            "make_query": function(query){
                return new Promise(function (resolve, reject) {
                    db_config.pool().query(query, (err, data) => {
                        if(err){
                            db_config.client().end();
                            reject(err);
                        }
                        db_config.client().end();
                        resolve(data);
                    });
                });
            }
        }
    }

}());
