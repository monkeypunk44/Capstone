import pymongo
import json
import re
from collections import Counter 

def OpenPrices(id):
  file1 = open(id,"r")
  lines = file1.readlines()
  Parray = []

  count = 0

  for line in lines:
    Parray.append(line)
    Parray[count] = Parray[count].replace('$','')
    Parray[count] = float(Parray[count])
    count += 1
  return(Parray)

def OpenItems(id):
  file1 = open(id,"r")
  lines = file1.readlines()
  Iarray = []
  a = 0
  for line in lines:
    Iarray.append(line)
    Iarray[a] = Iarray[a].replace('\n','')
    Iarray[a] = Iarray[a].replace('\u00c2','')
    Iarray[a] = Iarray[a].replace('\u00a0','')
    Iarray[a] = Iarray[a].replace('\u201e','')
    Iarray[a] = Iarray[a].replace('\u00e2','')
    Iarray[a] = Iarray[a].replace('\u00a2','')
    a += 1 
  return(Iarray)

def FindCommonWord():
  CWord = ""
  most_occur = ""
  with open('SSItems.txt') as f:
    text = f.read()

  words = re.compile(r"[\w']+", re.U).findall(text)
  
  counts = Counter(words)
  CWord = counts.most_common(1)[0][0]

  return CWord 

def makeJSON():
  
  Iarray = OpenItems("SSItems.txt")
  Parray = OpenPrices("SSPrices.txt")
  count = 0 
  Products = []
  while count < len(Iarray):

      Products.append({
          'Product': Iarray[count],
          'Price': Parray[count],
          'Sale': False,
          'SalePrice': 0,
      })
      count += 1
  
  with open('SSdata.json', 'w') as f:
      json.dump(Products, f) 

# add data into the database
def ProcessJSON(CWord):
  
  myclient = pymongo.MongoClient("mongodb+srv://Admin:BvzV5L7bU1psvzz4@cluster0.2wysu.mongodb.net/GoodPricer?retryWrites=true&w=majority")
  mydb = myclient["GoodPricer"]
  mycol= mydb['SuperStore']
  myquery = {"Product" : {"$regex":CWord, '$options':'m'}}
  
  result = mycol.find(myquery)

  # enters Json if the query is empty
  if(result.count() == 0 ):
    with open('SSData.json') as f:
      file = json.load(f)
    
    mycol.insert_many(file)

  myclient.close()

makeJSON()
ProcessJSON(FindCommonWord())