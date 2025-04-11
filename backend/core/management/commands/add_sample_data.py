from django.core.management.base import BaseCommand
from core.models import Brand, Model, ProductCategory, Product

class Command(BaseCommand):
    help = 'Add sample brands and products'

    def handle(self, *args, **kwargs):
        # Create all brands
        brands_data = [
            'SAMSUNG', 'vivo', 'Xiaomi', 'Apple', 'realme', 'OPPO',
            'MOTOROLA', 'ONEPLUS', 'NOKIA', 'LG', 'HUAWEI', 'Infinix',
            'Micromax', 'Lenovo', 'TECNO Mobile', 'HTC', 'LAVA', 'INTEX',
            'Karbonn', 'ZTE', 'ASUS', 'HONOR', 'Alcatel', 'BLU Smartphones',
            'SPICE', 'Swing Telecom', 'SONY', 'Celkon', 'Swipe', 'Google',
            'iBall', 'itel', 'Videocon', 'Panasonic', 'GIONEE', 'Microsoft',
            'Acer', 'Cubot', 'WIKO', 'Blackview', 'uleFone', 'MEIZU',
            'DOOGEE', 'ZEN', 'XOLO', 'BlackBerry', 'Allview', 'IKALL',
            'Coolpad', 'MAXX', 'UMIDIGI', 'SIEMENS', 'ZOPO', 'rage',
            'SANSUI', 'Nothing', 'fly', 'OUKITEL', 'HiTECH', 'TCL'
        ]

        # Delete existing brands first
        Brand.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Deleted existing brands'))

        # Create brands
        created_brands = []
        for brand_name in brands_data:
            brand = Brand.objects.create(
                name=brand_name,
                featured=brand_name.upper() in ['SAMSUNG', 'APPLE', 'ONEPLUS', 'XIAOMI', 'GOOGLE']
            )
            created_brands.append(brand)
            self.stdout.write(self.style.SUCCESS(f'Created brand: {brand_name}'))

        # Create product categories
        smartphones = ProductCategory.objects.get_or_create(
            name='Smartphones'
        )[0]
        tablets = ProductCategory.objects.get_or_create(
            name='Tablets'
        )[0]
        accessories = ProductCategory.objects.get_or_create(
            name='Accessories'
        )[0]

        self.stdout.write(self.style.SUCCESS('Created categories successfully'))

        # Create sample models and products for featured brands
        sample_products = [
            {
                'brand': 'SAMSUNG',
                'models': [
                    {
                        'name': 'Galaxy S23',
                        'products': [
                            {
                                'name': 'Samsung Galaxy S23 Ultra 5G',
                                'description': 'Latest flagship from Samsung with 200MP camera',
                                'price': 1199.99,
                                'stock': 50,
                                'category': smartphones
                            }
                        ]
                    },
                    {
                        'name': 'Galaxy S24',
                        'products': [
                            {
                                'name': 'Samsung Galaxy S24 Ultra 5G',
                                'description': 'Latest flagship from Samsung with AI features',
                                'price': 1399.99,
                                'stock': 30,
                                'category': smartphones
                            }
                        ]
                    }
                ]
            },
            {
                'brand': 'Apple',
                'models': [
                    {
                        'name': 'iPhone 15',
                        'products': [
                            {
                                'name': 'Apple iPhone 15 Pro Max',
                                'description': 'Latest iPhone with A17 Pro chip',
                                'price': 1299.99,
                                'stock': 30,
                                'category': smartphones
                            }
                        ]
                    },
                    {
                        'name': 'iPad Pro',
                        'products': [
                            {
                                'name': 'iPad Pro 12.9-inch',
                                'description': 'Latest iPad Pro with M2 chip',
                                'price': 1099.99,
                                'stock': 25,
                                'category': tablets
                            }
                        ]
                    }
                ]
            },
            {
                'brand': 'ONEPLUS',
                'models': [
                    {
                        'name': '12',
                        'products': [
                            {
                                'name': 'OnePlus 12 5G',
                                'description': 'Latest flagship from OnePlus with Snapdragon 8 Gen 3',
                                'price': 899.99,
                                'stock': 40,
                                'category': smartphones
                            }
                        ]
                    }
                ]
            },
            {
                'brand': 'XIAOMI',
                'models': [
                    {
                        'name': '14',
                        'products': [
                            {
                                'name': 'Xiaomi 14 Pro',
                                'description': 'Latest flagship from Xiaomi with Leica optics',
                                'price': 999.99,
                                'stock': 35,
                                'category': smartphones
                            }
                        ]
                    }
                ]
            },
            {
                'brand': 'GOOGLE',
                'models': [
                    {
                        'name': 'Pixel 8',
                        'products': [
                            {
                                'name': 'Google Pixel 8 Pro',
                                'description': 'Latest Google flagship with advanced AI features',
                                'price': 999.99,
                                'stock': 30,
                                'category': smartphones
                            }
                        ]
                    }
                ]
            }
        ]

        # Create models and products
        for product_data in sample_products:
            try:
                brand = Brand.objects.get(name=product_data['brand'])
                for model_data in product_data['models']:
                    model = Model.objects.create(
                        brand=brand,
                        name=model_data['name']
                    )
                    for product in model_data['products']:
                        Product.objects.create(
                            model=model,
                            category=product['category'],
                            name=product['name'],
                            description=product['description'],
                            price=product['price'],
                            stock=product['stock']
                        )
                        self.stdout.write(self.style.SUCCESS(f'Created product: {product["name"]}'))
            except Brand.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Brand {product_data["brand"]} not found'))

        self.stdout.write(self.style.SUCCESS('Created all brands, models and products successfully')) 