import json
import os

DATA_DIR = "C:/github/gpx-editor/data/"

with open(os.path.join(DATA_DIR, "activities.json"), "r") as f:
    activities_data = json.load(f)

activities = {}
total_count = 0

for item in activities_data:
    total_count += 1
    for key in item.keys():
        if key in activities:
            activities[key] += 1
        else:
            activities[key] = 1

for key, count in activities.items():
    if count < total_count:
        key += "?"
    print(f"{key:<24}{count}")
