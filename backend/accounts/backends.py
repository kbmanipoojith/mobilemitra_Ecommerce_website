from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ObjectDoesNotExist

User = get_user_model()

class EmailBackend(ModelBackend):
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
            return None

    def get_user(self, user_id):
        try:
            user = User.objects.get(pk=user_id)
            if self.user_can_authenticate(user):
                return user
            return None
        except User.DoesNotExist:
            return None