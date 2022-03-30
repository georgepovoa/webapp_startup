from unicodedata import name
from django.urls import path
from django.urls.conf import include
from.views import create_caderno, index, questao, submit_q_e,register_request,home_user_view,homepage, tela_profile_picker,logout_screen,post_react_create_caderno,imagem_cortada

urlpatterns = [
    path('',homepage, name="homepage"),
    path('lei/<int:id>',index),
    path('criarcadernoreact/<str:nome>',index),
    path('criarcadernoreactnome',index),
    path("upload_image",index),
    path('homequestao',questao,name = "questao"),
    path('q_e',submit_q_e,name="q_e "),
    path("accounts/",include('django.contrib.auth.urls')),
    path("register", register_request, name="register"),
    path("homeuser/<int:id_caderno>", home_user_view, name="homeuser"),
    path("profile-picker",tela_profile_picker,name = "profile_picker"),
    path("create-caderno",create_caderno,name = "create_caderno"),
    path("logout",logout_screen,name = "logout"),
    path("createcadernoreact",post_react_create_caderno,name="createcadernoreact"),
    path("imagem-cortada",imagem_cortada,name="imagem_cortada"),
    
    

    
]
 