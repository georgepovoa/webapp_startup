
from django import urls
from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf.urls import include

from django.conf import settings
from django.conf.urls.static import static




urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('',include('frontend.urls')),
]

if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL,
                              document_root=settings.MEDIA_ROOT)