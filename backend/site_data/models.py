from django.db import models
from django.contrib import admin
from django_summernote.fields import SummernoteTextField

class Page(models.Model):
    page_title = models.CharField(max_length=50, unique=True)
    last_update = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.page_title
    class Meta:
        abstract = True

class CustomAdmin(admin.ModelAdmin):
    class Media:
        css = {
             'all': ('admin/css/admin_custom.css',)
        }
    class Meta:
        abstract = True

class TemplatePage(Page):
    hero_bkgd_img = models.CharField(max_length=200, blank=True)
    article_subtitle = models.CharField(max_length=200, blank=True)
    content = SummernoteTextField()
    class Meta:
        abstract = True

class HomePage(Page):
    page_title = "Home Page"
    class Meta:
        verbose_name_plural = "Home Page"

class HomeHeroSection(models.Model):
    home_page = models.ForeignKey(HomePage, on_delete=models.CASCADE)
    bkgd_img = models.CharField(max_length=200)
    heading = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    btn_text = models.CharField(max_length=200)
    btn_link = models.CharField(max_length=200)

class HomeHeroSectionInline(admin.TabularInline):
    model = HomeHeroSection
    extra = 1

class HomePageAdmin(CustomAdmin):
    inlines = [HomeHeroSectionInline]
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not HomePage.objects.exists()

class ManufacturerPage(TemplatePage):
    pass

class Service(models.Model):
    manufacturer_page = models.ForeignKey(ManufacturerPage, on_delete=models.CASCADE)
    service_name = models.CharField(max_length=200)
class ServiceInline(admin.TabularInline):
    model = Service
    extra = 3
class ManufacturerPageAdmin(CustomAdmin):
    inlines = [ServiceInline]

class SiteInfo(models.Model):
    site_description = models.TextField(max_length=200)
    footer_description = models.TextField(max_length=200)
    site_logo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    yelp_link = models.CharField(max_length=200)
    instagram_link = models.CharField(max_length=200)
    class Meta:
        verbose_name_plural = "Site Info"