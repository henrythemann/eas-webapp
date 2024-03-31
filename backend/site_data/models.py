from django.db import models
from django.contrib import admin

class Page(models.Model):
    page_title = models.CharField(max_length=50, unique=True)
    hero_bkgd_img = models.CharField(max_length=200, blank=True)
    last_update = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.page_title

class ManufacturerPage(Page):
    article_subtitle = models.CharField(max_length=200, blank=True)
    content = models.TextField()
class Service(models.Model):
    manufacturer_page = models.ForeignKey(ManufacturerPage, on_delete=models.CASCADE)
    service_name = models.CharField(max_length=200)
class ServiceInline(admin.StackedInline):
    model = Service
    extra = 3
class ManufacturerPageAdmin(admin.ModelAdmin):
    inlines = [ServiceInline]

class SiteInfo(models.Model):
    site_description = models.CharField(max_length=200)
    site_logo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    class Meta:
        verbose_name_plural = "Site Info"