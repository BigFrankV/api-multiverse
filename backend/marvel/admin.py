from django.contrib import admin
from .models import MarvelCharacter, Comic, CharacterComic

@admin.register(MarvelCharacter)
class MarvelCharacterAdmin(admin.ModelAdmin):
    list_display = ('name', 'marvel_id', 'comics_available', 'series_available')
    search_fields = ('name',)
    list_filter = ('created_at',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(Comic)
class ComicAdmin(admin.ModelAdmin):
    list_display = ('title', 'marvel_id', 'publication_date', 'price')
    search_fields = ('title',)
    list_filter = ('publication_date',)
    readonly_fields = ('created_at', 'updated_at')

@admin.register(CharacterComic)
class CharacterComicAdmin(admin.ModelAdmin):
    list_display = ('character', 'comic')
    autocomplete_fields = ('character', 'comic')
