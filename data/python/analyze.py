import json

with open("activities.json") as f:
    activities = json.load(f)

with open("visits.json") as f:
    visits = json.load(f)


def count_properties(items):
    property_counts = {}
    for item in items:
        for prop in item:
            if prop not in property_counts:
                property_counts[prop] = 1
            else:
                property_counts[prop] += 1
    return property_counts


activity_counts = count_properties(activities)
visit_counts = count_properties(visits)

print("Activity properties:")
for prop, count in activity_counts.items():
    if count < len(activities):
        prop += "?"
    print(f"- {prop}: {count}")

print("\nVisit properties:")
for prop, count in visit_counts.items():
    if count < len(visits):
        prop += "?"
    print(f"- {prop}: {count}")

common_fields = set(activity_counts.keys()) & set(visit_counts.keys())
unique_activity_fields = set(activity_counts.keys()) - set(visit_counts.keys())
unique_visit_fields = set(visit_counts.keys()) - set(activity_counts.keys())

print("\nCommon fields:")
for field in common_fields:
    if activity_counts[field] + visit_counts[field] < len(activities) + len(visits):
        field += "?"
    print("- " + field)

print("\nUnique activity fields:")
for field in unique_activity_fields:
    if activity_counts[field] < len(activities):
        field += "?"
    print("- " + field)

print("\nUnique visit fields:")
for field in unique_visit_fields:
    if visit_counts[field] < len(visits):
        field += "?"
    print("- " + field)

print("\nConsistency:")
# Read the contents of arcjson.md file
with open("arcjson.md") as f:
    arcjson_contents = f.read()

# Parse the contents of arcjson.md to get the expected fields
expected_fields = {}
current_section = None
for line in arcjson_contents.split("\n"):
    if line.startswith("## "):
        current_section = line[3:].lower()
        expected_fields[current_section] = set()
    elif line.startswith("- "):
        field_name = line[2:].split("(")[0].strip()
        expected_fields[current_section].add(field_name)

# Check if common fields are consistent with arcjson.md
common_diff = set(common_fields) ^ expected_fields["common"]
if common_diff:
    print("Common fields are not consistent with arcjson.md")
    for field in common_diff:
        if field in common_fields:
            print(f"+ {field}")
        else:
            print(f"- {field}")
else:
    print("Common fields are consistent with arcjson.md")

# Check if unique fields are consistent with arcjson.md
unique_diff = unique_activity_fields ^ expected_fields["activity extends common"]
if unique_diff:
    print("Unique activity fields are not consistent with arcjson.md")
    for field in unique_diff:
        if field in unique_activity_fields:
            print(f"+ {field}")
        else:
            print(f"- {field}")
else:
    print("Unique activity fields are consistent with arcjson.md")

unique_diff = unique_visit_fields ^ expected_fields["visit extends common"]
if unique_diff:
    print("Unique visit fields are not consistent with arcjson.md")
    for field in unique_diff:
        if field in unique_visit_fields:
            print(f"+ {field}")
        else:
            print(f"- {field}")
else:
    print("Unique visit fields are consistent with arcjson.md")
