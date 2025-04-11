from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SellerViewSet, ProductViewSet, CustomAuthToken

router = DefaultRouter()
router.register(r'sellers', SellerViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomAuthToken.as_view(), name='auth-login'),
] 