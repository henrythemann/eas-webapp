from django.contrib import admin
from django.shortcuts import redirect
from .views import site_info
from .models import ManufacturerPage, SiteInfo, HomePage, ServicePage, ContactPage, AboutPage, YelpReview, ServiceInline, GalleryImageInline, HomeHeroSectionInline, HomeExpertSectionInline
import os

def save_site_info_json():
    data = site_info(None)
    with open(os.path.join(os.path.dirname(__file__), '..', '..', 'frontend', 'data', 'siteInfo.json'), 'w') as outfile:
        outfile.write(data.content.decode('utf-8'))

class CustomAdmin(admin.ModelAdmin):
    class Media:
        css = {
             'all': ('admin/css/admin_custom.css',)
        }
    class Meta:
        abstract = True

class ManufacturerPageAdmin(CustomAdmin):
    inlines = [ServiceInline, GalleryImageInline]

class HomePageAdmin(CustomAdmin):
    inlines = [HomeHeroSectionInline, HomeExpertSectionInline]
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not HomePage.objects.exists()
    def changelist_view(self, request, extra_context=None):
        # Get the queryset
        qs = self.get_queryset(request)
        # Check if there is only one object
        if qs.count() == 1:
            obj = qs.get()
            # Redirect to the admin change page
            return redirect('admin:%s_%s_change' % (obj._meta.app_label, obj._meta.model_name), obj.pk)
        # Otherwise, proceed as normal
        return super().changelist_view(request, extra_context=extra_context)
    
admin.site.register(ManufacturerPage, ManufacturerPageAdmin) 
@admin.register(ServicePage)
class ServicePageAdmin(CustomAdmin):
    pass
@admin.register(SiteInfo)
class SiteInfoAdmin(CustomAdmin):
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not SiteInfo.objects.exists()
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        save_site_info_json()
    def changelist_view(self, request, extra_context=None):
        # Get the queryset
        qs = self.get_queryset(request)
        # Check if there is only one object
        if qs.count() == 1:
            obj = qs.get()
            # Redirect to the admin change page
            return redirect('admin:%s_%s_change' % (obj._meta.app_label, obj._meta.model_name), obj.pk)
        # Otherwise, proceed as normal
        return super().changelist_view(request, extra_context=extra_context)
    
@admin.register(ContactPage)
class ContactPageAdmin(CustomAdmin):
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not ContactPage.objects.exists()
    def changelist_view(self, request, extra_context=None):
        # Get the queryset
        qs = self.get_queryset(request)
        # Check if there is only one object
        if qs.count() == 1:
            obj = qs.get()
            # Redirect to the admin change page
            return redirect('admin:%s_%s_change' % (obj._meta.app_label, obj._meta.model_name), obj.pk)
        # Otherwise, proceed as normal
        return super().changelist_view(request, extra_context=extra_context)

admin.site.register(HomePage, HomePageAdmin)
@admin.register(AboutPage)
class AboutPageAdmin(CustomAdmin):
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not AboutPage.objects.exists()
    def changelist_view(self, request, extra_context=None):
        # Get the queryset
        qs = self.get_queryset(request)
        # Check if there is only one object
        if qs.count() == 1:
            obj = qs.get()
            # Redirect to the admin change page
            return redirect('admin:%s_%s_change' % (obj._meta.app_label, obj._meta.model_name), obj.pk)
        # Otherwise, proceed as normal
        return super().changelist_view(request, extra_context=extra_context)

@admin.register(YelpReview)
class YelpReviewAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        save_site_info_json()