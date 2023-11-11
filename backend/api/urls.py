from django.urls import path
from .views import HelloView, DataView

urlpatterns = [
    path("hello", HelloView.as_view()),
    path("data", DataView.as_view()),
]
