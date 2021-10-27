import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# Use a service account
cred = credentials.Certificate('../capstone-5d38a-firebase-adminsdk-yqcur-7c8c8dcaa7.json')
firebase_admin.initialize_app(cred)

db = firestore.client()




def ProcessItems(items, prices):
  doc_ref = db.collection(u'Stores/SuperStore/Products').document(u'Honeycrisp Apples')
  doc_ref.set({
      u'Price': 2.11,
      u'Sale': False,
      u'SalePrice': 0,
  })
def LookAtItems():
  users_ref = db.collection(u'Stores/SuperStore/Products')
  docs = users_ref.stream()

  for doc in docs:
      print(f'{doc.id} => {doc.to_dict()}')