'use strict';

const express = require('express');
const app = express();

const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = "mongodb://....................";
const DATABASE_NAME = "beonaiunddce852";
const COLLECTION_NAME = "Resources";

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/data", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
      });
});

var database, collection;

app.listen(8080, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_NAME);

        console.log("Running on port 8080 - connected to `" + DATABASE_NAME + "`\nto test, make a request to http://localhost:8080/data");
    });
});