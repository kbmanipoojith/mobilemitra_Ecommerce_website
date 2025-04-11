from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    LoginView,
    UserRegisterView,
    SellerRegisterView,
    UserProfileView,
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/user/', UserRegisterView.as_view(), name='register-user'),
    path('register/seller/', SellerRegisterView.as_view(), name='register-seller'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
] 