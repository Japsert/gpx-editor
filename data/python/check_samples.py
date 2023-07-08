import json

# Load visits.json and activities.json
with open("visits.json") as f:
    visits = json.load(f)

with open("activities.json") as f:
    activities = json.load(f)

keys = {}
total_count = 0


def add_keys(sample: dict):
    for key in sample.keys():
        if key not in keys:
            keys[key] = 1
        else:
            keys[key] += 1


# Loop through all samples in visits.json and activities.json
for item in visits + activities:
    for sample in item["samples"]:
        total_count += 1
        add_keys(sample)

for key in keys.keys():
    count = keys[key]
    if count < total_count:
        print(f"{key + '?':<20} {count}")
    else:
        print(f"{key:<20}  {count}")
