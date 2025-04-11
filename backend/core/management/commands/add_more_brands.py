from django.core.management.base import BaseCommand
from core.models import Brand, Model, Product, ProductCategory
from decimal import Decimal
import random

class Command(BaseCommand):
    help = 'Add more brands and their models'

    def handle(self, *args, **kwargs):
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

        # Additional brands and their models
        brands_and_models = {
            'Xiaomi': [
                ('Mi 14 Pro', 'premium'), ('Mi 14', 'premium'),
                ('Mi 13', 'premium'), ('Redmi Note 13 Pro+', 'mid_range'),
                ('Redmi Note 13 Pro', 'mid_range'), ('Redmi Note 13', 'mid_range'),
                ('Redmi 13C', 'budget'), ('Redmi 12', 'budget'),
                ('Poco F5', 'mid_range'), ('Poco X5 Pro', 'mid_range')
            ],
            'realme': [
                ('GT 5', 'premium'), ('11 Pro', 'mid_range'),
                ('11', 'mid_range'), ('Narzo 50 Pro', 'mid_range'),
                ('Narzo 50A', 'budget'), ('X50 Pro', 'premium'),
                ('C55', 'budget'), ('Narzo 30', 'budget'),
                ('GT Master Edition', 'mid_range')
            ],
            'OPPO': [
                ('Find X6 Pro', 'premium'), ('Find X6', 'premium'),
                ('Reno 10', 'mid_range'), ('Reno 7 Pro', 'mid_range'),
                ('Reno 7 5G', 'mid_range'), ('A98 5G', 'mid_range'),
                ('A77', 'budget'), ('A57', 'budget'),
                ('F21 Pro', 'mid_range')
            ],
            'vivo': [
                ('X200 Pro', 'premium'), ('X200', 'premium'),
                ('V50 Pro 5G', 'mid_range'), ('V50 5G', 'mid_range'),
                ('V40 Pro', 'mid_range'), ('V40', 'mid_range'),
                ('V30', 'mid_range'), ('T3 Pro 5G', 'mid_range'),
                ('Y300 5G', 'budget')
            ],
            'MOTOROLA': [
                ('Edge 40 Pro', 'premium'), ('Edge 40', 'premium'),
                ('Razr 2022', 'premium'), ('G82', 'mid_range'),
                ('Moto G Power', 'mid_range'), ('G Stylus', 'mid_range'),
                ('One 5G Ace', 'mid_range'), ('Moto E32', 'budget')
            ],
            'Google': [
                ('Pixel 8 Pro', 'premium'), ('Pixel 8', 'premium'),
                ('Pixel 7a', 'mid_range'), ('Pixel 7', 'premium'),
                ('Pixel 6a', 'mid_range'), ('Pixel 6 Pro', 'premium'),
                ('Pixel Fold', 'premium')
            ],
            'Nothing': [
                ('Phone 1', 'premium'),
                ('Phone 2', 'premium')
            ]
        }

        # Process each brand and its models
        for brand_name, models in brands_and_models.items():
            try:
                # Get or create brand
                brand = Brand.objects.get_or_create(
                    name=brand_name,
                    defaults={'featured': brand_name in ['Xiaomi', 'Google']}
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

                    # Create product
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

        self.stdout.write(self.style.SUCCESS('Successfully created additional brands and products')) 