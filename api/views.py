from inspect import isgenerator
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.fields import HiddenField
from .serializers import  UserSerializer
from .models import User
from rest_framework.response import Response
from rest_framework import viewsets
# Create your views here.


################################# USERS #########################

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    
class CurrentUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    
    
    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """
        user = self.request.user
        print(user)
        return User.objects.filter(email=user)
    
    

    
    
################################# USERS #########################



################################# QUESTAO #######################
def get_name(request):
    if request.method == 'POST':
        print(request)

################################# QUESTAO #######################