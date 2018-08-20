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
    #origin = str(start_station[0])+','+str(start_station[1])
    #print(origin)
    #destination = str(end_station[0])+','+str(end_station[1])
    travelMode = 'bicycling'
    payload = {'origin':start_station,'destination':end_station,'mode':travelMode,'key':key}
    r = requests.get(endpoint, params=payload)
    route_poly = (polyline.decode((r.json())['routes'][0]['overview_polyline']['points']))
    time.sleep(1)
    return route_poly

trips_df['route'] = trips_df.apply(lambda row: addRoute(row['start_station'], row['end_station']), axis=1)

#trips_df.to_csv("trips_route.csv", encoding='utf-8', sep=',' , index=False)