from geopy.geocoders import Nominatim
from geopy.distance import vincenty
from lxml import html
from xml.parsers import expat

import csv
import geojson as geoj
import json
import math
import random
import requests
import xml.etree.ElementTree as etree

print ('ah baby it"s going...')

geolocator = Nominatim()

data = []
entry = {}
geojson = {}
counterStart = 1
counterMid = 0
counterMid1 = 0
counterMid2 = 0
counterMid3 = 0
counterMid4 = 0
counterEnd = 0
latloncount = 0
brim = 1

indices = random.sample(range(1,7000), 600)

results = []
geojson["type"] = "FeatureCollection"

train = open('adolescenttrain.csv')
train_csv = csv.reader(train)

add = open('data/addresses.csv')
add_csv = csv.reader(add)

latlonz = open('data/latlons.csv')
latlonz_csv = csv.reader(latlonz)
rowz = list(latlonz_csv)

greatschools = etree.parse('detroitgreatschools.xml').getroot()
'''
with open('fire_data.json') as fire_file:
    fires = json.load(fire_file)
'''
with open('major_crimes.json') as major_crime_file:
    major_crimes = json.load(major_crime_file)

with open('bus_stops.json') as bus_stop_file:
    bus_stops = json.load(bus_stop_file)

with open('dep_pol_dep.json') as pds_file:
    pds = json.load(pds_file)

with open('businesses.json') as businesses_file:
    businesses = json.load(businesses_file)

with open('dep_pol_dep.json') as dpd_file:
    dpds = json.load(dpd_file)

with open('dps_locations.geojson') as dps_file:
    dps = geoj.load(dps_file)

with open('dplibs.geojson') as dplibs_file:
    dplibs = geoj.load(dplibs_file)

with open('Recreation_Centers.geojson') as rec_file:
    rec_centers = geoj.load(rec_file)

editCounter = 1

with open('data/blight_train_out.csv', 'w') as csvoutput:
    writer = csv.writer(csvoutput, lineterminator='\n')

    master = []
    row0 = train_csv.next()

    row0.append('compliance_det')
    row0.append('4th_root_of_fine_amt')
    # Education
    row0.append('float_dist_to_pub_school_with_rating_of_4+')
    row0.append('float_avg_dist_to_school_elem+mid+high')
    row0.append('bool_closest_school_lot_is_not_open')
    # Public Safety
    row0.append('float_time_since_crime_occurred_within_.25_mi_before_ticket')
    row0.append('float_dist_to_police_station')
    row0.append('float_num_of_fires_within_.25_mi')
    # Recreation
    row0.append('float_dist_to_library')
    row0.append('float_dist_to_rec_center')
    row0.append('lat')
    row0.append('lon')

    master.append(row0)

    for row in train_csv:
        # if (editCounter in indices):
        try:
            try:
                address = row[4] + row[5].lower()
                for row in latlonz_csv:
                    if (address in row):
                        lon = float(row[2])
                        lat = float(row[1])
            except:
                print(address)
            elem_mid_high_distances = [999, 999, 999]
            dist_to_4_star_school = 9999
            school_close_dist = 99999
            bool_closest_school_lot_is_not_open = "Open"
            crime_count = 0
            stop_count = 0
            bus_stop_count = 0
            bus_count = 0
            lowest_dpd_dist = 89898
            lowest_rc_dist = 777
            lowest_lib_dist = 565

            # FLOAT: DISTANCE TO SCHOOL WITH A GREAT SCHOOLS RATING OF AT LEAST 4

            for school in greatschools.findall("school"):
                try:
                    if (school[5] >= 4):
                        dist = vincenty((lat, lon), (float(school[16].text), float(school[17].text))).miles
                        if (dist < dist_to_4_star_school):
                            dist_to_4_star_school = dist
                except:
                    dist_to_4_star_school = 99902
            if (row[32] == "compliant by early payment" or
                row[32] == "compliant by on-time payment" or
                row[32] == "compliant by payment on unknown date" or
                row[32] == "compliant by payment with no scheduled hearing"):
                row.append("compliant")
            elif (row[32] == "compliant by late payment within 1 month" or
                  row[32] == "non-compliant by late payment more than one month"):
                row.append("late payment")
            elif (row[32] == "non-compliant by no payment"):
                row.append("non-compliant")
            else:
                row.append("not responsible")

            # BOOL: WHETHER CLOSEST SCHOOL IS CLOSED

            for feat in dps["features"]:
                lat_sch = feat["geometry"]["coordinates"][0][1]
                lon_sch = feat["geometry"]["coordinates"][0][0]
                school_dist = vincenty((lat, lon), (lat_sch, lon_sch)).miles
                if (school_dist < school_close_dist):
                    school_close_dist = school_dist
                    if("CLOSE" in feat["properties"]["propaction"]):
                        bool_closest_school_lot_is_not_open = "Closed"
                    else:
                        bool_closest_school_lot_is_not_open = "Open"

            # INT: NUM OF MAJOR CRIMES WITHIN .25 MI OF ADDRESS

            for crime in major_crimes["data"]:
                crime_lat = crime[-1][-4]
                crime_lon = crime[-1][-3]
                crime_dist = vincenty((lat, lon), (crime_lat, crime_lon)).miles
                if (crime_dist <= .25):
                    crime_count += 1

            # INT: NUM OF BUS STOPS WITHIN .25 MI OF ADDRESS

            for stop in bus_stops:
                try:
                    stop_lat = stop["sitelocation"]["coordinates"][1]
                    stop_lon = stop["sitelocation"]["coordinates"][0]
                    stop_dist = vincenty((lat, lon), (stop_lat, stop_lon)).miles
                    if (stop_dist <= .25):
                        bus_stop_count += 1
                except:
                    bus_stop_count += 0

            # INT: NUM OF BUSINESSES WITHIN .25 MI OF ADDRESS

            for bus in businesses["data"]:
                bus_lat = bus[-1][-4]
                bus_lon = bus[-1][-4]
                bus_dist = vincenty((lat, lon), (bus_lat, bus_lon)).miles
                if (bus_dist <= .25):
                    bus_count += 1

            # FLOAT: DIST TO POLICE STATION (IN MILES)

            for station in dpds["data"]:
                dpd_lat = station[16]
                dpd_lon = station[17]
                dpd_dist = vincenty((lat, lon), (dpd_lat, dpd_lon)).miles
                if (dpd_dist < lowest_dpd_dist):
                    lowest_dpd_dist = dpd_dist

            # FLOAT: DIST TO LIBRARY (IN MILES)

            for lib in dplibs["features"]:
                lib_lat = lib["geometry"]["coordinates"][1]
                lib_lon = lib["geometry"]["coordinates"][0]
                lib_dist = vincenty((lat, lon), (lib_lat, lib_lon)).miles
                if (lib_dist < lowest_lib_dist):
                    lowest_lib_dist = lib_dist

            # FLOAT: DIST TO REC CENTER (IN MILES)

            for rc in rec_centers["features"]:
                rc_lat = rc["geometry"]["coordinates"][0][1]
                rc_lon = rc["geometry"]["coordinates"][0][0]
                rc_dist = vincenty((lat, lon), (rc_lat, rc_lon)).miles
                if (rc_dist < lowest_rc_dist):
                    lowest_rc_dist = rc_dist

            row.append(float(row[19])**(1./4.))
            row.append(dist_to_4_star_school)
            row.append(bool_closest_school_lot_is_not_open)
            row.append(crime_count)
            row.append(lowest_dpd_dist)
            row.append(lowest_lib_dist)
            row.append(lowest_rc_dist)
            row.append(lat)
            row.append(lon)
            master.append(row)
            editCounter += 1
        except:
            editCounter += 1

    writer.writerows(master)


# Add notable characteristics to the csv
train = open('data/blight_train_out.csv')
train_csv = csv.reader(train)

for row in train_csv:

    try:
        resultInfo = {}
        resultInfo["type"] = "Feature"
        entry = {}
        print (0)
        entry["id"] = row[0]

        print('1')
        addressInfo = {}
        addressInfo["type"] = "Point"

        latlon = []
        lon = row[46]
        lat = row[45]
        latlon.append(lon)
        latlon.append(lat)
        addressInfo["coordinates"] = latlon
        resultInfo["geometry"] = addressInfo
        entry["ticket_issued_date"] = row[14]
        entry["violation_code"] = row[16]
        entry["violation_description"] = row[17]
        entry["disposition"] = row[18]
        entry["fine_amount"] = row[19]
        entry["admin_fee"] = row[20]
        entry["state_fee"] = row[21]
        entry["late_fee"] = row[22]
        entry["judgment_amount"] = row[25]
        entry["payment_amount"] = row[26]
        entry["balance_due"] = row[27]
        entry["payment_status"] = row[29]
        entry["compliance_detail"] = row[32]
        entry["compliance"] = row[33]
        entry["compliance_det"] = row[34]
        entry["4th_root_of_fine_amt"] = float(row[19])**(1./4.)
        resultInfo["properties"] = entry
        resultInfo["type"] = "Feature"

        results.append(resultInfo)

        counterStart += 1
    except:
        counterStart += 0

geojson["features"] = results

with open('blight.geojson', 'w') as outfile:
    print('dumping geojson...')
    json.dump(geojson, outfile)
