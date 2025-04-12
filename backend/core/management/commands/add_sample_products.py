from django.core.management.base import BaseCommand
from core.models import User, Seller, Brand, Model, Product, ProductCategory
from django.db import transaction
from django.db.utils import IntegrityError

class Command(BaseCommand):
    help = 'Add sample products with sellers, brands, models and categories'

    def handle(self, *args, **kwargs):
        # Create or get Users for Sellers
        users = {}
        for seller_data in [
            ('mobilehub@example.com', 'Mobile Hub Admin'),
            ('gadgetzone@example.com', 'Gadget Zone Admin'),
            ('phonecare@example.com', 'Phone Care Admin')
        ]:
            email, name = seller_data
            try:
                with transaction.atomic():
                    user = User.objects.create_user(
                        email=email,
                        password='password123',
                        name=name
                    )
            except IntegrityError:
                user = User.objects.get(email=email)
            users[email] = user

        # Create or get Sellers
        sellers = {}
        seller_data = [
            (users['mobilehub@example.com'], 'Mobile Hub', '9876543210', '123 Tech Street, Electronics Market'),
            (users['gadgetzone@example.com'], 'Gadget Zone', '9876543211', '456 Digital Avenue, Phone Market'),
            (users['phonecare@example.com'], 'Phone Care', '9876543212', '789 Mobile Road, Repair Center')
        ]
        
        for user, business_name, phone, address in seller_data:
            try:
                with transaction.atomic():
                    seller = Seller.objects.create(
                        user=user,
                        business_name=business_name,
                        phone=phone,
                        address=address
                    )
            except IntegrityError:
                seller = Seller.objects.get(user=user)
            sellers[business_name.lower().replace(' ', '_')] = seller

        # Create or get Brands
        brands = {}
        for brand_data in [
            ('Samsung', True),
            ('Apple', True),
            ('OnePlus', True),
            ('Xiaomi', False),
            ('Google', False)
        ]:
            name, featured = brand_data
            brand, _ = Brand.objects.get_or_create(
                name=name,
                defaults={'featured': featured}
            )
            brands[name.lower()] = brand

        # Create or get Models
        models = {}
        model_data = [
            (brands['samsung'], 'Galaxy S23'),
            (brands['samsung'], 'Galaxy S22'),
            (brands['apple'], 'iPhone 15'),
            (brands['apple'], 'iPhone 14'),
            (brands['oneplus'], 'OnePlus 11'),
            (brands['oneplus'], 'OnePlus 10'),
            (brands['xiaomi'], 'Xiaomi 13'),
            (brands['google'], 'Pixel 7')
        ]
        
        for brand, name in model_data:
            model, _ = Model.objects.get_or_create(
                brand=brand,
                name=name
            )
            models[f"{brand.name.lower()}_{name.lower().replace(' ', '_')}"] = model

        # Create or get Product Categories
        categories = {}
        for category_name in ['Battery', 'Screen', 'Charging Port', 'Camera', 'Button', 'Speaker']:
            category, _ = ProductCategory.objects.get_or_create(name=category_name)
            categories[category_name.lower().replace(' ', '_')] = category

        # Create Products
        products = [
            # Samsung S23 Parts
            {
                'name': 'Samsung S23 Battery',
                'description': 'Original battery replacement with 4000mAh capacity',
                'price': 2499.99,
                'stock': 15,
                'image': 'products/batteries/battery2.jpeg',
                'model': models['samsung_galaxy_s23'],
                'category': categories['battery']
            },
            {
                'name': 'S23 AMOLED Display',
                'description': 'Original Samsung AMOLED screen with installation kit',
                'price': 12999.99,
                'stock': 10,
                'image': 'products/screens/screen2.jpeg',
                'model': models['samsung_galaxy_s23'],
                'category': categories['screen']
            },
            {
                'name': 'S23 USB-C Port',
                'description': 'Original charging port with flex cable',
                'price': 1499.99,
                'stock': 20,
                'image': 'products/charging/charging1.jpeg',
                'model': models['samsung_galaxy_s23'],
                'category': categories['charging_port']
            },
            # iPhone 15 Parts
            {
                'name': 'iPhone 15 Battery',
                'description': 'Genuine Apple battery replacement',
                'price': 3999.99,
                'stock': 12,
                'image': 'products/batteries/battery3.jpeg',
                'model': models['apple_iphone_15'],
                'category': categories['battery']
            },
            {
                'name': 'iPhone 15 Pro OLED',
                'description': 'Genuine Apple OLED display with True Tone',
                'price': 15999.99,
                'stock': 8,
                'image': 'products/screens/screen3.jpeg',
                'model': models['apple_iphone_15'],
                'category': categories['screen']
            },
            # OnePlus Parts
            {
                'name': 'OnePlus 11 Battery',
                'description': '5000mAh high-capacity battery',
                'price': 2299.99,
                'stock': 18,
                'image': 'products/batteries/battery4.jpeg',
                'model': models['oneplus_oneplus_11'],
                'category': categories['battery']
            },
            {
                'name': 'OnePlus 11 AMOLED',
                'description': 'Fluid AMOLED display replacement',
                'price': 11999.99,
                'stock': 7,
                'image': 'products/screens/screen4.jpeg',
                'model': models['oneplus_oneplus_11'],
                'category': categories['screen']
            },
            # Xiaomi Parts
            {
                'name': 'Xiaomi 13 Battery',
                'description': 'Original Xiaomi battery with fast charging',
                'price': 1999.99,
                'stock': 25,
                'image': 'products/batteries/battery5.jpeg',
                'model': models['xiaomi_xiaomi_13'],
                'category': categories['battery']
            },
            {
                'name': 'Xiaomi 13 Camera',
                'description': 'Leica co-developed camera module',
                'price': 7999.99,
                'stock': 5,
                'image': 'products/cameras/camera3.jpeg',
                'model': models['xiaomi_xiaomi_13'],
                'category': categories['camera']
            },
            # Google Pixel Parts
            {
                'name': 'Pixel 7 Battery',
                'description': 'Original Google battery replacement',
                'price': 2799.99,
                'stock': 15,
                'image': 'products/batteries/battery6.jpeg',
                'model': models['google_pixel_7'],
                'category': categories['battery']
            },
            {
                'name': 'Pixel 7 Camera',
                'description': 'Google computational photography camera module',
                'price': 8999.99,
                'stock': 6,
                'image': 'products/cameras/camera4.jpeg',
                'model': models['google_pixel_7'],
                'category': categories['camera']
            }
        ]

        # Create all products
        for product_data in products:
            try:
                with transaction.atomic():
                    Product.objects.get_or_create(
                        name=product_data['name'],
                        defaults=product_data
                    )
            except IntegrityError as e:
                self.stdout.write(self.style.WARNING(f"Product already exists: {product_data['name']}"))
                continue

        self.stdout.write(self.style.SUCCESS('Successfully added sample data')) 