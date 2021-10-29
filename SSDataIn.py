import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# Use a service account
cred = credentials.Certificate('./capstone-5d38a-firebase-adminsdk-yqcur-7c8c8dcaa7.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
def OpenPrices():
  file1 = open("SSPrices.txt","r")
  lines = file1.readlines()
  Parray = []

  count = 0

  for line in lines:
    Parray.append(line)
    Parray[count] = Parray[count].replace('$','')
    Parray[count] = float(Parray[count])
    count += 1
  return(Parray)

def OpenItems():
  file1 = open("SSItems.txt","r")
  lines = file1.readlines()
  Iarray = []

  for line in lines:
    Iarray.append(line)
  return(Iarray)
    

def ProcessItems():

  Iarray = OpenItems()
  Parray = OpenPrices()
  count = 0 

  while count < len(Iarray):
    doc_ref = db.collection(u'Stores/SuperStore/Products').document(u'{}'.format(Iarray[count]))
    doc_ref.set({
        u'Price': Parray[count],
        u'Sale': False,
        u'SalePrice': 0,
    })
    count += 1

def LookAtItems():

  users_ref = db.collection(u'Stores/SuperStore/Products')
  docs = users_ref.stream()

  for doc in docs:
      print(f'{doc.id} => {doc.to_dict()}')

ProcessItems()