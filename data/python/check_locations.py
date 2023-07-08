import json

# Load the visits and activities data from their respective JSON files
with open('visits.json', 'r') as f:
    visits_data = json.load(f)

with open('activities.json', 'r') as f:
    activities_data = json.load(f)

# Define a dictionary to store the location keys and their counts
location_counts = {}

# Loop over the location in all the samples in all the timelineItems in visits.json
for item in visits_data:
    for sample in item['samples']:
        if sample['location'] is not None:
            for key in sample['location'].keys():
                if key in location_counts:
                    location_counts[key] += 1
                else:
                    location_counts[key] = 1

# Loop over the location in all the samples in all the timelineItems in activities.json
for activity in activities_data:
    for sample in activity['samples']:
        if sample['location'] is not None:
            for key in sample['location'].keys():
                if key in location_counts:
                    location_counts[key] += 1
                else:
                    location_counts[key] = 1

# Output the location keys and their counts
for location_key, count in location_counts.items():
    print(f"{location_key}: {count}")
