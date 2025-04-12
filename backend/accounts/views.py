from rest_framework import status, permissions, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import UserSerializer, UserRegisterSerializer, SellerRegisterSerializer, SellerSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import permission_classes, api_view
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from core.models import User, Seller
from django.db import transaction
from django.utils import timezone

User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class SellerRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        with transaction.atomic():
            user_data = {
                'email': request.data.get('email'),
                'password': request.data.get('password'),
                'name': request.data.get('name'),
            }
            user_serializer = UserRegisterSerializer(data=user_data)
            if user_serializer.is_valid():
                user = user_serializer.save()
                
                seller_data = {
                    'user': user.id,
                    'business_name': request.data.get('business_name'),
                    'phone': request.data.get('phone'),
                    'address': request.data.get('address'),
                }
                seller_serializer = SellerSerializer(data=seller_data)
                if seller_serializer.is_valid():
                    seller_serializer.save()
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'access': str(refresh.access_token),
                        'refresh': str(refresh),
                    }, status=status.HTTP_201_CREATED)
                user.delete()
                return Response(seller_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get('email')
            password = request.data.get('password')
            is_seller = request.data.get('is_seller', False)

            # Input validation
            if not email or not password:
                return Response({
                    'error': 'Missing credentials',
                    'detail': 'Please provide both email and password.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Email format validation
            if not '@' in email or not '.' in email:
                return Response({
                    'error': 'Invalid email format',
                    'detail': 'Please provide a valid email address.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Attempt authentication using EmailBackend
            user = authenticate(request, email=email, password=password, is_seller=is_seller)

            if not user:
                return Response({
                    'error': 'Authentication failed',
                    'detail': 'Invalid email or password.'
                }, status=status.HTTP_401_UNAUTHORIZED)

            # Check if user is active
            if not user.is_active:
                return Response({
                    'error': 'Account inactive',
                    'detail': 'Your account has been deactivated. Please contact support.'
                }, status=status.HTTP_403_FORBIDDEN)

            # Get user type and additional data
            try:
                seller = user.seller
                user_type = 'seller'
                if is_seller and not seller.is_verified:
                    return Response({
                        'error': 'Seller verification pending',
                        'detail': 'Your seller account is pending verification.'
                    }, status=status.HTTP_403_FORBIDDEN)
                additional_data = SellerSerializer(seller).data
            except Seller.DoesNotExist:
                if is_seller:
                    return Response({
                        'error': 'Invalid account type',
                        'detail': 'This account is not registered as a seller.'
                    }, status=status.HTTP_403_FORBIDDEN)
                user_type = 'customer'
                additional_data = None

            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            # Prepare response data
            response_data = {
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'name': user.name,
                    'type': user_type,
                    'is_active': user.is_active,
                    'last_login': user.last_login,
                }
            }

            if additional_data:
                response_data['user']['seller_data'] = additional_data

            # Update last login
            user.last_login = timezone.now()
            user.save(update_fields=['last_login'])

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({
                'error': 'Server error',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            user = request.user
            user_data = UserSerializer(user).data
            
            # Check if user is a seller
            try:
                seller = user.seller
                user_data['is_seller'] = True
                user_data['seller'] = SellerSerializer(seller).data
                user_data['account_type'] = 'Seller'
            except Seller.DoesNotExist:
                user_data['is_seller'] = False
                user_data['account_type'] = 'Customer'
            
            user_data['full_name'] = user.name
            user_data['email'] = user.email
            user_data['username'] = user.email  # Using email as username
            user_data['member_since'] = user.date_joined
            user_data['account_status'] = 'Active' if user.is_active else 'Inactive'
            
            return Response(user_data)
        except Exception as e:
            return Response({
                'detail': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            user = request.user
            data = request.data
            
            # Update user fields
            if 'name' in data:
                user.name = data['name']
            if 'email' in data:
                user.email = data['email']
            
            user.save()
            
            # Update seller fields if user is a seller
            if hasattr(user, 'seller'):
                seller = user.seller
                if 'business_name' in data:
                    seller.business_name = data['business_name']
                if 'phone' in data:
                    seller.phone = data['phone']
                if 'address' in data:
                    seller.address = data['address']
                seller.save()
            
            return Response({
                'message': 'Profile updated successfully'
            })
        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 