from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.shortcuts import redirect

def redirect_to_api(request):
    return redirect('/api/')

urlpatterns = [
    path('', redirect_to_api, name='api-root'),  # Redirect root to API
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
] 