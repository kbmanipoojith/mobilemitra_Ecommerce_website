from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from core.models import User, Seller

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_active', 'date_joined')
        read_only_fields = ('id', 'date_joined')

class UserRegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        name = f"{validated_data.pop('first_name')} {validated_data.pop('last_name')}"
        username = validated_data.pop('username')
        phone_number = validated_data.pop('phone_number')
        
        user = User.objects.create(
            email=validated_data['email'],
            name=name
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class SellerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Seller
        fields = ('id', 'user', 'business_name', 'phone', 'address', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')

class SellerRegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    phone_number = serializers.CharField(required=True)
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True, required=True)
    business_name = serializers.CharField(required=True)
    address = serializers.CharField(required=True)

    class Meta:
        model = Seller
        fields = ('username', 'email', 'first_name', 'last_name', 'phone_number', 'password', 'confirm_password', 'business_name', 'address')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        # Check if a seller account already exists with this email
        try:
            user = User.objects.get(email=attrs['email'])
            if hasattr(user, 'seller'):
                raise serializers.ValidationError({"email": "A seller account with this email already exists"})
        except User.DoesNotExist:
            pass
            
        return attrs

    def create(self, validated_data):
        name = f"{validated_data.pop('first_name')} {validated_data.pop('last_name')}"
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')
        validated_data.pop('username')  # We don't use username in our User model
        phone = validated_data.pop('phone_number')
        
        # Create new user for seller
        user = User.objects.create(
            email=email,
            name=name
        )
        user.set_password(password)
        user.save()

        # Create the seller profile
        seller = Seller.objects.create(
            user=user,
            phone=phone,
            business_name=validated_data['business_name'],
            address=validated_data['address']
        )
        return seller 