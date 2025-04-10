import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class RickAndMortyService:
    BASE_URL = "https://rickandmortyapi.com/api"
    
    @classmethod
    def get_character_list(cls, page=1):
        """Obtiene una lista de personajes paginada"""
        try:
            response = requests.get(f"{cls.BASE_URL}/character", params={"page": page})
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching character list: {e}")
            return None
    
    @classmethod
    def get_character_details(cls, character_id):
        """Obtiene detalles de un personaje específico"""
        try:
            response = requests.get(f"{cls.BASE_URL}/character/{character_id}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching character {character_id}: {e}")
            return None
    
    @classmethod
    def get_location_list(cls, page=1):
        """Obtiene una lista de ubicaciones paginada"""
        try:
            response = requests.get(f"{cls.BASE_URL}/location", params={"page": page})
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching location list: {e}")
            return None
    
    @classmethod
    def get_location_details(cls, location_id):
        """Obtiene detalles de una ubicación específica"""
        try:
            response = requests.get(f"{cls.BASE_URL}/location/{location_id}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching location {location_id}: {e}")
            return None
    
    @classmethod
    def get_episode_list(cls, page=1):
        """Obtiene una lista de episodios paginada"""
        try:
            response = requests.get(f"{cls.BASE_URL}/episode", params={"page": page})
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching episode list: {e}")
            return None
    
    @classmethod
    def get_episode_details(cls, episode_id):
        """Obtiene detalles de un episodio específico"""
        try:
            response = requests.get(f"{cls.BASE_URL}/episode/{episode_id}")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching episode {episode_id}: {e}")
            return None
