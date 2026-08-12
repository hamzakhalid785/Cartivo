from rest_framework import serializers

from products.serializers import ProductSerializer
from .models import Wishlist


class WishlistSerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Wishlist
        fields = ['id', 'products', 'created_at']