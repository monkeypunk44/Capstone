import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# Use a service account
cred = credentials.Certificate('./capstone-5d38a-firebase-adminsdk-yqcur-7c8c8dcaa7.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
def OpenPrices():
  file1 = open("QFPrices.txt","r")
  lines = file1.readlines()
  Parray = []

  count = 0

  for line in lines:
    if line.strip():
      Parray.append(line)
      Parray[count] = Parray[count].replace('ea','')
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

def OpenItems():
  file1 = open("QFItems.txt","r")
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
    
# add data into the database
def ProcessItems():

  Iarray = OpenItems()
  Parray = OpenPrices()
  count = 0 

  # mass data entery
  while count < len(Iarray):
    doc_ref = db.collection(u'Stores/QualityFoods/Products').document(u'{}'.format(Iarray[count]))
    doc_ref.set({
        u'Price': Parray[count],
        u'Sale': False,
        u'SalePrice': 0,
    })
    count += 1

def LookAtItems():

  users_ref = db.collection(u'Stores/QualityFoods/Products')
  docs = users_ref.stream()

  for doc in docs:
      print(f'{doc.id} => {doc.to_dict()}')

ProcessItems()