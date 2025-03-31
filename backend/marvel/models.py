

# Create your models here.
from django.db import models

class MarvelCharacter(models.Model):
    """Modelo para almacenar información de personajes de Marvel"""
    marvel_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    thumbnail = models.URLField(max_length=500, blank=True)
    comics_available = models.IntegerField(default=0)
    series_available = models.IntegerField(default=0)
    stories_available = models.IntegerField(default=0)
    events_available = models.IntegerField(default=0)
    detail_url = models.URLField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']
        verbose_name = "Personaje Marvel"
        verbose_name_plural = "Personajes Marvel"

class Comic(models.Model):
    """Modelo para almacenar información de cómics de Marvel"""
    marvel_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    isbn = models.CharField(max_length=20, blank=True)
    page_count = models.IntegerField(default=0)
    thumbnail = models.URLField(max_length=500, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    series = models.CharField(max_length=255, blank=True)
    publication_date = models.DateField(null=True, blank=True)
    detail_url = models.URLField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-publication_date']
        verbose_name = "Cómic"
        verbose_name_plural = "Cómics"

class CharacterComic(models.Model):
    """Modelo para la relación entre personajes y cómics"""
    character = models.ForeignKey(MarvelCharacter, on_delete=models.CASCADE, related_name='comics')
    comic = models.ForeignKey(Comic, on_delete=models.CASCADE, related_name='characters')
    
    class Meta:
        unique_together = ('character', 'comic')
        verbose_name = "Relación Personaje-Cómic"
        verbose_name_plural = "Relaciones Personaje-Cómic"
