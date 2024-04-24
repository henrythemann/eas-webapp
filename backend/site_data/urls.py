from django.urls import path

from . import views

urlpatterns = [
    path('manufacturers/<path:url_slug>/', views.manufacturer_page_detail, name='manufacturer_page_detail'),
    path('services/<path:url_slug>/', views.service_page_detail, name='service_page_detail'),
    path('site-info/', views.site_info, name='site_info'),
    path('home/', views.home_page, name='home_page'),
    path('contact/', views.contact_page, name='contact_page')
]