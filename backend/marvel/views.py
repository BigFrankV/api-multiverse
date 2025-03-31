from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import MarvelCharacter, Comic, CharacterComic
from .serializers import (
    MarvelCharacterSerializer, 
    MarvelCharacterMinimalSerializer,
    ComicSerializer, 
    ComicMinimalSerializer
)
from .marvel_service import MarvelAPIService
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class MarvelCharacterViewSet(viewsets.ViewSet):
    """ViewSet para los personajes de Marvel"""
    
    def list(self, request):
        """Lista todos los personajes"""
        try:
            # Recuperar parámetros de consulta
            limit = int(request.query_params.get('limit', 20))
            offset = int(request.query_params.get('offset', 0))
            name_starts_with = request.query_params.get('nameStartsWith', None)
            
            # Consultar la API de Marvel
            data = MarvelAPIService.get_characters(
                limit=limit, 
                offset=offset, 
                name_starts_with=name_starts_with
            )
            
            # Procesar y guardar los resultados en la base de datos
            results = []
            for item in data['results']:
                character, created = MarvelCharacter.objects.update_or_create(
                    marvel_id=item['id'],
                    defaults={
                        'name': item['name'],
                        'description': item['description'],
                        'thumbnail': f"{item['thumbnail']['path']}.{item['thumbnail']['extension']}",
                        'comics_available': item['comics']['available'],
                        'series_available': item['series']['available'],
                        'stories_available': item['stories']['available'],
                        'events_available': item['events']['available'],
                        'detail_url': item['urls'][0]['url'] if item['urls'] else ''
                    }
                )
                results.append(character)
            
            # Serializar y devolver los resultados
            serializer = MarvelCharacterMinimalSerializer(results, many=True)
            return Response({
                'count': data['total'],
                'results': serializer.data,
                'next': offset + limit < data['total']
            })
            
        except Exception as e:
            logger.error(f"Error al obtener personajes de Marvel: {str(e)}")
            return Response(
                {'error': 'Error al obtener personajes de Marvel'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def retrieve(self, request, pk=None):
        """Obtiene un personaje específico por su ID"""
        try:
            # Intentar obtener el personaje de la base de datos
            character = get_object_or_404(MarvelCharacter, marvel_id=pk)
            
            # Obtener datos actualizados de la API
            api_data = MarvelAPIService.get_character(pk)
            
            # Actualizar el personaje en la base de datos
            character.name = api_data['name']
            character.description = api_data['description']
            character.thumbnail = f"{api_data['thumbnail']['path']}.{api_data['thumbnail']['extension']}"
            character.comics_available = api_data['comics']['available']
            character.series_available = api_data['series']['available']
            character.stories_available = api_data['stories']['available']
            character.events_available = api_data['events']['available']
            character.detail_url = api_data['urls'][0]['url'] if api_data['urls'] else ''
            character.save()
            
            # Obtener cómics del personaje
            comics_data = MarvelAPIService.get_character_comics(pk)
            
            # Guardar los cómics en la base de datos y crear relaciones
            for comic_data in comics_data:
                # Convertir la fecha de publicación si está disponible
                publication_date = None
                if comic_data.get('dates'):
                    for date in comic_data['dates']:
                        if date['type'] == 'onsaleDate' and date['date']:
                            try:
                                publication_date = datetime.strptime(
                                    date['date'].split('T')[0], 
                                    '%Y-%m-%d'
                                ).date()
                            except ValueError:
                                pass
                
                # Obtener el precio si está disponible
                price = 0.00
                if comic_data.get('prices'):
                    for price_data in comic_data['prices']:
                        if price_data['type'] == 'printPrice':
                            price = price_data['price']
                
                # Crear o actualizar el cómic
                comic, created = Comic.objects.update_or_create(
                    marvel_id=comic_data['id'],
                    defaults={
                        'title': comic_data['title'],
                        'description': comic_data.get('description', ''),
                        'isbn': comic_data.get('isbn', ''),
                        'page_count': comic_data.get('pageCount', 0),
                        'thumbnail': f"{comic_data['thumbnail']['path']}.{comic_data['thumbnail']['extension']}",
                        'price': price,
                        'series': comic_data.get('series', {}).get('name', ''),
                        'publication_date': publication_date,
                        'detail_url': comic_data['urls'][0]['url'] if comic_data.get('urls') else ''
                    }
                )
                
                # Crear la relación entre personaje y cómic si no existe
                CharacterComic.objects.get_or_create(
                    character=character,
                    comic=comic
                )
            
            # Serializar y devolver el personaje con sus cómics
            serializer = MarvelCharacterSerializer(character)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Error al obtener personaje de Marvel {pk}: {str(e)}")
            return Response(
                {'error': f'Error al obtener personaje con id {pk}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Busca personajes por nombre"""
        try:
            name = request.query_params.get('name', '')
            if not name:
                return Response(
                    {'error': 'El parámetro "name" es requerido'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Consultar la API de Marvel
            data = MarvelAPIService.get_characters(
                limit=20, 
                name_starts_with=name
            )
            
            # Procesar y guardar los resultados en la base de datos
            results = []
            for item in data['results']:
                character, created = MarvelCharacter.objects.update_or_create(
                    marvel_id=item['id'],
                    defaults={
                        'name': item['name'],
                        'description': item['description'],
                        'thumbnail': f"{item['thumbnail']['path']}.{item['thumbnail']['extension']}",
                        'comics_available': item['comics']['available'],
                        'series_available': item['series']['available'],
                        'stories_available': item['stories']['available'],
                        'events_available': item['events']['available'],
                        'detail_url': item['urls'][0]['url'] if item['urls'] else ''
                    }
                )
                results.append(character)
            
            # Serializar y devolver los resultados
            serializer = MarvelCharacterMinimalSerializer(results, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Error al buscar personajes de Marvel: {str(e)}")
            return Response(
                {'error': 'Error al buscar personajes de Marvel'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ComicViewSet(viewsets.ViewSet):
    """ViewSet para los cómics de Marvel"""
    
    def list(self, request):
        """Lista todos los cómics"""
        try:
            # Recuperar parámetros de consulta
            limit = int(request.query_params.get('limit', 20))
            offset = int(request.query_params.get('offset', 0))
            title_starts_with = request.query_params.get('titleStartsWith', None)
            
            # Consultar la API de Marvel
            data = MarvelAPIService.get_comics(
                limit=limit, 
                offset=offset, 
                title_starts_with=title_starts_with
            )
            
            # Procesar y guardar los resultados en la base de datos
            results = []
            for item in data['results']:
                # Convertir la fecha de publicación si está disponible
                publication_date = None
                if item.get('dates'):
                    for date in item['dates']:
                        if date['type'] == 'onsaleDate' and date['date']:
                            try:
                                publication_date = datetime.strptime(
                                    date['date'].split('T')[0], 
                                    '%Y-%m-%d'
                                ).date()
                            except ValueError:
                                pass
                
                # Obtener el precio si está disponible
                price = 0.00
                if item.get('prices'):
                    for price_data in item['prices']:
                        if price_data['type'] == 'printPrice':
                            price = price_data['price']
                
                # Crear o actualizar el cómic
                comic, created = Comic.objects.update_or_create(
                    marvel_id=item['id'],
                    defaults={
                        'title': item['title'],
                        'description': item.get('description', ''),
                        'isbn': item.get('isbn', ''),
                        'page_count': item.get('pageCount', 0),
                        'thumbnail': f"{item['thumbnail']['path']}.{item['thumbnail']['extension']}",
                        'price': price,
                        'series': item.get('series', {}).get('name', ''),
                        'publication_date': publication_date,
                        'detail_url': item['urls'][0]['url'] if item.get('urls') else ''
                    }
                )
                results.append(comic)
            
            # Serializar y devolver los resultados
            serializer = ComicMinimalSerializer(results, many=True)
            return Response({
                'count': data['total'],
                'results': serializer.data,
                'next': offset + limit < data['total']
            })
            
        except Exception as e:
            logger.error(f"Error al obtener cómics de Marvel: {str(e)}")
            return Response(
                {'error': 'Error al obtener cómics de Marvel'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def retrieve(self, request, pk=None):
        """Obtiene un cómic específico por su ID"""
        try:
            # Intentar obtener el cómic de la base de datos
            comic = get_object_or_404(Comic, marvel_id=pk)
            
            # Obtener datos actualizados de la API
            api_data = MarvelAPIService.get_comic(pk)
            
            # Convertir la fecha de publicación si está disponible
            publication_date = None
            if api_data.get('dates'):
                for date in api_data['dates']:
                    if date['type'] == 'onsaleDate' and date['date']:
                        try:
                            publication_date = datetime.strptime(
                                date['date'].split('T')[0], 
                                '%Y-%m-%d'
                            ).date()
                        except ValueError:
                            pass
            
            # Obtener el precio si está disponible
            price = 0.00
            if api_data.get('prices'):
                for price_data in api_data['prices']:
                    if price_data['type'] == 'printPrice':
                        price = price_data['price']
            
            # Actualizar el cómic en la base de datos
            comic.title = api_data['title']
            comic.description = api_data.get('description', '')
            comic.isbn = api_data.get('isbn', '')
            comic.page_count = api_data.get('pageCount', 0)
            comic.thumbnail = f"{api_data['thumbnail']['path']}.{api_data['thumbnail']['extension']}"
            comic.price = price
            comic.series = api_data.get('series', {}).get('name', '')
            if publication_date:
                comic.publication_date = publication_date
            comic.detail_url = api_data['urls'][0]['url'] if api_data.get('urls') else ''
            comic.save()
            
            # Serializar y devolver el cómic
            serializer = ComicSerializer(comic)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Error al obtener cómic de Marvel {pk}: {str(e)}")
            return Response(
                {'error': f'Error al obtener cómic con id {pk}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """Busca cómics por título"""
        try:
            title = request.query_params.get('title', '')
            if not title:
                return Response(
                    {'error': 'El parámetro "title" es requerido'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Consultar la API de Marvel
            data = MarvelAPIService.get_comics(
                limit=20, 
                title_starts_with=title
            )
            
            # Procesar los resultados
            results = []
            for item in data['results']:
                # Convertir la fecha de publicación si está disponible
                publication_date = None
                if item.get('dates'):
                    for date in item['dates']:
                        if date['type'] == 'onsaleDate' and date['date']:
                            try:
                                publication_date = datetime.strptime(
                                    date['date'].split('T')[0], 
                                    '%Y-%m-%d'
                                ).date()
                            except ValueError:
                                pass
                
                # Obtener el precio si está disponible
                price = 0.00
                if item.get('prices'):
                    for price_data in item['prices']:
                        if price_data['type'] == 'printPrice':
                            price = price_data['price']
                
                # Crear o actualizar el cómic
                comic, created = Comic.objects.update_or_create(
                    marvel_id=item['id'],
                    defaults={
                        'title': item['title'],
                        'description': item.get('description', ''),
                        'isbn': item.get('isbn', ''),
                                                'page_count': item.get('pageCount', 0),
                        'thumbnail': f"{item['thumbnail']['path']}.{item['thumbnail']['extension']}",
                        'price': price,
                        'series': item.get('series', {}).get('name', ''),
                        'publication_date': publication_date,
                        'detail_url': item['urls'][0]['url'] if item.get('urls') else ''
                    }
                )
                results.append(comic)
            
            # Serializar y devolver los resultados
            serializer = ComicMinimalSerializer(results, many=True)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Error al buscar cómics de Marvel: {str(e)}")
            return Response(
                {'error': 'Error al buscar cómics de Marvel'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
