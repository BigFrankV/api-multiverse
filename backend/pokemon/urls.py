from django.urls import path
from .views import PokemonListView, PokemonDetailView

urlpatterns = [
    path('', PokemonListView.as_view(), name='pokemon-list'),
    path('<str:id_or_name>/', PokemonDetailView.as_view(), name='pokemon-detail'),
]
