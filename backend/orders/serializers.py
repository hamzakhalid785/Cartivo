from rest_framework import serializers

from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = [
            'id',
            'product',
            'product_name',
            'price',
            'quantity',
        ]
        read_only_fields = ['id', 'profuct_name', 'price',]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = [
            'id',
            'total_amount',
            'status',
            'shipping_address',
            'phone',
            'created_at',
            'items',
        ]
        read_only_fields = [
            'id',
            'total_amount',
            'status',
            'created_at',
            'items',
        ]