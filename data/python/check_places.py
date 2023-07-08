import json
import os

DATA_DIR = "C:/github/gpx-editor/data/"

# Load the visits and activities data from their respective JSON files
with open(os.path.join(DATA_DIR, "visits.json"), "r") as f:
    visits_data = json.load(f)

# Define a dictionary to store the location keys and their counts
places = {}

total_count = 0

# Loop over the location in all the samples in all the timelineItems in visits.json
for item in visits_data:
    if "place" in item.keys():
        total_count += 1
        for key in item["place"].keys():
            if key in places:
                places[key] += 1
            else:
                places[key] = 1

# Output the location keys and their counts
for key, count in places.items():
    if count < total_count:
        key += "?"
    print(f"{key:<24}{count}")
