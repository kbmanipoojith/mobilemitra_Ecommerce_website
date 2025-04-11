from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

User = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, email=None, password=None, **kwargs):
        try:
            # Use email if provided, otherwise use username as email
            email_to_check = email or username
            if not email_to_check or not password:
                return None

            user = User.objects.get(email=email_to_check)
            if not user.check_password(password):
                return None

            # Check seller status if is_seller flag is provided
            is_seller = kwargs.get('is_seller', False)
            if is_seller:
                # If is_seller is True, verify the user has a seller profile
                try:
                    user.seller
                except:
                    return None
            
            return user
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None