from django.db import models
from django.contrib import admin
from django_ckeditor_5.fields import CKEditor5Field

class Page(models.Model):
    page_title = models.CharField(max_length=50, unique=True)
    last_update = models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.page_title
    class Meta:
        abstract = True

class TemplatePage(Page):
    hero_bkgd_img = models.CharField(max_length=200, blank=True)
    article_subtitle = models.CharField(max_length=200, blank=True)
    content = CKEditor5Field('Text', config_name='extends')
    class Meta:
        abstract = True

class HomePage(Page):
    page_title = "Home Page"
    class Meta:
        verbose_name_plural = "Home Page"

class ContactPage(Page):
    hero_bkgd_img = models.CharField(max_length=200, blank=True)
    class Meta:
        verbose_name_plural = "Contact Page"

class AboutPage(TemplatePage):
    class Meta:
        verbose_name_plural = "About Page"

class HomeHeroSection(models.Model):
    home_page = models.ForeignKey(HomePage, on_delete=models.CASCADE)
    bkgd_img = models.CharField(max_length=200)
    heading = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    subtitle = models.TextField(max_length=200)
    btn_text = models.CharField(max_length=200)
    btn_link = models.CharField(max_length=200)

class HomeHeroSectionInline(admin.TabularInline):
    model = HomeHeroSection
    extra = 1

class HomeExpertSection(models.Model):
    home_page = models.ForeignKey(HomePage, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    caption = models.TextField(max_length=200)
    icon = models.CharField(max_length=50)
    btn_text = models.CharField(max_length=50)
    btn_link = models.CharField(max_length=200)

class HomeExpertSectionInline(admin.TabularInline):
    model = HomeExpertSection
    extra = 1

class ManufacturerPage(TemplatePage):
    pass

class ServicePage(TemplatePage):
    article_img = models.CharField(max_length=200)

class Service(models.Model):
    manufacturer_page = models.ForeignKey(ManufacturerPage, on_delete=models.CASCADE)
    service_name = models.CharField(max_length=200)
class ServiceInline(admin.TabularInline):
    model = Service
    extra = 3
class GalleryImage(models.Model):
    manufacturer_page = models.ForeignKey(ManufacturerPage, on_delete=models.CASCADE)
    image = models.CharField(max_length=200)
class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 3

class SiteInfo(models.Model):
    site_description = models.TextField(max_length=200)
    footer_description = models.TextField(max_length=200)
    hours = models.CharField(max_length=200)
    site_logo = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    yelp_link = models.CharField(max_length=200)
    instagram_link = models.CharField(max_length=200)
    class Meta:
        verbose_name_plural = "Site Info"

class YelpReview(models.Model):
    data_review_id = models.CharField(max_length=50)
    def __str__(self):
        return self.data_review_id