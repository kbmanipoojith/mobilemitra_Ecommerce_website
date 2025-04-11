from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

UserModel = get_user_model()

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, is_seller=False, **kwargs):
        try:
            # Try to fetch the user by email
            users = UserModel.objects.filter(email=email)
            
            # If we're trying to authenticate a seller
            if is_seller:
                for user in users:
                    if hasattr(user, 'seller') and user.check_password(password):
                        return user
                return None  # Return None if no seller found
            else:
                # For regular users, return the first user that matches and is not a seller
                for user in users:
                    if not hasattr(user, 'seller') and user.check_password(password):
                        return user
                return None  # Return None if no regular user found
        except UserModel.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None 