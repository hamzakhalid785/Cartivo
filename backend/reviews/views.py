from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView

from products.models import Product

from .models import Review
from .serializers import ReviewSerializer


class ProductReviewsView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, product_id):
        reviews = Review.objects.filter(
            product_id=product_id
        )

        serializer = ReviewSerializer(
            reviews,
            many=True
        )

        return Response(serializer.data)

    def post(self, request, product_id):
        if not request.user.is_authenticated:
            return Response(
                {'error': 'Login required to submit a review.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        product = get_object_or_404(
            Product,
            id=product_id
        )

        if Review.objects.filter(
            user=request.user,
            product=product
        ).exists():
            return Response(
                {'error': 'You have already reviewed this product.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ReviewSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                product=product
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
