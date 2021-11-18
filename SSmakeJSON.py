import json
from SSDataIn import OpenItems
from SSDataIn import OpenPrices
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

    

makeJSON()
