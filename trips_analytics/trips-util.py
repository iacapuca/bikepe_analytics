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
    origin = str(start_station[0])+','+str(start_station[1])
    destination = str(end_station[0])+','+str(end_station[1])
    travelMode = 'bicycling'
    payload = {'origin':origin,'destination':destination,'mode':travelMode,'key':key}
    r = requests.get(endpoint, params=payload)
    print(r.url)
    route_poly = (polyline.decode((r.json())['routes'][0]['overview_polyline']['points']))
    return route_poly

print(addRoute((-8.0625979,-34.872696),(-8.0625979,-34.872696)))
#trips_df['route'] = trips_df.apply(addRoute(trips_df['start_station'],trips_df['end_station']))