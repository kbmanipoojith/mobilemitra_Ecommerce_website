# MobileMitra - Mobile Parts E-commerce Platform

MobileMitra is a full-stack e-commerce platform specializing in mobile phone parts and repair services. Built with Django REST Framework backend and Next.js frontend, it provides a seamless experience for both users and sellers.

## Features

### User Features
- **Authentication**
  - User registration and login
  - JWT-based authentication
  - Separate user and seller accounts
  - Profile management with editable fields

- **Shopping Experience**
  - Browse mobile parts by brands and models
  - Detailed product pages with specifications
  - Shopping cart functionality
  - Wishlist for saving items
  - Search functionality for products

- **Repair Guide**
  - Access to repair guides and tutorials
  - Step-by-step repair instructions

### Seller Features
- **Account Management**
  - Seller registration and login
  - Store profile management
  - Business information handling

- **Product Management**
  - Add and manage products
  - Update inventory
  - Set prices and descriptions

## Tech Stack

### Backend
- **Framework**: Django & Django REST Framework
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful API architecture

### Frontend
- **Framework**: Next.js 13+ with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Icons**: React Icons
- **HTTP Client**: Native Fetch API

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Unix/MacOS:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Set up MySQL database:
   ```sql
   CREATE DATABASE mobilemitra CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
**Note:** If you face any issues during setup, please **import the database manually** using the `mobilemitra.sql` file located in the `backend` folder.

6. Apply migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```

8. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register/user/` - Register new user
- `POST /api/auth/register/seller/` - Register new seller
- `POST /api/auth/login/` - User/Seller login
- `POST /api/auth/token/refresh/` - Refresh JWT token
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/profile/` - Update user profile

### Products
- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get product details
- `POST /api/products/` - Add new product (Seller only)
- `PUT /api/products/{id}/` - Update product (Seller only)
- `DELETE /api/products/{id}/` - Delete product (Seller only)

### Cart & Wishlist
- `GET /api/cart/` - Get cart items
- `POST /api/cart/` - Add item to cart
- `PUT /api/cart/{id}/` - Update cart item
- `DELETE /api/cart/{id}/` - Remove from cart
- `GET /api/wishlist/` - Get wishlist items
- `POST /api/wishlist/` - Add to wishlist
- `DELETE /api/wishlist/{id}/` - Remove from wishlist

## Environment Variables

### Backend (.env)
```
DEBUG=True
SECRET_KEY=your_secret_key
DB_NAME=mobilemitra
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- Django REST Framework
- Next.js
- Tailwind CSS
- React Icons 

# Screenshots
![1](https://github.com/user-attachments/assets/82704207-6274-468c-82e8-04ee8e536619)
![2](https://github.com/user-attachments/assets/3102aefb-7e9b-4ce1-974d-49b21784bb5a)
![3](https://github.com/user-attachments/assets/7c50efde-e24d-425a-8403-018dd4ba4243)
![4](https://github.com/user-attachments/assets/fadcbab5-4bf5-4fda-8b14-593d5cf99e7b)
![5](https://github.com/user-attachments/assets/c54b9317-767a-4b1b-a8b3-52681da1ddf2)
![6](https://github.com/user-attachments/assets/a4239e5a-cb15-41ab-908b-e3b5e75d77a0)
![7](https://github.com/user-attachments/assets/1578560a-160e-4229-a3be-a7edf3591c3a)
![8](https://github.com/user-attachments/assets/af5ec31b-e4b5-4d18-a708-7772811f99bc)
![9](https://github.com/user-attachments/assets/65e54c49-8523-4286-9f7b-afae765127c4)
![10](https://github.com/user-attachments/assets/09512144-a2ad-47c8-b9ed-1e0fbfcb2a6f)
![11](https://github.com/user-attachments/assets/1b7658c7-a0f5-4994-b27a-04064036becd)
![12](https://github.com/user-attachments/assets/55f63054-fea9-499f-9bcb-4a2b8c5276f2)
![13](https://github.com/user-attachments/assets/74592336-47c1-4e92-9d50-40ca83120c8f)
![14](https://github.com/user-attachments/assets/d7325aa6-0899-40f0-8b2e-43793fc52085)
![15](https://github.com/user-attachments/assets/56225884-d78d-463d-b5b7-192df0356dfa)
![16](https://github.com/user-attachments/assets/d838ce83-d658-4250-a677-ad6904db66cd)
![17](https://github.com/user-attachments/assets/7ca3fb88-2f70-413a-82a8-136dda448566)




















