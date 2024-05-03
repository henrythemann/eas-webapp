from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('manufacturers/<path:url_slug>/', views.manufacturer_page_detail, name='manufacturer_page_detail'),
    path('services/<path:url_slug>/', views.service_page_detail, name='service_page_detail'),
    path('site-info/', views.site_info, name='site_info'),
    path('home/', views.home_page, name='home_page'),
    path('contact/', views.contact_page, name='contact_page'),
    path('about/', views.about_page, name='about_page'),
]

urlpatterns += [
    path("ckeditor5/", include('django_ckeditor_5.urls'), name="ck_editor_5_upload_file"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)