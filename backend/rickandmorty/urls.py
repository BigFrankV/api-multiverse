from django.urls import path
from .views import (
    CharacterListView, CharacterDetailView,
    LocationListView, LocationDetailView,
    EpisodeListView, EpisodeDetailView
)

urlpatterns = [
    path('characters/', CharacterListView.as_view(), name='character-list'),
    path('characters/<int:id>/', CharacterDetailView.as_view(), name='character-detail'),
    path('locations/', LocationListView.as_view(), name='location-list'),
    path('locations/<int:id>/', LocationDetailView.as_view(), name='location-detail'),
    path('episodes/', EpisodeListView.as_view(), name='episode-list'),
    path('episodes/<int:id>/', EpisodeDetailView.as_view(), name='episode-detail'),
]
