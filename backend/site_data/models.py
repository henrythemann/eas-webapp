from django.db import models

class Page(models.Model):
    html_title = models.CharField(max_length=200)
    hero_bkgd_img = models.CharField(max_length=200, blank=True)
    last_update = models.DateTimeField(auto_now=True)
    url_slug = models.SlugField(max_length=50, unique=True)
    def __str__(self):
        return self.url_slug

class ManufacturerPage(Page):
    content = models.TextField()

class SiteInfo(models.Model):
    site_description = models.CharField(max_length=200)
    site_logo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    class Meta:
        verbose_name_plural = "Site Info"