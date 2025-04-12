// Define types for price ranges and multipliers
type PriceRange = {
    min: number;
    max: number;
};

type BrandPriceRanges = {
    [key: string]: PriceRange;
};

type CategoryMultipliers = {
    [key: string]: PriceRange;
};

// Price ranges for different brands (in ₹)
const brandPriceRanges: BrandPriceRanges = {
    samsung: { min: 1500, max: 4500 },
    apple: { min: 2000, max: 5000 },
    oneplus: { min: 1200, max: 4000 },
    xiaomi: { min: 800, max: 3000 },
    google: { min: 1500, max: 4500 },
    default: { min: 1000, max: 3500 }
};

// Multipliers for different repair categories
const categoryMultipliers: CategoryMultipliers = {
    battery: { min: 1.0, max: 1.5 },      // Base price
    screen: { min: 2.5, max: 3.5 },       // Most expensive
    charging_port: { min: 0.6, max: 0.8 }, // Less expensive
    camera: { min: 1.8, max: 2.5 },       // Moderately expensive
    button: { min: 0.4, max: 0.6 },       // Least expensive
    speaker: { min: 0.7, max: 0.9 }       // Less expensive
};

export function generatePrice(brand: string, category: string): number {
    // Get brand price range, use default if brand not found
    const brandRange = brandPriceRanges[brand.toLowerCase()] || brandPriceRanges.default;
    const categoryMultiplier = categoryMultipliers[category.toLowerCase()];

    if (!categoryMultiplier) {
        return Math.round(brandRange.min / 10) * 10; // Return minimum price if category not found
    }

    // Generate base price within brand range
    const basePrice = Math.random() * (brandRange.max - brandRange.min) + brandRange.min;
    
    // Apply category multiplier
    const multiplier = Math.random() * (categoryMultiplier.max - categoryMultiplier.min) + categoryMultiplier.min;
    const finalPrice = basePrice * multiplier;

    // Round to nearest 10
    return Math.round(finalPrice / 10) * 10;
}

// Example usage:
// const price = generatePrice('samsung', 'screen'); // Returns a price between ₹3750-₹15750
// const price = generatePrice('apple', 'battery');  // Returns a price between ₹2000-₹7500
// const price = generatePrice('xiaomi', 'button'); // Returns a price between ₹320-₹1800 