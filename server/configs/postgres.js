(function(){
    "use strict";

    const Pool = require('pg').Pool;
    const Client = require('pg').Client;

    const url = process.env.POSTGRES_URL;

    const pool = new Pool({
        "connectionString": url
    });

    const client = new Client({
        "connectionString": url
    });

    module.exports = {
        
        "pool": function(){
            return pool;
        },
        "client": function () {
            return client;
        }
    }

}());