
from django import forms, http
from django.db.models import fields
from django.http import response
from django.http.request import HttpHeaders
from django.http.response import HttpResponse
from django.shortcuts import  render, redirect
from matplotlib import image
from .forms import NewUserForm
from django.contrib.auth import login, authenticate,logout
from django.contrib import messages
from api.models import User, UserProfile
import json
import difflib
import requests
from pymongo import MongoClient
import base64
from django.core.files.base import ContentFile
from PIL import Image
from io import BytesIO
from rest_framework.response import Response
from rest_framework.decorators import api_view


from django.core.files.base import ContentFile

client = MongoClient('mongodb+srv://georgepovoa12:asdasd12@cluster0.y0ias.mongodb.net/cluster0?retryWrites=true&w=majority')
db = client['CF88']
col = db["Lei"]


api_url = "https://api-startup-luka-xuxu.herokuapp.com"

# em docker http://startup_api_1:3000

# em localhost http://localhost:3000


jsonDec = json.decoder.JSONDecoder()


class PostResposta(forms.Form):
    CHOICES = [('Certo', 'Certo'),
               ('Errado', 'Errado')]

    resposta_user = forms.ChoiceField(
        choices=CHOICES, widget=forms.RadioSelect,label="")







def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def homepage(request):
    if request.method == "POST":
        email = request.POST["email-user"]
        if User.objects.filter(email=email).exists():
            return redirect("accounts/login")
        else:
            return redirect("register")
    
    if request.user.is_authenticated:
        return redirect(tela_profile_picker)

    return render(request,template_name="frontend/homepage.html")




def tela_profile_picker(request):
    if request.method == "POST":
        caderno_selecionado = request.POST["caderno_selecionado"]
        print(caderno_selecionado)
        requests.put(api_url + "/cad/definir_atual?user={}&caderno_id={}".format(request.user,caderno_selecionado))

        return redirect("homeuser/{}".format(caderno_selecionado))
    
    user = request.user
    if user.is_authenticated:
        response = requests.get(api_url+"/cadernos/{}".format(user)).json()
        if response != None:
            print("if profile-picker")
            print(response)
            #(https://api-startup-luka-xuxu.herokuapp.com/cadernos?user=george_povoa%40hotmail.com)
            contador = len(response["cadernos"])+2
            return render(request,template_name="frontend/profile_picker.html",context = {"cadernos":response["cadernos"],"contador":contador})
        else:
            #criar caderno
            requests.post(api_url+"/cadernos?user={}".format(request.user))
            print("else profile-picker")
            print(response)
            contador=1
            return render(request,template_name="frontend/profile_picker.html",context = {"contador":contador})
    else:
        return redirect("accounts/login")




def submit_q_e(request, *args, **kwargs):
    def negritar(antes,depois):
        if antes == depois:
            return depois.split()
        a = antes.split()
        b = depois.split()
        e = []
        d = []
        c = difflib.context_diff(a, b,lineterm="",n=200)
        pode = False

        for i in c:
            if "----" in i:
                pode = True
            elif pode:
                
                if "!" in i:
                    i = i.replace("!", "@@@") + " @@@"
                    
                elif "+" in i:
                    i = i.replace("+","@@@") + " @@@"
                d.append(i)
        if len(d)<1:
            return depois.split()
        return d
    # o submit_q_e é o form que aparece depois do usuário responder 
    # Só as questões falsas pq precisam de correção do usuário
    #recebe correcao e separa em uma lista para colocar em Maiúsculo as palavras alteradas0
    correcao = request.POST["campo_texto"]

    id = int(request.POST["user_id"])
    # cargo = request.POST["cargo"]
    # banca = request.POST["banca"]
    # ano = request.POST["ano"]
    # orgao = request.POST["orgao"]
    loc_lei = request.POST["loc_lei"]

    resultado = bool(request.POST["resultado"])

    texto_item = request.POST["texto_item"]
    
    # esse for é para colocar em maiusculo as palavras que não existiam antes
    # Necessário aprimorar para não perceber só palavras novas
    correcao = negritar(texto_item,correcao)

    # Salva ou caso não exista, cria uma nova.
    

    # Salva no data_q.JSON
    y={}
    y = {
    "user":str(request.user),
    "id_questao": id,
    "id_lei":loc_lei,
    "correcao":' '.join(correcao),
    
    }
    requests.put(api_url+"/adicionarquestao",params=y)
    


    return redirect('questao')


def questao(request, *args, **kwargs):

    user = request.user
# verifica se existe user logado, e redireciona pq se não crasha
    if not user.is_authenticated:
        return redirect("/accounts/login")

    # Aqui pego as questões que o usuario já fez
    
    api_usuario_questoes = requests.get(api_url+"/user/{}".format(request.user)).json()
    if api_usuario_questoes == None:
        lista_do_usuario = []
    else:
        lista_do_usuario = api_usuario_questoes["questoes_feitas"]
    

    lista_do_usuario = "&q=".join(str(x) for x in lista_do_usuario)
    

    # PEGAR A LISTA DO CADERNO

    lista_id_caderno = requests.get(api_url+"/cadernos/{}".format(request.user)).json()
    id_caderno_ativo = lista_id_caderno["caderno_ativo"]
    caderno_ativo = lista_id_caderno["cadernos"][str(id_caderno_ativo)]["indices_lei"]
    caderno_ativo = "&q_c=".join(str(x) for x in caderno_ativo)
    

## Pegar infos da questão ##
    

#e qui eu verifico se o usuário ainda não fez a questão
    
    data = requests.get(api_url+"/questoes/cf88/uma?q="+lista_do_usuario+caderno_ativo).json()

    id = data["_id"]
    ano = data["ano"]
    banca = data["banca"]
    orgao = data["orgao"]
    cargo = data["cargo"]
    tipo = data["tipo_questao"]
    gabarito = data["gabarito"]
    comando = data["comando"]
    texto_item = data["texto_item"].strip()
    loc_lei = data["loc_lei"]

    lei_txt = requests.get(api_url+"/lei/{}".format(id)).json()[0]["texto_completo"]
## Pegar infos da questão ##

#Primeiro if é só da resposta
    if request.method == 'POST':
        form = PostResposta(request.POST)
        if True:
            resposta_user = request.POST["select"]
            print(resposta_user, request.user)
            resultado = resposta_user == gabarito
            print(resultado, resposta_user, gabarito)

## If para errado pq o forms é diferente
            if gabarito == "Errado":
                return render(request, 'frontend/questao.html',
                              {
                                  'current': request.user,
                                  'id': id,
                                  'ano': ano,
                                  'banca': banca,
                                  'orgao': orgao,
                                  'cargo': cargo,
                                  'tipo': tipo,
                                  'gabarito': gabarito,
                                  'comando': comando,
                                  'texto_item': texto_item,
                                  'resultado': resultado,
                                  "loc_lei":loc_lei,
                                  'respondido': True,
                                  "lei_txt":lei_txt
                              }) 
# Esse else é para Adicionar a questao certa que não precisa de correção do aluno
# só o texto_item     
            else:
                #vai precisar mudar para encaixar o anexo caso necessário
                
                #renderiza página com possível anexo
                return render(request, 'frontend/questao.html',
                          {
                              'current': request.user,
                              'id': id,
                              'ano': ano,
                              'banca': banca,
                              'orgao': orgao,
                              'cargo': cargo,
                              'questao': questao,
                              'tipo': tipo,
                              'gabarito': gabarito,
                              'comando': comando,
                              'texto_item': texto_item.strip(),
                              'resultado': resultado,
                              "loc_lei":loc_lei,
                              'respondido': True,
                              "lei_txt":lei_txt

                          })
# ese return é o primeiro return, sem nenhum post
    return render(request, 'frontend/questao.html',
                  {
                      'current': request.user,
                      'form': PostResposta(),
                      'id': id,
                      'ano': ano,
                      'banca': banca,
                      'orgao': orgao,
                      'cargo': cargo,
                      'tipo': tipo,
                      'gabarito': gabarito,
                      'comando': comando,
                      'texto_item': texto_item.strip(),
                      "loc_lei":loc_lei,
                      'respondido': False,
                      "lei_txt":lei_txt
                  }
                  )

def register_request(request):
    #criar caderno para usuario aqui
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            UserProfile.objects.create(user = user )
            user.save()
            login(request,user)
            messages.success(request,"Registration successful")
            requests.post(api_url+"/createuser?user={}".format(request.user))
            requests.post(api_url+"/cadernos?user={}".format(request.user))
            return redirect("/accounts/login")
        messages.error(request,"Unsuccessful registration. Invalid information")
    form = NewUserForm()
    return render(request=request,template_name="registration/register.html",context={"register_form":form})


def display_Anexo2_images_by_user(request):
  
    if request.method == 'GET':
  
        # getting all the objects of hotel.
        Anexos = Anexo2.objects.all().filter(user = request.user) 
        return render(request=request,template_name = 'frontend/display_anexo2_images.html',context = {'anexos' : Anexos})



def home_user_view(request,id_caderno):
  
    if request.method == 'GET':
        
        user = request.user
        if user.is_authenticated:
            
            response = requests.get(api_url+"/cadernos/{}".format(user)).json()
            
            nome_caderno = response["cadernos"][str(id_caderno)]["nome_caderno"]
        else : 
            redirect("accounts/login")

  
        return render(request,template_name="frontend/homeuser.html",context={"id_caderno":id_caderno,"nome_caderno":nome_caderno})
    



def create_caderno(request):

    # Mas Esse vai para a próxima lista
    if request.method == "POST" and request.POST["submit"] == "Prosseguir":
        marcados = []
        marcados_anteriormente = request.POST["marcados_anteriormente"]
        recomendado = []
        recomendado_formatado = []
        recomendado_api = []
        is_ultimo = False

        subordinados = request.POST.getlist('t_marcados')
        for i in subordinados:
            marcados.append(i.split(":")[0])
            recomendado.append(i.split(":")[1])

        if list(recomendado) != ["sem_subordinado"] :
            
            for i in list(recomendado):
                if i != "sem_subordinado":
                
                    for j in json.loads(i):
                        recomendado_formatado.append(j)
        
        if recomendado_formatado == []:
            is_ultimo = True 

        
        
        payload = {"item_ids":recomendado_formatado}
        #recomendado_api.append(requests.get("http://startup_api_1:3000/lista/createcaderno/{lista_id}",params=payload).json())
        recomendado_api.append(requests.get(api_url+"/lista/createcaderno/{lista_id}",params=payload).json())
        old_key = "_id"
        new_key = "id"
        print(recomendado_api)
        for i in recomendado_api:
            for j in i:
                j[new_key]= j.pop(old_key)

        recomendado_api = [item for sublist in recomendado_api for item in sublist]

        marcados += marcados_anteriormente.split(',')

        return render(request,template_name="frontend/create_caderno.html",context={
            "marcados" : ",".join(marcados),
            "recomendados":recomendado_api,
            "ultimo":is_ultimo

        })
    
    if request.method == "POST" and request.POST["submit"] == "Criar caderno":
        print(request.user)
        cadernos_dict = requests.get(api_url+"/cadernos/{}".format(request.user)).json()
        if cadernos_dict == None:
            cadernos_dict = {}
            cadernos_dict["cadernos"]=[]
        if len(list(cadernos_dict["cadernos"])) !=0:
            new_id = int(list(cadernos_dict["cadernos"])[-1]) + 1
        else:
            new_id = 0
        list_of_ids = request.POST["marcados_anteriormente"].split(",")
        while "" in list_of_ids:
            list_of_ids.remove("")
        bancas = []
        cargos = []
        print(list_of_ids)
        list_of_ids = list(map(int, list_of_ids))
        ind_lei_str = '"indice_lei":{}'.format(list_of_ids)
        bancas_str = '"bancas":{}'.format(bancas)
        cargos_str = '"cargos":{}'.format(cargos)
        print(request.POST["nome_caderno"])
        completo = "{" + ind_lei_str + ","+ bancas_str +","+cargos_str +"}"        
        print(requests.put(api_url+"/cadernos?user={}&id={}&nome_caderno={}".format(request.user,new_id,request.POST["nome_caderno"]),data = completo))
        
        return redirect("profile_picker")


    user = request.user
    if user.is_authenticated:
        response =requests.get(api_url+"/titulo").json()
        old_key = "_id"
        new_key = "id"
        for i in response:
            i[new_key]= i.pop(old_key)
        
        return render(request,template_name="frontend/create_caderno.html",context={
            "recomendados":response,
            
        })    
    else:
        return redirect("accounts/login")


def logout_screen(request):
    logout(request)
    return redirect("/")

def post_react_create_caderno(request):
    if request.method == "POST":
        subordinados = request.POST.getlist('marcados')
        print(subordinados)
        
        print(request.POST)


def imagem_cortada(request):
    ### RESIZE TA ZUADO PRECISA DE MELHORIA MAS TO BURRO HOJE
    imagem_url = request.POST["imagem"]
    format, imgstr = imagem_url.split(';base64,') 
    width_crop = request.POST["width_crop"]
    height_crop = request.POST["height_crop"]


    
    im = Image.open(BytesIO(base64.b64decode(imgstr))) 
    out = im.resize((1100,450),Image.ANTIALIAS)

    buffered = BytesIO()
    out.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')
    
    print(width_crop)
    print(height_crop)
    print(im.format, im.size, im.mode)



    return render(request,template_name="frontend/imagem_cortada.html",context={"imagem_url":img_str,"width_crop":width_crop,"height_crop":height_crop})



@api_view(['GET'])
def current_user(request):
    user = request.user
    print(user.email)
    return Response({
      'email' : user.email,
       # and so on...
    })
    