from django.db.models import Q

from rest_framework.response import Response
from rest_framework import viewsets

from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer

    def list(self, request, *args, **kwargs):

        queryset = self.get_queryset()

        # Search
        search = request.query_params.get('search')

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search)
            )

        # Category
        category = request.query_params.get('category')

        if category and category != 'all':
            queryset = queryset.filter(
                category_id=category
            )

        # Minimum price
        min_price = request.query_params.get('min_price')

        if min_price:
            queryset = queryset.filter(
                price__gte=min_price
            )

        # Maximum price
        max_price = request.query_params.get('max_price')

        if max_price:
            queryset = queryset.filter(
                price__lte=max_price
            )

        # Sorting
        ordering = request.query_params.get('ordering')

        if ordering in [
            'price',
            '-price',
            'name',
            '-name'
        ]:
            queryset = queryset.order_by(ordering)

        serializer = self.get_serializer(
            queryset,
            many=True
        )

        return Response(serializer.data)

