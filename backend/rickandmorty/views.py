from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import RickAndMortyService
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class CharacterListView(APIView):
    @swagger_auto_schema(
        operation_description="Get a list of Rick and Morty characters",
        manual_parameters=[
            openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
        ]
    )
    def get(self, request):
        page = int(request.query_params.get('page', 1))
        characters = RickAndMortyService.get_character_list(page)
        if characters:
            return Response(characters)
        return Response({"error": "Failed to fetch characters"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class CharacterDetailView(APIView):
    @swagger_auto_schema(
        operation_description="Get details for a specific character",
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_PATH, description="Character ID", type=openapi.TYPE_INTEGER, required=True),
        ]
    )
    def get(self, request, id):
        character = RickAndMortyService.get_character_details(id)
        if character:
            return Response(character)
        return Response({"error": f"Character with ID {id} not found"}, status=status.HTTP_404_NOT_FOUND)

class LocationListView(APIView):
    @swagger_auto_schema(
        operation_description="Get a list of Rick and Morty locations",
        manual_parameters=[
            openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
        ]
    )
    def get(self, request):
        page = int(request.query_params.get('page', 1))
        locations = RickAndMortyService.get_location_list(page)
        if locations:
            return Response(locations)
        return Response({"error": "Failed to fetch locations"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LocationDetailView(APIView):
    @swagger_auto_schema(
        operation_description="Get details for a specific location",
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_PATH, description="Location ID", type=openapi.TYPE_INTEGER, required=True),
        ]
    )
    def get(self, request, id):
        location = RickAndMortyService.get_location_details(id)
        if location:
            return Response(location)
        return Response({"error": f"Location with ID {id} not found"}, status=status.HTTP_404_NOT_FOUND)

class EpisodeListView(APIView):
    @swagger_auto_schema(
        operation_description="Get a list of Rick and Morty episodes",
        manual_parameters=[
            openapi.Parameter('page', openapi.IN_QUERY, description="Page number", type=openapi.TYPE_INTEGER),
        ]
    )
    def get(self, request):
        page = int(request.query_params.get('page', 1))
        episodes = RickAndMortyService.get_episode_list(page)
        if episodes:
            return Response(episodes)
        return Response({"error": "Failed to fetch episodes"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EpisodeDetailView(APIView):
    @swagger_auto_schema(
        operation_description="Get details for a specific episode",
        manual_parameters=[
            openapi.Parameter('id', openapi.IN_PATH, description="Episode ID", type=openapi.TYPE_INTEGER, required=True),
        ]
    )
    def get(self, request, id):
        episode = RickAndMortyService.get_episode_details(id)
        if episode:
            return Response(episode)
        return Response({"error": f"Episode with ID {id} not found"}, status=status.HTTP_404_NOT_FOUND)
