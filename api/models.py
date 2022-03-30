from django.db import models

from django.contrib.auth.models import AbstractUser

from django.conf import settings
import json

################################       USER   ####################################################
class User(AbstractUser):
    username = models.CharField(blank=True, null=True,max_length=20)
    email = models.EmailField(('email address'), unique=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return "{}".format(self.email)

class UserProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    photo = models.ImageField(upload_to='uploads', blank=True)

################################   USER   ####################################################



