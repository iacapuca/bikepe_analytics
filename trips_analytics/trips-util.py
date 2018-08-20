import pandas as pd
import requests
import json
import polyline
import time
import config

endpoint = "https://maps.googleapis.com/maps/api/directions/json?"
key = config.key

trips_df = pd.read_csv("trips.csv", encoding = 'utf8')
trips_df.set_index('duration_seconds')

def addRoute(start_station,end_station):
    origin = str(start_station[0])
    destination = str(end_station[0])
    travelMode = 'bicycling'
    payload = {'origin':origin,'destination':destination,'mode':travelMode,'key':key}
    print(payload)
    r = requests.get(endpoint, params=payload)
    route = polyline.decode((r.json())['routes'][0]['overview_polyline']['points'])
    print("Finalizando envio")
    time.sleep(5)
    return route

#addRoute((-8.0327102,-34.8967708),(-8.0625979,-34.872696))
trips_df['route'] = trips_df.apply(addRoute(trips_df['start_station'],trips_df['end_station']))