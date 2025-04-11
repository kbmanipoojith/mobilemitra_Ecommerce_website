from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    BrandViewSet, ModelViewSet, ProductViewSet, CartViewSet,
    SellerDashboardView, SellerOrderView, SellerProductView,
    ProductCategoryViewSet, get_models_by_brand, get_categories_by_model
)

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'models', ModelViewSet)
router.register(r'categories', ProductCategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'cart', CartViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Seller Dashboard URLs
    path('seller/dashboard/', SellerDashboardView.as_view(), name='seller-dashboard'),
    path('seller/orders/', SellerOrderView.as_view(), name='seller-orders'),
    path('seller/orders/<int:order_id>/', SellerOrderView.as_view(), name='seller-order-detail'),
    path('seller/products/', SellerProductView.as_view(), name='seller-products'),
    path('seller/products/<int:product_id>/', SellerProductView.as_view(), name='seller-product-detail'),
    path('models/brand/<int:brand_id>/', get_models_by_brand, name='models-by-brand'),
    path('categories/model/<int:model_id>/', get_categories_by_model, name='categories-by-model'),
] 