from django.db import models
from django.forms import ValidationError


class Hello(models.Model):
    text = models.TextField()


class GeoJsonData(models.Model):
    date = models.DateField(unique=True)
    data = models.JSONField()

    def clean(self):
        if GeoJsonData.objects.filter(date=self.date).exists():
            raise ValidationError("GeoJsonData with this date already exists")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
