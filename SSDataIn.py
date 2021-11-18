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
    Iarray[a] = Iarray[a].replace('\n',' ')
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
  Products = {}
  Products['SuperStore'] = []
  while count < len(Iarray):

      Products['SuperStore'].append({
          'Product': Iarray[count],
          'Price': Parray[count],
          'Sale': False,
          'SalePrice': 0,
      })
      count += 1
  
  with open('data.json', 'w') as f:
      json.dump(Products, f) 

def ProcessJSON(CWord):


  myclient = pymongo.MongoClient("mongodb+srv://Admin:BvzV5L7bU1psvzz4@cluster0.2wysu.mongodb.net/GoodPricer?retryWrites=true&w=majority")
  mydb = myclient["GoodPricer"]
  mycol= mydb['Stores']
  print(mycol.find_one({},{"superstore": "Array", "Product": CWord}))

  if(mycol.find_one({},{"superstore": "Array", "Product": CWord}) == None):

    with open('data.json') as f:
      file = json.load(f)
    
    mycol.insert_one(file)
  

  myclient.close()

makeJSON()

ProcessJSON(FindCommonWord())
