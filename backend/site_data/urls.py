from django.urls import path

from . import views

urlpatterns = [
    path('manufacturers/<slug:slug>/', views.manufacturer_page_detail, name='manufacturer_page_detail'),
    path('site-info/', views.site_info, name='site_info')
]