from django.core.management.base import BaseCommand
from core.models import User, Seller, Brand, Model, Product, ProductCategory
from django.db import transaction
from django.db.utils import IntegrityError
from core.utils import generate_price

class Command(BaseCommand):
    help = 'Add detailed spare parts catalog with multiple brand compatibility'

    def handle(self, *args, **kwargs):
        # Ensure sellers exist
        sellers = {}
        seller_data = [
            ('mobilehub@example.com', 'Mobile Hub', '9876543210', '123 Tech Street, Electronics Market'),
            ('gadgetzone@example.com', 'Gadget Zone', '9876543211', '456 Digital Avenue, Phone Market'),
            ('phonecare@example.com', 'Phone Care', '9876543212', '789 Mobile Road, Repair Center')
        ]
        
        for email, business_name, phone, address in seller_data:
            try:
                with transaction.atomic():
                    user = User.objects.get_or_create(
                        email=email,
                        defaults={
                            'name': f"{business_name} Admin",
                            'password': 'password123'
                        }
                    )[0]
                    seller = Seller.objects.get_or_create(
                        user=user,
                        defaults={
                            'business_name': business_name,
                            'phone': phone,
                            'address': address
                        }
                    )[0]
                    sellers[business_name.lower().replace(' ', '_')] = seller
            except IntegrityError:
                self.stdout.write(self.style.WARNING(f"Seller already exists: {business_name}"))

        # Ensure brands exist
        brands = {}
        brand_names = ['Samsung', 'Apple', 'OnePlus', 'Xiaomi', 'Google', 'Realme', 'Motorola', 'Vivo', 'OPPO']
        for brand_name in brand_names:
            brand, _ = Brand.objects.get_or_create(
                name=brand_name,
                defaults={'featured': brand_name in ['Samsung', 'Apple', 'OnePlus']}
            )
            brands[brand_name.lower()] = brand

        # Create or update categories
        categories = {}
        category_data = {
            'battery': 'Battery Replacement Parts',
            'screen': 'Screen & Display Assemblies',
            'charging_port': 'Charging Port & Cable Modules',
            'camera': 'Camera & Lens Assemblies',
            'speaker': 'Speaker & Audio Components',
            'button': 'Power & Volume Button Modules'
        }
        
        for key, name in category_data.items():
            category, _ = ProductCategory.objects.get_or_create(name=name)
            categories[key] = category

        # Define model compatibility for each brand
        model_compatibility = {
            'samsung': ['Galaxy S23', 'Galaxy S24', 'Galaxy A55', 'Galaxy M13', 'Galaxy Z Fold 6'],
            'apple': ['iPhone 15', 'iPhone 14', 'iPhone 13', 'iPhone SE (3rd Gen)'],
            'oneplus': ['OnePlus 11', 'OnePlus 12', 'OnePlus Nord 3', 'OnePlus 10T'],
            'xiaomi': ['Redmi Note 13', 'POCO X5', 'Mi 14', 'Xiaomi 13'],
            'google': ['Pixel 8', 'Pixel 7', 'Pixel 6a'],
            'realme': ['GT Master', 'Narzo 50', 'Realme 11'],
            'motorola': ['Edge 40', 'G Stylus', 'Razr 2022'],
            'vivo': ['V50', 'X200', 'Y300'],
            'oppo': ['Find X6', 'Reno 10', 'A57']
        }

        # Create models for each brand
        models = {}
        for brand_name, model_names in model_compatibility.items():
            brand = brands[brand_name]
            for model_name in model_names:
                model, _ = Model.objects.get_or_create(
                    brand=brand,
                    name=model_name
                )
                models[f"{brand_name}_{model_name.lower().replace(' ', '_')}"] = model

        # Product templates with descriptions
        product_templates = {
            'battery': {
                'name_template': "{} Battery Replacement",
                'description': "High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.",
                'image': 'products/batteries/battery{}.jpeg'
            },
            'screen': {
                'name_template': "{} Display Assembly",
                'description': "Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.",
                'image': 'products/screens/screen{}.jpeg'
            },
            'charging_port': {
                'name_template': "{} Charging Port",
                'description': "Original quality charging port with flex cable. Supports fast charging and data transfer.",
                'image': 'products/charging/charging{}.jpeg'
            },
            'camera': {
                'name_template': "{} Camera Module",
                'description': "OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.",
                'image': 'products/cameras/camera{}.jpeg'
            },
            'speaker': {
                'name_template': "{} Speaker Unit",
                'description': "Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.",
                'image': 'products/speakers/speaker{}.jpeg'
            },
            'button': {
                'name_template': "{} Button Flex Set",
                'description': "Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.",
                'image': 'products/buttons/button{}.jpeg'
            }
        }

        # Create products for each model and category
        for brand_name, model_list in model_compatibility.items():
            for model_name in model_list:
                model_key = f"{brand_name}_{model_name.lower().replace(' ', '_')}"
                model = models.get(model_key)
                
                if not model:
                    continue

                for category_key, template in product_templates.items():
                    category = categories[category_key]
                    seller = sellers[list(sellers.keys())[hash(model_name) % len(sellers)]]
                    
                    product_name = template['name_template'].format(model_name)
                    image_index = hash(f"{brand_name}_{model_name}_{category_key}") % 6 + 1
                    
                    try:
                        with transaction.atomic():
                            price = generate_price(brand_name, category_key)
                            Product.objects.get_or_create(
                                name=product_name,
                                defaults={
                                    'description': template['description'],
                                    'price': price,
                                    'stock': hash(product_name) % 20 + 5,  # Random stock between 5 and 24
                                    'image': template['image'].format(image_index),
                                    'model': model,
                                    'category': category,
                                    'seller': seller
                                }
                            )
                    except IntegrityError as e:
                        self.stdout.write(self.style.WARNING(f"Product already exists: {product_name}"))
                        continue

        self.stdout.write(self.style.SUCCESS('Successfully added detailed spare parts catalog')) 