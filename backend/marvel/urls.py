from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MarvelCharacterViewSet, ComicViewSet

router = DefaultRouter()
router.register(r'characters', MarvelCharacterViewSet, basename='marvel-character')
router.register(r'comics', ComicViewSet, basename='marvel-comic')

urlpatterns = [
    path('', include(router.urls)),
]
