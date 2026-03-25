from django.urls import path
from . import views

urlpatterns = [
    path('menu/', views.menu, name='menu'),        # For /api/menu/
    path('analytics/', views.analytics, name='analytics'),  # For /api/analytics/
]