from django.contrib import admin

from .models import ManufacturerPage, ManufacturerPageAdmin, SiteInfo, HomePage, HomePageAdmin, ServicePage

admin.site.register(ManufacturerPage, ManufacturerPageAdmin) 
admin.site.register(ServicePage)
@admin.register(SiteInfo)
class SiteInfoAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # If there's already an instance, do not allow adding new ones
        return not SiteInfo.objects.exists()

admin.site.register(HomePage, HomePageAdmin)