from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import PokemonService
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class PokemonListView(APIView):
    @swagger_auto_schema(
        operation_description="Get a list of Pokémon",
        manual_parameters=[
            openapi.Parameter('limit', openapi.IN_QUERY, description="Number of Pokémon to return", type=openapi.TYPE_INTEGER),
            openapi.Parameter('offset', openapi.IN_QUERY, description="Starting position", type=openapi.TYPE_INTEGER),
        ]
    )
    def get(self, request):
        limit = int(request.query_params.get('limit', 20))
        offset = int(request.query_params.get('offset', 0))
        
        pokemon_list = PokemonService.get_pokemon_list(limit, offset)
        if pokemon_list:
            return Response(pokemon_list)
        return Response({"error": "Failed to fetch Pokémon list"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PokemonDetailView(APIView):
    @swagger_auto_schema(
        operation_description="Get details for a specific Pokémon",
        manual_parameters=[
            openapi.Parameter('id_or_name', openapi.IN_PATH, description="Pokémon ID or name", type=openapi.TYPE_STRING, required=True),
        ]
    )
    def get(self, request, id_or_name):
        pokemon = PokemonService.get_pokemon_details(id_or_name)
        if pokemon:
            return Response(pokemon)
        return Response({"error": f"Pokémon {id_or_name} not found"}, status=status.HTTP_404_NOT_FOUND)
