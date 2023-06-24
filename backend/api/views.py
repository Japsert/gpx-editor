from django.http import HttpResponse
from rest_framework.views import APIView

from .models import Hello

# Create your views here.


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
