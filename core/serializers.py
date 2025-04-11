from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Seller, Product

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'password')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class SellerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Seller
        fields = ('id', 'user', 'business_name', 'phone', 'address', 'created_at')
        read_only_fields = ('created_at',)

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        seller = Seller.objects.create(user=user, **validated_data)
        return seller

class ProductSerializer(serializers.ModelSerializer):
    seller_name = serializers.CharField(source='seller.business_name', read_only=True)

    class Meta:
        model = Product
        fields = (
            'id', 'seller', 'seller_name', 'name', 'description',
            'price', 'quantity', 'category', 'image_url',
            'created_at', 'updated_at'
        )
        read_only_fields = ('created_at', 'updated_at') 