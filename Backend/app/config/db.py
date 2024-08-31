from pymongo import MongoClient

client = MongoClient("mongodb+srv://ubiquo:55O85Wh%40b6%401GTQO%24%24XbO9@atlascluster.1jpotvm.mongodb.net/heroes?retryWrites=true&w=majority")
conn = client.heroes