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
    if line.strip():
      Parray.append(line)
      Parray[count] = Parray[count].replace('ea','')
      Parray[count] = Parray[count].replace('/100gr','')
      # removes everything before the word "approx" and everything after "/" leaving only a number
      if "approx" in Parray[count]:
        price = Parray[count]
        price = price.split('x')[1].lstrip().split("/")[0].rstrip()
        Parray[count] = price
      # removes everything so only a number is left
      if "/kg" in Parray[count]:
        price = Parray[count]
        price = price.split("/")[0].rstrip()
        Parray[count] = price
      # removes the cent symbol and adds a "." before a number
      if "Â¢" in Parray[count]:
        Parray[count] = Parray[count].replace('Â¢','')
        Parray[count] = " ."+Parray[count]
      Parray[count] = Parray[count].replace(' ','')
      # removes a "/", does a division to get a price for a things/price(exp. 2/5)
      if "/" in Parray[count]:
        first = float(Parray[count].split("/")[0].rstrip())
        sec = float(Parray[count].split("/")[1].lstrip())
        price = str(round(sec/first,2))
        Parray[count] = price
      Parray[count] = float(Parray[count])
      count += 1
  return(Parray)

def OpenItems(id):
  file1 = open(id,"r")
  lines = file1.readlines()
  Iarray = []

  count = 1
  a = 0
  for line in lines:
    if line.strip():
      if count%3!= 0:
        Iarray.append(line)
        Iarray[a] = Iarray[a].strip()
        # replaces "/" with a space so data maybe entered into the database
        if "/" in Iarray[a]:
          Iarray[a] = Iarray[a].replace('/',' ')
        a += 1 
    count += 1  
  return(Iarray)

def makeJSON():
  
  Iarray = OpenItems("QFItems.txt")
  Parray = OpenPrices("QFPrices.txt")
  count = 0 
  Products = []
  # Products['QualityFoods'] = []
  while count < len(Iarray):

      Products.append({
          'Product': Iarray[count],
          'Price': Parray[count],
          'Sale': False,
          'SalePrice': 0,
      })
      count += 1
  
  with open('QFdata.json', 'w') as f:
      json.dump(Products, f) 

def FindCommonWord():
  CWord = ""
  most_occur = ""
  with open('QFItems.txt') as f:
    text = f.read()

  words = re.compile(r"[\w']+", re.U).findall(text)
  
  counts = Counter(words)
  CWord = counts.most_common(1)[0][0]
  print(CWord)
  return CWord 

# add data into the database
def ProcessJSON(CWord):

  myclient = pymongo.MongoClient("mongodb+srv://Admin:BvzV5L7bU1psvzz4@cluster0.2wysu.mongodb.net/GoodPricer?retryWrites=true&w=majority")
  mydb = myclient["GoodPricer"]
  mycol= mydb['QualityFoods']
  myquery = {"Product" : {"$regex":CWord, '$options':'i'}}

  result = mycol.find(myquery)

  # Enters Json if the query is empty
  if(result.count() == 0 ):

    with open('QFdata.json') as f:
      file = json.load(f)
    
    mycol.insert_many(file)
  

  myclient.close()


makeJSON()
ProcessJSON(FindCommonWord())