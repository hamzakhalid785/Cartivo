from decimal import Decimal

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.models import Cart
from .models import Order, OrderItem
from .serializers import OrderSerializer


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        shipping_address = request.data.get('shipping_address')
        phone = request.data.get('phone')

        if not shipping_address or not phone:
            return Response(
                {
                    'error': 'Shipping address and phone are required.'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            cart = Cart.objects.get(user=request.user)
        except Cart.DoesNotExist:
            return Response(
                {'error': 'Cart is empty.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_items = cart.items.select_related('product')

        if not cart_items.exists():
            return Response(
                {'error': 'Cart is empty.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        total = Decimal('0.00')

        for item in cart_items:
            if item.quantity > item.product.stock:
                return Response(
                    {
                        'error': (
                            f'Not enough stock for '
                            f'{item.product.name}.'
                        )
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )

            final_price = (
                item.product.price -
                (
                    item.product.price *
                    item.product.discount / 100
                )
            )

            total += final_price * item.quantity

        order = Order.objects.create(
            user=request.user,
            total_amount=total,
            shipping_address=shipping_address,
            phone=phone,
        )

        for item in cart_items:
            final_price = (
                item.product.price -
                (
                    item.product.price *
                    item.product.discount / 100
                )
            )

            OrderItem.objects.create(
                order=order,
                product=item.product,
                product_name=item.product.name,
                price=final_price,
                quantity=item.quantity,
            )

            item.product.stock -= item.quantity
            item.product.save()

        cart_items.delete()

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )


class MyOrdersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("USER:", request.user)
        print("AUTH:", request.auth)

        orders = Order.objects.filter(
            user=request.user
        ).order_by('-created_at')

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(serializer.data)


class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            order = Order.objects.get(
                id=pk,
                user=request.user
            )
        except Order.DoesNotExist:
            return Response(
                {'error': 'Order not found.'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = OrderSerializer(order)

        return Response(serializer.data)