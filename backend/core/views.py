from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from .models import Seller, Product, Cart, CartItem, Brand, Model, Order, OrderItem, ProductCategory
from .serializers import (
    UserSerializer, SellerSerializer, ProductSerializer, CartSerializer, CartItemSerializer, 
    BrandSerializer, ModelSerializer, OrderSerializer, OrderItemSerializer, ProductCategorySerializer
)
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return super().get_permissions()

class SellerViewSet(viewsets.ModelViewSet):
    queryset = Seller.objects.all()
    serializer_class = SellerSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        return super().get_permissions()

class IsSeller(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and hasattr(request.user, 'seller')

class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [AllowAny]

class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Model.objects.all()
        brand_id = self.request.query_params.get('brand', None)
        if brand_id is not None:
            queryset = queryset.filter(brand_id=brand_id)
        return queryset

class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    permission_classes = [AllowAny]

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        brand_id = self.request.query_params.get('brand', None)
        model_id = self.request.query_params.get('model', None)
        category_id = self.request.query_params.get('category', None)

        if brand_id:
            queryset = queryset.filter(model__brand_id=brand_id)
        if model_id:
            queryset = queryset.filter(model_id=model_id)
        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get('product')
        quantity = request.data.get('quantity', 1)
        
        try:
            product = Product.objects.get(id=product_id)
            cart_item, created = CartItem.objects.get_or_create(
                cart=cart,
                product=product,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            
            return Response({'status': 'Item added to cart'})
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)

    @action(detail=True, methods=['post'])
    def remove_item(self, request, pk=None):
        cart = self.get_object()
        product_id = request.data.get('product')
        
        try:
            cart_item = cart.items.get(product_id=product_id)
            cart_item.delete()
            return Response({'status': 'Item removed from cart'})
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found in cart'}, status=404)

class SellerDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsSeller]
    
    def get(self, request):
        seller = request.user.seller
        
        # Get basic seller info
        seller_data = SellerSerializer(seller).data
        
        # Get product statistics
        total_products = Product.objects.filter(seller=seller).count()
        out_of_stock = Product.objects.filter(seller=seller, quantity=0).count()
        low_stock = Product.objects.filter(seller=seller, quantity__lte=5).count()
        
        # Get recent orders
        recent_orders = Order.objects.filter(
            items__product__seller=seller
        ).distinct().order_by('-created_at')[:5]
        
        # Get order statistics
        today = timezone.now().date()
        thirty_days_ago = today - timedelta(days=30)
        
        recent_orders_count = Order.objects.filter(
            items__product__seller=seller,
            created_at__date__gte=thirty_days_ago
        ).distinct().count()
        
        # Calculate revenue
        revenue = OrderItem.objects.filter(
            product__seller=seller,
            order__created_at__date__gte=thirty_days_ago
        ).aggregate(
            total=Sum('price')
        )['total'] or 0
        
        return Response({
            'seller': seller_data,
            'statistics': {
                'total_products': total_products,
                'out_of_stock': out_of_stock,
                'low_stock': low_stock,
                'recent_orders_count': recent_orders_count,
                'monthly_revenue': revenue
            },
            'recent_orders': OrderSerializer(recent_orders, many=True).data
        })

class SellerOrderView(APIView):
    permission_classes = [IsAuthenticated, IsSeller]
    
    def get(self, request):
        seller = request.user.seller
        orders = Order.objects.filter(
            items__product__seller=seller
        ).distinct().order_by('-created_at')
        
        # Filter by status if provided
        status = request.query_params.get('status')
        if status:
            orders = orders.filter(status=status)
            
        return Response(OrderSerializer(orders, many=True).data)

    def put(self, request, order_id):
        try:
            order = Order.objects.get(
                id=order_id,
                items__product__seller=request.user.seller
            )
            
            # Update order status
            status = request.data.get('status')
            if status:
                order.status = status
                order.save()
                
            return Response(OrderSerializer(order).data)
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

class SellerProductView(APIView):
    permission_classes = [IsAuthenticated, IsSeller]
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request):
        seller = request.user.seller
        products = Product.objects.filter(seller=seller)
        return Response(ProductSerializer(products, many=True).data)
    
    def post(self, request):
        seller = request.user.seller
        serializer = ProductSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(seller=seller)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, product_id):
        try:
            product = Product.objects.get(id=product_id, seller=request.user.seller)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )

@api_view(['GET'])
@permission_classes([AllowAny])
def get_categories_by_model(request, model_id):
    """Get available product categories for a specific model"""
    categories = ProductCategory.objects.filter(
        products__model_id=model_id
    ).distinct()
    serializer = ProductCategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_models_by_brand(request, brand_id):
    """Get all models for a specific brand"""
    models = Model.objects.filter(brand_id=brand_id)
    serializer = ModelSerializer(models, many=True)
    return Response(serializer.data)
