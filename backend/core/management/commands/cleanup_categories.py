from django.core.management.base import BaseCommand
from core.models import ProductCategory, Product
from django.db.models import Count

class Command(BaseCommand):
    help = 'Cleans up duplicate categories and normalizes category names'

    def handle(self, *args, **kwargs):
        self.stdout.write('Cleaning up categories...')

        # Define the correct category names
        correct_categories = {
            'Battery Replacement Parts': ['Battery', 'Batteries', 'Battery Replacement Parts'],
            'Screen & Display Assemblies': ['Screen', 'Screens', 'Screens & Displays', 'Display'],
            'Charging Port & Cable Modules': ['Charging Port', 'Charging Ports', 'Charging'],
            'Camera & Lens Assemblies': ['Camera', 'Cameras', 'Cameras & Lens'],
            'Power & Volume Button Modules': ['Button', 'Buttons', 'Power & Volume Buttons'],
            'Speaker & Audio Components': ['Speaker', 'Speakers', 'Speakers & Audio', 'Audio']
        }

        # For each correct category
        for main_category, variations in correct_categories.items():
            # Get or create the main category
            main_cat, _ = ProductCategory.objects.get_or_create(name=main_category)
            
            # Find all variations of this category
            variation_categories = ProductCategory.objects.filter(name__in=variations)
            
            # Update all products from variations to use the main category
            for var_cat in variation_categories:
                if var_cat.id != main_cat.id:  # Skip if it's the main category
                    self.stdout.write(f'Moving products from "{var_cat.name}" to "{main_category}"')
                    # Update products to use the main category
                    Product.objects.filter(category=var_cat).update(category=main_cat)
                    # Delete the variation category
                    var_cat.delete()

        # Delete any remaining unused categories
        unused_categories = ProductCategory.objects.annotate(
            product_count=Count('products')
        ).filter(product_count=0)
        
        for cat in unused_categories:
            self.stdout.write(f'Deleting unused category: {cat.name}')
            cat.delete()

        self.stdout.write(self.style.SUCCESS('Successfully cleaned up categories')) 