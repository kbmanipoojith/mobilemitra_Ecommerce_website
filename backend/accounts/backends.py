from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
<<<<<<< HEAD
from django.core.exceptions import ObjectDoesNotExist
=======
from django.db.models import Q
>>>>>>> origin/master

User = get_user_model()

class EmailBackend(ModelBackend):
<<<<<<< HEAD
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            email = username or kwargs.get('email')
            if not email or not password:
                return None

            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return None

            if user.check_password(password) and self.user_can_authenticate(user):
                # If is_seller is passed, check if user has seller attribute
                if kwargs.get('is_seller', False):
                    if not hasattr(user, 'seller'):
                        return None
                return user

        except Exception as e:
            # Optionally log the error here
=======
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
>>>>>>> origin/master
            return None

    def get_user(self, user_id):
        try:
<<<<<<< HEAD
            user = User.objects.get(pk=user_id)
            if self.user_can_authenticate(user):
                return user
            return None
=======
            return User.objects.get(pk=user_id)
>>>>>>> origin/master
        except User.DoesNotExist:
            return None