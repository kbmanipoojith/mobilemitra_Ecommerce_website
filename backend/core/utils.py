import random

def generate_price(brand: str, category: str) -> float:
    # Price ranges for different brands (in ₹)
    brand_price_ranges = {
        'samsung': {'min': 1500, 'max': 4500},
        'apple': {'min': 2000, 'max': 5000},
        'oneplus': {'min': 1200, 'max': 4000},
        'xiaomi': {'min': 800, 'max': 3000},
        'google': {'min': 1500, 'max': 4500},
        'realme': {'min': 1000, 'max': 3500},
        'motorola': {'min': 1200, 'max': 4000},
        'vivo': {'min': 800, 'max': 3000},
        'oppo': {'min': 800, 'max': 3000},
        'default': {'min': 1000, 'max': 3500}
    }

    # Multipliers for different repair categories
    category_multipliers = {
        'battery': {'min': 1.0, 'max': 1.5},      # Base price
        'screen': {'min': 2.5, 'max': 3.5},       # Most expensive
        'charging_port': {'min': 0.6, 'max': 0.8}, # Less expensive
        'camera': {'min': 1.8, 'max': 2.5},       # Moderately expensive
        'button': {'min': 0.4, 'max': 0.6},       # Least expensive
        'speaker': {'min': 0.7, 'max': 0.9}       # Less expensive
    }

    # Get brand price range, use default if brand not found
    brand_range = brand_price_ranges.get(brand.lower(), brand_price_ranges['default'])
    category_multiplier = category_multipliers.get(category.lower())

    if not category_multiplier:
        return round(brand_range['min'] / 10) * 10

    # Generate base price within brand range
    base_price = random.uniform(brand_range['min'], brand_range['max'])
    
    # Apply category multiplier
    multiplier = random.uniform(category_multiplier['min'], category_multiplier['max'])
    final_price = base_price * multiplier

    # Round to nearest 10
    return round(final_price / 10) * 10 