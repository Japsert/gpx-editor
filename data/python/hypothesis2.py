import json

with open("visits.json") as f:
    visits = json.load(f)

with open("activities.json") as f:
    activities = json.load(f)

for item in visits + activities:
    for sample in item["samples"]:
        #if not (
        #    (
        #        "zAcceleration" in sample
        #        and "courseVariance" in sample
        #        and "stepHz" in sample
        #        and "xyAcceleration" in sample
        #    )
        #    or (
        #        "zAcceleration" not in sample
        #        and "courseVariance" not in sample
        #        and "stepHz" not in sample
        #        and "xyAcceleration" not in sample
        #    )
        #):
        if "zAcceleration" not in sample and "courseVariance" not in sample and "stepHz" not in sample and "xyAcceleration" not in sample:
            print(sample)
            break
