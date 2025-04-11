from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Product
from .serializers import ProductSerializer
from django.core.exceptions import PermissionDenied

class SellerProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        if not self.request.user.is_seller:
            raise PermissionDenied("Only sellers can access this endpoint")
        return Product.objects.filter(seller=self.request.user)

class ProductCreateView(generics.CreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        if not self.request.user.is_seller:
            raise PermissionDenied("Only sellers can create products")
        serializer.save(seller=self.request.user)

class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    
    def get_queryset(self):
        if self.request.user.is_seller:
            return Product.objects.filter(seller=self.request.user)
        return Product.objects.all()

    def perform_update(self, serializer):
        product = self.get_object()
        if product.seller != self.request.user:
            raise PermissionDenied("You can only update your own products")
        serializer.save()

    def perform_destroy(self, instance):
        if instance.seller != self.request.user:
            raise PermissionDenied("You can only delete your own products")
        instance.delete() 