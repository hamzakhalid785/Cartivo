"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from orders.views import (CreateOrderView, MyOrdersView, OrderDetailView)
from users.views import (RegisterView, ProfileView)
from cart.views import (CartView, AddToCartView, RemoveFromCartView,)
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from cart.views import (
    CartView, AddToCartView, UpdateCartItemView, RemoveFromCartView,
)
from wishlist.views import (
    WishlistView, AddToWishlistView, RemoveFromWishlistView,
)

from categories.views import  CategoryViewSet
from products.views import ProductViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from reviews.views import ProductReviewsView

router = DefaultRouter()

router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/cart/', CartView.as_view()),
    path('api/cart/add/', AddToCartView.as_view()),
    path('api/cart/remove/<int:item_id>/', RemoveFromCartView.as_view()),
    path('api/cart/update/<int:item_id>/', UpdateCartItemView.as_view()),
    
    path('api/orders/create/', CreateOrderView.as_view()),
    path('api/orders/', MyOrdersView.as_view()),
    path('api/orders/<int:pk>/', OrderDetailView.as_view()),
    path('api/wishlist/', WishlistView.as_view()),
    path('api/wishlist/add/', AddToWishlistView.as_view()),
    path('api/wishlist/remove/<int:product_id>/', RemoveFromWishlistView.as_view()),
    path('api/products/<int:product_id>/reviews/', ProductReviewsView.as_view()),
    
    path('api/auth/register/', RegisterView.as_view()),
    path('api/auth/profile/', ProfileView.as_view()),
    path('api/', include(router.urls)),
    
    path('api/auth/token/', TokenObtainPairView.as_view()),
    path('api/auth/token/refresh/', TokenRefreshView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        
        document_root=settings.MEDIA_ROOT
        )
