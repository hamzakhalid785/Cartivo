from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product

from .models import Wishlist
from .serializers import WishlistSerializer


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist, created = Wishlist.objects.get_or_create(
            user=request.user
        )

        return Response(
            WishlistSerializer(wishlist).data
        )


class AddToWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')

        product = get_object_or_404(
            Product,
            id=product_id
        )

        wishlist, created = Wishlist.objects.get_or_create(
            user=request.user
        )

        wishlist.products.add(product)

        return Response(
            WishlistSerializer(wishlist).data,
            status=status.HTTP_201_CREATED
        )


class RemoveFromWishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, product_id):
        wishlist = get_object_or_404(
            Wishlist,
            user=request.user
        )

        product = get_object_or_404(
            Product,
            id=product_id
        )

        wishlist.products.remove(product)

        return Response({
            'message': 'Product removed from wishlist.'
        })
