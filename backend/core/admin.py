from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Seller, Brand, Model, Product, Cart, CartItem, Order, OrderItem

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_superuser', 'date_joined')
    search_fields = ('email', 'name')
    ordering = ('email',)
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

class SellerAdmin(admin.ModelAdmin):
    list_display = ('business_name', 'user', 'phone', 'created_at')
    search_fields = ('business_name', 'user__email', 'phone')
    list_filter = ('created_at',)

admin.site.register(User, CustomUserAdmin)
admin.site.register(Seller, SellerAdmin)
admin.site.register(Brand)
admin.site.register(Model)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(CartItem)
admin.site.register(Order)
admin.site.register(OrderItem)
