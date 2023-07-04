# Design notes

## Importing data workflow

1. select files for import, click Load
2. data is displayed per day
    - days can be switched between with arrows
    - a list of places and activities is displayed (like in the Arc app)
3. the user can edit the data
    - edit visit
        - remove visit
        - mark as stop or one-time visit
            - name
        - select a nearby place
            - retrieved from geocoding api
        - add custom place
            - name
            - coordinates? or address?
            - type
    - edit activity
        - change activity type
        - split activity: split activity into two or more items, set types (including visit)
4. the user can save te data to their account
