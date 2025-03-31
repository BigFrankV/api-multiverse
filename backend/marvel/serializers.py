from rest_framework import serializers
from .models import MarvelCharacter, Comic, CharacterComic

class ComicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comic
        fields = '__all__'

class ComicMinimalSerializer(serializers.ModelSerializer):
    """Serializer simplificado para cómics cuando se muestran en listas"""
    class Meta:
        model = Comic
        fields = ['id', 'marvel_id', 'title', 'thumbnail', 'price']

class MarvelCharacterSerializer(serializers.ModelSerializer):
    comics = serializers.SerializerMethodField()
    
    class Meta:
        model = MarvelCharacter
        fields = '__all__'
    
    def get_comics(self, obj):
        # Obtenemos los primeros 5 cómics asociados con este personaje
        character_comics = CharacterComic.objects.filter(character=obj).select_related('comic')[:5]
        comics = [cc.comic for cc in character_comics]
        return ComicMinimalSerializer(comics, many=True).data

class MarvelCharacterMinimalSerializer(serializers.ModelSerializer):
    """Serializer simplificado para personajes cuando se muestran en listas"""
    class Meta:
        model = MarvelCharacter
        fields = ['id', 'marvel_id', 'name', 'thumbnail', 'comics_available']
