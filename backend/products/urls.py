from django.urls import path
from .views import (
    SellerProductListView,
    ProductCreateView,
    ProductDetailView,
)

urlpatterns = [
    path('seller/products/', SellerProductListView.as_view(), name='seller-products'),
    path('products/', ProductCreateView.as_view(), name='product-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
] 