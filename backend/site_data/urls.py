from django.urls import path

from . import views

urlpatterns = [
    path('<slug:slug>/', views.page_detail, name='page_detail')
]