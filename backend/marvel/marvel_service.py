import hashlib
import time
import requests
from datetime import datetime
from django.conf import settings

class MarvelAPIService:
    """Servicio para interactuar con la API de Marvel"""
    
    BASE_URL = "https://gateway.marvel.com/v1/public"
    
    @staticmethod
    def _generate_hash(timestamp):
        """Genera el hash requerido por la API de Marvel"""
        md5_input = f"{timestamp}{settings.MARVEL_API_PRIVATE_KEY}{settings.MARVEL_API_PUBLIC_KEY}"
        return hashlib.md5(md5_input.encode('utf-8')).hexdigest()
    
    @staticmethod
    def _get_auth_params():
        """Obtiene los parámetros de autenticación necesarios para las solicitudes"""
        timestamp = str(int(time.time()))
        return {
            'ts': timestamp,
            'apikey': settings.MARVEL_API_PUBLIC_KEY,
            'hash': MarvelAPIService._generate_hash(timestamp)
        }
    
    @classmethod
    def get_characters(cls, limit=20, offset=0, name_starts_with=None):
        """Obtiene una lista de personajes de Marvel"""
        params = cls._get_auth_params()
        params.update({
            'limit': limit,
            'offset': offset,
            'orderBy': 'name'
        })
        
        if name_starts_with:
            params['nameStartsWith'] = name_starts_with
        
        response = requests.get(f"{cls.BASE_URL}/characters", params=params)
        response.raise_for_status()  # Lanza una excepción si la solicitud falla
        
        return response.json()['data']
    
    @classmethod
    def get_character(cls, character_id):
        """Obtiene un personaje específico por su ID"""
        params = cls._get_auth_params()
        response = requests.get(f"{cls.BASE_URL}/characters/{character_id}", params=params)
        response.raise_for_status()
        
        return response.json()['data']['results'][0]
    
    @classmethod
    def get_character_comics(cls, character_id, limit=10):
        """Obtiene los cómics de un personaje específico"""
        params = cls._get_auth_params()
        params.update({
            'limit': limit,
            'orderBy': '-focDate'
        })
        
        response = requests.get(f"{cls.BASE_URL}/characters/{character_id}/comics", params=params)
        response.raise_for_status()
        
        return response.json()['data']['results']
    
    @classmethod
    def get_comics(cls, limit=20, offset=0, title_starts_with=None):
        """Obtiene una lista de cómics"""
        params = cls._get_auth_params()
        params.update({
            'limit': limit,
            'offset': offset,
            'orderBy': '-focDate'
        })
        
        if title_starts_with:
            params['titleStartsWith'] = title_starts_with
        
        response = requests.get(f"{cls.BASE_URL}/comics", params=params)
        response.raise_for_status()
        
        return response.json()['data']
    
    @classmethod
    def get_comic(cls, comic_id):
        """Obtiene un cómic específico por su ID"""
        params = cls._get_auth_params()
        response = requests.get(f"{cls.BASE_URL}/comics/{comic_id}", params=params)
        response.raise_for_status()
        
        return response.json()['data']['results'][0]
