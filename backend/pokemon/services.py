import requests
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class PokemonService:
    BASE_URL = "https://pokeapi.co/api/v2"
    
    @classmethod
    def get_pokemon_list(cls, limit=20, offset=0):
        """Obtiene una lista de pokémon paginada"""
        try:
            response = requests.get(f"{cls.BASE_URL}/pokemon", params={
                "limit": limit, 
                "offset": offset
            })
            response.raise_for_status()
            data = response.json()
            
            # Obtener detalles básicos para cada Pokémon
            pokemon_list = []
            for pokemon in data["results"]:
                pokemon_details = cls.get_pokemon_details_basic(pokemon["url"])
                if pokemon_details:
                    pokemon_list.append(pokemon_details)
            
            return {
                "count": data["count"],
                "next": data["next"],
                "previous": data["previous"],
                "results": pokemon_list
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching pokemon list: {e}")
            return None
    
    @classmethod
    def get_pokemon_details_basic(cls, url):
        """Obtiene detalles básicos de un pokémon desde una URL"""
        try:
            response = requests.get(url)
            response.raise_for_status()
            data = response.json()
            
            return {
                "id": data["id"],
                "name": data["name"],
                "image": data["sprites"]["other"]["official-artwork"]["front_default"] or data["sprites"]["front_default"],
                "types": [t["type"]["name"] for t in data["types"]]
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching pokemon details from {url}: {e}")
            return None
    
    @classmethod
    def get_pokemon_details(cls, id_or_name):
        """Obtiene detalles completos de un pokémon por su ID o nombre"""
        try:
            # Obtener información básica del pokémon
            response = requests.get(f"{cls.BASE_URL}/pokemon/{id_or_name}")
            response.raise_for_status()
            data = response.json()
            
            # Obtener información de la especie
            species_response = requests.get(data["species"]["url"])
            species_response.raise_for_status()
            species_data = species_response.json()
            
            # Obtener descripción en inglés o español
            flavor_text = ""
            for entry in species_data["flavor_text_entries"]:
                if entry["language"]["name"] == "en":
                    flavor_text = entry["flavor_text"].replace("\n", " ").replace("\f", " ")
                    break
            
            # Obtener género si está disponible
            gender_rate = species_data.get("gender_rate", -1)
            female_percent = (gender_rate / 8) * 100 if gender_rate >= 0 else None
            male_percent = 100 - female_percent if female_percent is not None else None
            
            return {
                "id": data["id"],
                "name": data["name"],
                "height": data["height"] / 10,  # Convertir a metros
                "weight": data["weight"] / 10,  # Convertir a kilogramos
                "base_experience": data["base_experience"],
                "types": [t["type"]["name"] for t in data["types"]],
                "abilities": [
                    {
                        "name": a["ability"]["name"],
                        "is_hidden": a["is_hidden"]
                    } for a in data["abilities"]
                ],
                "stats": [
                    {
                        "name": s["stat"]["name"],
                        "base_stat": s["base_stat"],
                        "effort": s["effort"]
                    } for s in data["stats"]
                ],
                "moves": [m["move"]["name"] for m in data["moves"][:10]],  # Limitamos a 10 movimientos
                "images": {
                    "front_default": data["sprites"]["front_default"],
                    "front_shiny": data["sprites"]["front_shiny"],
                    "back_default": data["sprites"]["back_default"],
                    "back_shiny": data["sprites"]["back_shiny"],
                    "official_artwork": data["sprites"]["other"]["official-artwork"]["front_default"],
                    "dream_world": data["sprites"]["other"]["dream_world"]["front_default"]
                },
                "species": {
                    "name": species_data["name"],
                    "is_legendary": species_data["is_legendary"],
                    "is_mythical": species_data["is_mythical"],
                    "habitat": species_data.get("habitat", {}).get("name") if species_data.get("habitat") else None,
                    "flavor_text": flavor_text,
                    "gender_rate": {
                        "female_percent": female_percent,
                        "male_percent": male_percent,
                        "genderless": gender_rate == -1
                    }
                }
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching pokemon {id_or_name}: {e}")
            return None
