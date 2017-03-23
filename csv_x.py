import csv
import geojson as geoj
import json


def filterx(NSEW):

    blight = open('data/blight_train_out17.csv')
    blight_csv = csv.reader(blight)

    with open('data/blight_train_out_171.csv', 'w') as csvoutput:
        writer = csv.writer(csvoutput, lineterminator='\n')

        master = []
        row0 = blight_csv.next()

        master.append(row0)

        for row in blight_csv:
            if(float(row[46]) < NSEW[2] and float(row[46]) > NSEW[3]
                and float(row[45]) > NSEW[1] and float(row[45]) < NSEW[0]):
                master.append(row)

        writer.writerows(master)

filterx([43, 42, -82, -83.14])
