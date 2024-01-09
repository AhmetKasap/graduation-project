import pymongo
import json

from urllib.request import urlopen

# MongoDB connection
client = pymongo.MongoClient("mongodb://localhost:27017/")  
database_name = "find-car-location"  
db = client[database_name]
collection_name = "plaques"

# Verileri çek
plaques_collection = db[collection_name]
db_plaques = db[collection_name].find()
print(type(db_plaques))



def getLocation () :
    url = "https://ipinfo.io/json"
    response = urlopen(url)
    data = json.load(response)
    location = data['loc']
    return location
    



def detection () : 
    

    found_plaques = '34JKL34' # Bulunan trafik plakası
    found_location = getLocation()


    for data in db_plaques : # bulunan trafik plakası, veri tabanında var mı ? var ise bu plakayı' ve konumunu car_location_db aktarıyoruz.
        print(data["foundLocation"])
        print(data["plaqueName"])
        if(data["plaqueName"] == found_plaques) : 

            data["foundLocation"] = found_location

            plaques_collection.update_one(
                {"plaqueName": found_plaques},
                {"$set": {"foundLocation": found_location}}
            )

detection()



