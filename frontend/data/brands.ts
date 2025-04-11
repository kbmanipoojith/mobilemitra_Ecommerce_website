export const brands = {
  samsung: {
    name: 'Samsung',
    logo: '/images/brands/samsung.png',
    models: [
      {
        id: 'galaxy-s21',
        name: 'Galaxy S21',
        image: '/images/models/samsung-s21.jpg',
        parts: {
          battery: {
            name: 'Battery',
            image: '/images/parts/battery.jpg',
            price: 29.99,
            rating: 4.5,
            reviews: 128,
            inStock: true
          },
          screen: {
            name: 'Screen',
            image: '/images/parts/screen.jpg',
            price: 199.99,
            rating: 4.7,
            reviews: 95,
            inStock: true
          }
        }
      },
      {
        id: 'galaxy-s20',
        name: 'Galaxy S20',
        image: '/images/models/samsung-s20.jpg',
        parts: {
          battery: {
            name: 'Battery',
            image: '/images/parts/battery.jpg',
            price: 24.99,
            rating: 4.3,
            reviews: 156,
            inStock: true
          }
        }
      }
    ]
  },
  apple: {
    name: 'Apple',
    logo: '/images/brands/apple.png',
    models: [
      {
        id: 'iphone-13',
        name: 'iPhone 13',
        image: '/images/models/iphone-13.jpg',
        parts: {
          screen: {
            name: 'Screen',
            image: '/images/parts/screen.jpg',
            price: 149.99,
            rating: 4.8,
            reviews: 256,
            inStock: true
          }
        }
      }
    ]
  },
  oppo: {
    name: 'Oppo',
    logo: '/images/brands/oppo.png',
    models: [
      {
        id: 'find-x3',
        name: 'Find X3',
        image: '/images/models/oppo-x3.jpg',
        parts: {
          backCover: {
            name: 'Back Cover',
            image: '/images/parts/back-cover.jpg',
            price: 19.99,
            rating: 4.3,
            reviews: 89,
            inStock: false
          }
        }
      }
    ]
  },
  xiaomi: {
    name: 'Xiaomi',
    logo: '/images/brands/xiaomi.png',
    models: [
      {
        id: 'mi-11',
        name: 'Mi 11',
        image: '/images/models/xiaomi-mi11.jpg',
        parts: {
          camera: {
            name: 'Camera Module',
            image: '/images/parts/camera.jpg',
            price: 79.99,
            rating: 4.6,
            reviews: 167,
            inStock: true
          }
        }
      }
    ]
  }
}; 