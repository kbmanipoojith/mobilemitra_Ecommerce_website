from django.core.management.base import BaseCommand
from core.models import ProductCategory, Product, Brand, Model, Seller
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Creates initial data for the application'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating initial data...')

        # Create categories
        categories = {
            'Battery Replacement Parts': ProductCategory.objects.get_or_create(name='Battery Replacement Parts')[0],
            'Screen & Display Assemblies': ProductCategory.objects.get_or_create(name='Screen & Display Assemblies')[0],
            'Charging Port & Cable Modules': ProductCategory.objects.get_or_create(name='Charging Port & Cable Modules')[0],
            'Camera & Lens Assemblies': ProductCategory.objects.get_or_create(name='Camera & Lens Assemblies')[0],
            'Power & Volume Button Modules': ProductCategory.objects.get_or_create(name='Power & Volume Button Modules')[0],
            'Speaker & Audio Components': ProductCategory.objects.get_or_create(name='Speaker & Audio Components')[0],
        }

        # Create a test seller
        test_user, _ = User.objects.get_or_create(
            username='test_seller',
            email='test@example.com',
            defaults={'is_active': True}
        )
        test_user.set_password('test123')
        test_user.save()

        seller, _ = Seller.objects.get_or_create(
            user=test_user,
            business_name='Test Mobile Parts Store'
        )

        # Create brands
        brands = {
            'Samsung': Brand.objects.get_or_create(name='Samsung')[0],
            'Apple': Brand.objects.get_or_create(name='Apple')[0],
            'Oppo': Brand.objects.get_or_create(name='Oppo')[0],
        }

        # Create models
        models = {
            'Galaxy S23': Model.objects.get_or_create(name='Galaxy S23', brand=brands['Samsung'])[0],
            'iPhone 15': Model.objects.get_or_create(name='iPhone 15', brand=brands['Apple'])[0],
            'Find X6': Model.objects.get_or_create(name='Find X6', brand=brands['Oppo'])[0],
        }

        # Create products
        products_data = [
            # Batteries
            {
                'name': 'Samsung S23 Battery',
                'description': 'Original battery replacement with 4000mAh capacity',
                'price': 2499.99,
                'quantity': 15,
                'model': models['Galaxy S23'],
                'category': categories['Battery Replacement Parts'],
            },
            {
                'name': 'iPhone 15 Battery',
                'description': 'Genuine Apple battery replacement',
                'price': 3999.99,
                'quantity': 12,
                'model': models['iPhone 15'],
                'category': categories['Battery Replacement Parts'],
            },
            # Screens
            {
                'name': 'S23 AMOLED Display',
                'description': 'Original Samsung AMOLED screen with installation kit',
                'price': 12999.99,
                'quantity': 10,
                'model': models['Galaxy S23'],
                'category': categories['Screen & Display Assemblies'],
            },
            {
                'name': 'iPhone 15 OLED Screen',
                'description': 'Genuine Apple OLED display with True Tone',
                'price': 15999.99,
                'quantity': 8,
                'model': models['iPhone 15'],
                'category': categories['Screen & Display Assemblies'],
            },
            # Charging Ports
            {
                'name': 'S23 USB-C Port',
                'description': 'Original charging port with flex cable',
                'price': 1499.99,
                'quantity': 20,
                'model': models['Galaxy S23'],
                'category': categories['Charging Port & Cable Modules'],
            },
            {
                'name': 'iPhone 15 USB-C Port',
                'description': 'Genuine Apple USB-C port assembly',
                'price': 2499.99,
                'quantity': 15,
                'model': models['iPhone 15'],
                'category': categories['Charging Port & Cable Modules'],
            },
            # Cameras
            {
                'name': 'S23 Main Camera',
                'description': '200MP main camera module with OIS',
                'price': 8999.99,
                'quantity': 8,
                'model': models['Galaxy S23'],
                'category': categories['Camera & Lens Assemblies'],
            },
            {
                'name': 'iPhone 15 Camera Module',
                'description': '48MP main camera with LiDAR',
                'price': 9999.99,
                'quantity': 6,
                'model': models['iPhone 15'],
                'category': categories['Camera & Lens Assemblies'],
            },
            # Buttons
            {
                'name': 'S23 Button Set',
                'description': 'Complete button set with flex cables',
                'price': 999.99,
                'quantity': 25,
                'model': models['Galaxy S23'],
                'category': categories['Power & Volume Button Modules'],
            },
            {
                'name': 'iPhone 15 Button Kit',
                'description': 'Full button replacement set',
                'price': 1299.99,
                'quantity': 20,
                'model': models['iPhone 15'],
                'category': categories['Power & Volume Button Modules'],
            },
            # Speakers
            {
                'name': 'S23 Speaker Unit',
                'description': 'Original speaker module with earpiece',
                'price': 1499.99,
                'quantity': 18,
                'model': models['Galaxy S23'],
                'category': categories['Speaker & Audio Components'],
            },
            {
                'name': 'iPhone 15 Speaker',
                'description': 'Genuine Apple speaker assembly',
                'price': 1799.99,
                'quantity': 15,
                'model': models['iPhone 15'],
                'category': categories['Speaker & Audio Components'],
            },
        ]

        for product_data in products_data:
            Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'seller': seller,
                    **product_data
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully created initial data')) 