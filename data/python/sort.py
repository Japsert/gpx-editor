import os
import json

# Define the paths to the input and output directories
DATA_DIR = "c:/github/gpx-editor/data"

# Initialize two empty lists for the visit and activity timeline items
visit_items = []
activity_items = []

# Loop through all files in the input directory
for filename in os.listdir(DATA_DIR):
    # Check if the filename matches the pattern "2023-0x-xx.json"
    if filename.startswith("2023-0") and filename.endswith(".json"):
        # Construct the full path to the input file
        input_path = os.path.join(DATA_DIR, filename)

        # Load the JSON data from the input file
        with open(input_path, "r") as f:
            data = json.load(f)

        # Loop through all timeline items in the JSON data
        for item in data["timelineItems"]:
            # Check if the item is a visit or an activity
            if item.get("isVisit", False):
                visit_items.append(item)
            else:
                activity_items.append(item)

# Construct the full path to the output files
visit_output_path = os.path.join(DATA_DIR, "visits.json")
activity_output_path = os.path.join(DATA_DIR, "activities.json")

# Write the visit and activity items to the output files
with open(visit_output_path, "w") as f:
    json.dump(visit_items, f, indent=2)
with open(activity_output_path, "w") as f:
    json.dump(activity_items, f, indent=2)
