from django.core.management.base import BaseCommand
from django.core.files import File
from core.models import Brand, Model, ProductCategory, Product
import os

class Command(BaseCommand):
    help = 'Populates the database with dummy product data'

    def handle(self, *args, **kwargs):
        # Create product categories
        categories = {
            'Batteries': {
                'image_dir': 'batteries',
                'price_range': (250, 800),
                'description': 'High-quality replacement battery for your device. Compatible with original specifications.'
            },
            'Screens': {
                'image_dir': 'Screens &Displays',
                'price_range': (800, 2000),
                'description': 'Original quality replacement screen with touch functionality. Includes digitizer and LCD.'
            },
            'Charging Ports': {
                'image_dir': 'Charging Ports & cables',
                'price_range': (300, 600),
                'description': 'Genuine replacement charging port with fast charging support.'
            },
            'Speakers': {
                'image_dir': 'Speakers & Audio Parts',
                'price_range': (400, 700),
                'description': 'High-fidelity replacement speaker with noise cancellation.'
            },
            'Cameras': {
                'image_dir': 'Cameras & Lens',
                'price_range': (500, 1500),
                'description': 'Original quality replacement camera module with autofocus.'
            },
            'Buttons': {
                'image_dir': 'Power & Volume Buttons',
                'price_range': (200, 400),
                'description': 'Durable replacement buttons with tactile feedback.'
            }
        }

        # Create brands
        brands = {
            'Samsung': ['Galaxy S21', 'Galaxy S22', 'Galaxy A52', 'Galaxy M31'],
            'Apple': ['iPhone 12', 'iPhone 13', 'iPhone 14', 'iPhone SE'],
            'OnePlus': ['OnePlus 9', 'OnePlus 10', 'OnePlus Nord'],
            'Xiaomi': ['Redmi Note 10', 'POCO X3', 'Mi 11 Lite'],
            'Realme': ['Realme 8', 'Realme 9', 'Realme GT']
        }

        # Create brands and models
        for brand_name, models in brands.items():
            brand, _ = Brand.objects.get_or_create(name=brand_name)
            for model_name in models:
                Model.objects.get_or_create(brand=brand, name=model_name)

        # Create product categories
        for category_name, details in categories.items():
            category, _ = ProductCategory.objects.get_or_create(name=category_name)
            
            # Get all models
            models = Model.objects.all()
            
            # Create products for each model
            for model in models:
                # Create 2 products per model per category
                for i in range(1, 3):
                    # Get image path
                    image_dir = details['image_dir']
                    image_name = f"{image_dir}{i}.jpeg"
                    if not os.path.exists(f"frontend/public/assets/{image_dir}/{image_name}"):
                        image_name = f"{image_dir}{i}.png"
                    
                    image_path = f"frontend/public/assets/{image_dir}/{image_name}"
                    
                    if os.path.exists(image_path):
                        # Calculate price based on model brand and category
                        base_price = details['price_range'][0]
                        if model.brand.name in ['Apple', 'Samsung']:
                            base_price += 200
                        if 'Screen' in category_name:
                            base_price += 400
                        
                        # Create product
                        product = Product.objects.create(
                            model=model,
                            category=category,
                            name=f"{model.brand.name} {model.name} {category_name} {i}",
                            description=details['description'],
                            price=base_price,
                            stock=10
                        )
                        
                        # Add image
                        with open(image_path, 'rb') as f:
                            product.image.save(image_name, File(f), save=True)
                        
                        self.stdout.write(
                            self.style.SUCCESS(f'Created product: {product.name}')
                        )

        self.stdout.write(self.style.SUCCESS('Successfully populated products')) 