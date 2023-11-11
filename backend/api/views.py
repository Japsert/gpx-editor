from django.forms import ValidationError
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.request import Request

from .models import Hello, GeoJsonData


class HelloView(APIView):
    def get(self, request):
        # get first row from database table "hello"
        first_row = Hello.objects.first()
        if first_row is None:
            return HttpResponse("No data in database")
        return HttpResponse(first_row.text)

    def post(self, request):
        # get text from request body
        text = request.data.get("text")
        if text is None:
            return HttpResponse("No text in request body")
        # save text to database
        hello = Hello(text=text)
        hello.save()
        return HttpResponse(f'Data (text: "{text}") saved to database')

    def delete(self, request):
        # delete all rows from database table "Hello"
        Hello.objects.all().delete()
        return HttpResponse("Database cleared")


class DataView(APIView):
    def get(self, request: Request):
        """Get GeoJsonData from given dates."""
        dates = request.query_params.get("dates")

        if dates is None:
            # No dates were given, return all available dates
            available_dates = GeoJsonData.objects.values_list("date", flat=True)
            return JsonResponse(list(available_dates), safe=False)

        try:
            geojson_data = GeoJsonData.objects.filter(
                date__in=dates.split(",")
            ).values()
            return JsonResponse(list(geojson_data), safe=False)
        except GeoJsonData.DoesNotExist:
            return HttpResponse(status=404)

    def post(self, request: Request):
        """Upload GeoJsonData for a given date. The data is not checked for validity."""
        date = request.data.get("date")  # type: ignore
        data = request.data.get("data")  # type: ignore
        if date is None or data is None:
            return HttpResponse(status=400, content="No date or data given")

        # Save data to database
        geojson_data = GeoJsonData(date=date, data=data)
        try:
            geojson_data.save()
        except ValidationError:
            return HttpResponse(
                status=409, content="GeoJsonData with this date already exists"
            )
        return HttpResponse(status=201)

    def delete(self, request: Request):
        """Delete GeoJsonData from a given date."""
        date = request.query_params.get("date")
        if date is None:
            # No date was given, clear all data
            GeoJsonData.objects.all().delete()
            return HttpResponse(status=204)

        try:
            geojson_data = GeoJsonData.objects.get(date=date)
            geojson_data.delete()
            return HttpResponse(status=204)
        except GeoJsonData.DoesNotExist:
            return HttpResponse(status=404)
