from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import Seller, Product, Cart, CartItem

User = get_user_model()

class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'name')
    ordering = ('email',)
    filter_horizontal = ()

class SellerAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'user', 'phone', 'created_at')
    search_fields = ('business_name', 'user__email')
    list_filter = ('created_at',)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'seller', 'price', 'quantity', 'category', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'description', 'seller__business_name')

class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 1

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'total', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__email',)
    inlines = [CartItemInline]

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('cart', 'product', 'quantity', 'subtotal', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('cart__user__email', 'product__name')

admin.site.register(User, UserAdmin)
admin.site.register(Seller, SellerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(CartItem, CartItemAdmin) 