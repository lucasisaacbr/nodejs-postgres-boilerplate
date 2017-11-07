(function () {
    "use strict";

    const dotenv = require("dotenv");
    dotenv.load();
    dotenv.config({"silent": true});

    const express = require("express");
    const bodyParser = require("body-parser");
    const engines = require("consolidate");

    const cfenv = require("cfenv");
    const port = process.env.PORT || 3001;
    const path = require("path");
    const fs = require("fs");

    // POSTGRES
    const db_config = require("./server/configs/postgres");
    const db_factory = require("./server/helpers/postgresFactory")(db_config);

    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname + '/client')));

    app.engine("html", engines.ejs);
    app.set("view engine", "ejs");
    app.set("views", __dirname + "/client");
    app.disable("x-powered-by");

    app.all("/*", function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-type, Accept, X-Access-Token, X-Key");

        if (req.method === "OPTIONS") {
            res.status(200).end();
        } else {
            next();
        }
    });


    app.listen(port, function () {
        console.log("Server is running on port "+ port);
        db_factory.make_query('SELECT * FROM public.spatial_ref_sys LIMIT 2').then(function(data) {
            console.log(data);

            db_factory.make_query('SELECT count(*) FROM public.spatial_ref_sys LIMIT 2').then(function (data) {
                console.log(data)
            });

        });
    });

}());