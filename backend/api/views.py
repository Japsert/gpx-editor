from django.http import HttpResponse
from rest_framework.views import APIView

# Create your views here.


class TestView(APIView):
    def get(self, request):
        return HttpResponse("Hello, world!")
