import pymongo
import json

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
    

def ProcessItems():

  # Iarray = OpenItems("SSItems.txt")
  # Parray = OpenPrices("SSPrices.txt")
  # count = 0 

  myclient = pymongo.MongoClient("mongodb+srv://Admin:BvzV5L7bU1psvzz4@cluster0.2wysu.mongodb.net/GoodPricer?retryWrites=true&w=majority")
  mydb = myclient["GoodPricer"]
  mycol= mydb['Stores']

  with open('data.json') as f:
    file = json.load(f)

  mycol.insert_one(file)

  myclient.close()
  # while count < 1:
    
  #   Product = {
  #       'Product': Iarray[count],
  #       'Price': Parray[count],
  #       'Sale': False,
  #       'SalePrice': 0,
  #   } 
    
  #   x = mycol.insert_one(Product)
  #   print("\n\n")
  #   count += 1
ProcessItems()
