from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .models import Seller, Product
from .serializers import UserSerializer, SellerSerializer, ProductSerializer

User = get_user_model()

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                         context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        try:
            seller = Seller.objects.get(user=user)
            seller_data = SellerSerializer(seller).data
        except Seller.DoesNotExist:
            seller_data = None

        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'seller': seller_data
        })

class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    permission_classes = [permissions.AllowAny]

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    @action(detail=False, methods=['GET'])
    def me(self, request):
        try:
            seller = Seller.objects.get(user=request.user)
            serializer = self.get_serializer(seller)
            return Response(serializer.data)
        except Seller.DoesNotExist:
            return Response(
                {'detail': 'Seller profile not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = Product.objects.all()
        seller_id = self.request.query_params.get('seller_id', None)
        if seller_id is not None:
            queryset = queryset.filter(seller_id=seller_id)
        return queryset

    def perform_create(self, serializer):
        try:
            seller = Seller.objects.get(user=self.request.user)
            serializer.save(seller=seller)
        except Seller.DoesNotExist:
            raise permissions.PermissionDenied(
                detail='You must be a registered seller to create products.'
            )

    def check_object_permissions(self, request, obj):
        super().check_object_permissions(request, obj)
        if request.method not in permissions.SAFE_METHODS:
            if obj.seller.user != request.user:
                raise permissions.PermissionDenied(
                    detail='You do not have permission to modify this product.'
                ) 