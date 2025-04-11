from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.models import Seller, Brand, Model, Product, ProductCategory
from decimal import Decimal
import random

User = get_user_model()

class Command(BaseCommand):
    help = 'Add sample sellers and their products'

    def handle(self, *args, **kwargs):
        # Create sample sellers
        sellers_data = [
            {
                'email': 'mobilehub@example.com',
                'name': 'Mobile Hub',
                'password': 'password123',
                'business_name': 'Mobile Hub Electronics',
                'phone': '+1234567890',
                'address': '123 Mobile Street, Tech City'
            },
            {
                'email': 'gadgetzone@example.com',
                'name': 'Gadget Zone',
                'password': 'password123',
                'business_name': 'Gadget Zone International',
                'phone': '+1987654321',
                'address': '456 Gadget Avenue, Tech Town'
            },
            {
                'email': 'phonemaster@example.com',
                'name': 'Phone Master',
                'password': 'password123',
                'business_name': 'Phone Master Store',
                'phone': '+1122334455',
                'address': '789 Phone Road, Mobile City'
            }
        ]

        created_sellers = []
        for seller_data in sellers_data:
            try:
                # Create user
                user = User.objects.create_user(
                    email=seller_data['email'],
                    name=seller_data['name'],
                    password=seller_data['password']
                )
                
                # Create seller profile
                seller = Seller.objects.create(
                    user=user,
                    business_name=seller_data['business_name'],
                    phone=seller_data['phone'],
                    address=seller_data['address']
                )
                created_sellers.append(seller)
                self.stdout.write(self.style.SUCCESS(f'Created seller: {seller.business_name}'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error creating seller: {str(e)}'))

        # Ensure we have the Smartphones category
        smartphones = ProductCategory.objects.get_or_create(
            name='Smartphones'
        )[0]

        # Sample price ranges for different tiers
        price_ranges = {
            'budget': (10000, 20000),
            'mid_range': (20000, 40000),
            'premium': (40000, 150000)
        }

        # Function to generate a random price within a range
        def get_random_price(min_price, max_price):
            return round(random.uniform(min_price, max_price), 2)

        # Create or update brands and their models
        brands_and_models = {
            'SAMSUNG': [
                ('Galaxy S25 Ultra', 'premium'), ('Galaxy S24 Ultra', 'premium'),
                ('Galaxy S24', 'premium'), ('Galaxy S23 FE', 'premium'),
                ('Galaxy Z Fold 6', 'premium'), ('Galaxy Z Flip 6', 'premium'),
                ('Galaxy A55 5G', 'mid_range'), ('Galaxy A35 5G', 'mid_range'),
                ('Galaxy M13 5G', 'budget')
            ],
            'Apple': [
                ('iPhone 15 Pro Max', 'premium'), ('iPhone 15 Pro', 'premium'),
                ('iPhone 15 Plus', 'premium'), ('iPhone 15', 'premium'),
                ('iPhone 14 Pro Max', 'premium'), ('iPhone 14 Pro', 'premium'),
                ('iPhone 14 Plus', 'premium'), ('iPhone 14', 'premium'),
                ('iPhone SE (3rd Generation)', 'mid_range')
            ],
            'ONEPLUS': [
                ('11', 'premium'), ('11R', 'premium'),
                ('Nord 3', 'mid_range'), ('Nord CE 3', 'mid_range'),
                ('10T', 'premium'), ('9', 'premium'),
                ('8T', 'mid_range'), ('8 Pro', 'premium')
            ]
            # Add more brands as needed
        }

        # Process each brand and its models
        for brand_name, models in brands_and_models.items():
            try:
                # Get or create brand
                brand = Brand.objects.get_or_create(
                    name=brand_name,
                    defaults={'featured': True}
                )[0]

                # Create models and products for this brand
                for model_name, price_tier in models:
                    # Create model
                    model = Model.objects.get_or_create(
                        brand=brand,
                        name=model_name
                    )[0]

                    # Get price range for this tier
                    min_price, max_price = price_ranges[price_tier]
                    price = get_random_price(min_price, max_price)

                    # Create product with random seller
                    seller = random.choice(created_sellers)
                    product_name = f"{brand_name} {model_name}"
                    
                    Product.objects.get_or_create(
                        model=model,
                        category=smartphones,
                        name=product_name,
                        defaults={
                            'description': f'Latest {product_name} with amazing features',
                            'price': Decimal(str(price)),
                            'stock': random.randint(10, 100)
                        }
                    )
                    self.stdout.write(self.style.SUCCESS(f'Created product: {product_name}'))

            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Error processing brand {brand_name}: {str(e)}'))

        self.stdout.write(self.style.SUCCESS('Successfully created sample sellers and products')) 