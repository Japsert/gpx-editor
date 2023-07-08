import os
import json

# get all files that start with 2023 and end with .json in the current directory
files = [f for f in os.listdir(".") if f.startswith("2023") and f.endswith(".json")]

for file in files:
    with open(file, "r") as f:
        filename = os.path.basename(file)
        data = json.load(f)
        for item in data["timelineItems"]:
            if "activeEnergyBurned" in item and "hkStepCount" not in item:
                print(
                    f"Error in {file}: Item {item['itemId']} has activeEnergyBurned field but no hkStepCount field."
                )
            if (
                "activeEnergyBurned" in item
                and "hkStepCount" in item
                and "streetAddress" not in item
            ):
                print(
                    f"Error in {file}: Item {item['itemId']} has activeEnergyBurned and hkStepCount fields but no streetAddress."
                )
            if "maxHeartRate" in item and "averageHeartRate" not in item:
                print(
                    f"Error in {file}: Item {item['itemId']} has maxHeartRate field but no averageHeartRate field."
                )
