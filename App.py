import flask
import pymongo
import json
import re
from collections import Counter 
from bson.json_util import dumps
from flask import request, jsonify
from flask_cors import CORS


app = flask.Flask(__name__)
CORS(app)

# Create some test data for our catalog in the form of a list of dictionaries.
myclient = pymongo.MongoClient("mongodb+srv://User:x7Zsno4aTrtZoMg0@cluster0.2wysu.mongodb.net/GoodPricer?")
mydb = myclient["GoodPricer"]
mycol= mydb['SuperStore']


# A route to return all of the available entries in our catalog.
@app.route('/api/GoodPricer', methods=['GET'])
def api_all():
    item = request.args["item"]
    myquery = {"Product" : {"$regex": item, '$options':'i'}}

    result = mycol.find(myquery)
    list_result = list(result)
    json_data = dumps(list_result)

    return json_data

app.run()