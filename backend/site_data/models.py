from django.db import models

class Page(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    last_update = models.DateTimeField(auto_now=True)
    slug = models.SlugField(max_length=50, unique=True)
    def __str__(self):
        return self.slug