from django.core.management.base import BaseCommand
from products.models import Product
from categories.models import Category


class Command(BaseCommand):
    help = 'Create sample categories and products'

    def handle(self, *args, **kwargs):

        # Categories
        categories_data = [
            {
                'name': 'Electronics',
                'description': 'Smartphones, laptops and electronic accessories.'
            },
            {
                'name': 'Fashion',
                'description': 'Clothing, shoes and fashion accessories.'
            },
            {
                'name': 'Home & Living',
                'description': 'Useful products for your home and daily life.'
            },
            {
                'name': 'Gaming',
                'description': 'Gaming accessories and equipment.'
            },
            {
                'name': 'Accessories',
                'description': 'Everyday accessories and useful gadgets.'
            },
        ]

        categories = {}

        for data in categories_data:
            category, created = Category.objects.get_or_create(
                name=data['name'],
                defaults={
                    'description': data['description']
                }
            )
            categories[data['name']] = category
            
            Product.objects.all().delete()

        # Products
        products = [
            {
                'name': 'Wireless Bluetooth Headphones',
                'description': 'Comfortable wireless headphones with clear sound and long battery life.',
                'price': 4999,
                'discount': 10,
                'stock': 25,
                'category': 'Electronics',
            },
            {
                'name': 'Smart Watch Series 5',
                'description': 'Modern smartwatch with fitness tracking, notifications and stylish design.',
                'price': 7499,
                'discount': 15,
                'stock': 18,
                'category': 'Electronics',
            },
            {
                'name': 'Wireless Gaming Mouse',
                'description': 'Responsive wireless gaming mouse with adjustable DPI and ergonomic design.',
                'price': 3299,
                'discount': 5,
                'stock': 30,
                'category': 'Gaming',
            },
            {
                'name': 'Mechanical Gaming Keyboard',
                'description': 'RGB mechanical keyboard designed for gaming and comfortable typing.',
                'price': 5999,
                'discount': 12,
                'stock': 20,
                'category': 'Gaming',
            },
            {
                'name': 'Premium Cotton T-Shirt',
                'description': 'Soft premium cotton t-shirt with a comfortable regular fit.',
                'price': 1999,
                'discount': 10,
                'stock': 40,
                'category': 'Fashion',
            },
            {
                'name': 'Classic Casual Sneakers',
                'description': 'Comfortable everyday sneakers suitable for casual outfits and daily use.',
                'price': 5499,
                'discount': 8,
                'stock': 22,
                'category': 'Fashion',
            },
            {
                'name': 'Minimal Desk Lamp',
                'description': 'Elegant LED desk lamp perfect for study, work and reading.',
                'price': 2499,
                'discount': 5,
                'stock': 35,
                'category': 'Home & Living',
            },
            {
                'name': 'Ergonomic Office Chair',
                'description': 'Comfortable ergonomic chair with supportive backrest for long working hours.',
                'price': 18999,
                'discount': 10,
                'stock': 12,
                'category': 'Home & Living',
            },
            {
                'name': 'Laptop Backpack',
                'description': 'Durable laptop backpack with multiple compartments for work and university.',
                'price': 3999,
                'discount': 15,
                'stock': 28,
                'category': 'Accessories',
            },
            {
                'name': 'USB-C Fast Charging Cable',
                'description': 'Durable USB-C cable suitable for fast charging and data transfer.',
                'price': 1299,
                'discount': 5,
                'stock': 50,
                'category': 'Accessories',
            },
        ]

        created_count = 0

        for data in products:
            Product.objects.get_or_create(
                name=data['name'],
                defaults={
                    'description': data['description'],
                    'price': data['price'],
                    'discount': data['discount'],
                    'stock': data['stock'],
                    'category': categories[data['category']],
                }
            )
            created_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully added {created_count} sample products.'
            )
        )