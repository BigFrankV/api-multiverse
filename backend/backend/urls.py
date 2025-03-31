from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
   openapi.Info(
      title="API Multiverse",
      default_version='v1',
      description="API for multiple franchise universes",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@apimultiverse.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/pokemon/', include('pokemon.urls')),
    path('api/marvel/', include('marvel.urls')),  # Añadida la ruta para Marvel
   
    # Swagger documentation
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
