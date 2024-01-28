from django.contrib import admin

from .models import ManufacturerPage, ManufacturerPageAdmin, SiteInfo

admin.site.register(ManufacturerPage, ManufacturerPageAdmin) 
@admin.register(SiteInfo)
class SiteInfoAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not SiteInfo.objects.exists()