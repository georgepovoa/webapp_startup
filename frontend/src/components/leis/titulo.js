import React from 'react';
import Capitulos from './capitulos';
import Artigo from './artigos';
import axios from 'axios';
import Questoes from './questoes';

class Titulo extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            capitulos: [],
            artigos: [],
            isOpen: false,
            loading:true,
            questoes :[],
        }
    }

    async componentDidMount() {
        
        var lista_recebidos = this.props.lista_de_subordinados
        var string_list = "lista/{lista_id}?"

        if (lista_recebidos.constructor === Array) {

            var artigo = []
            var capitulo = []

            lista_recebidos.map(async i => {
                string_list += "lista_de_ids="+i+"&"    
            })
            var subordinado = await axios.get('https://api-startup-luka-xuxu.herokuapp.com/' + string_list)
            if (subordinado.data[0].tipo == "artigo") {
                artigo = subordinado.data
            }
            else {
                capitulo = subordinado.data
            }
            var questoes = []
            if (this.props.id_alteradas.includes(this.props.id_titulo)) {
                questoes = await (await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_titulo)).data

            }

            
            this.setState({
                capitulos: capitulo,
                artigos: artigo,
                loading:false,
                questoes: questoes
            })
        }
        
        


    }

    render() {

        
        const { capitulos, isOpen, artigos,questoes } = this.state;


        const url = Object.values(this.props.custom_list)

        const id_custom_view = url

        

        const questoes_lista = Object.values(questoes)

        var tem_questao = false
                if (questoes_lista.length != 0) {
                    tem_questao = true
                }
    

        return (
                
            
        <div className="titulo">
            <p onClick={() => this.setState({ isOpen: !this.state.isOpen })}>{this.props.texto}</p>

            {questoes_lista.map(i => {
                    if (isOpen) {
                        return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                    }
                })}

                
            {capitulos.map(itens => {
                if(this.props.filtro.includes(itens._id)){                
                return <Capitulos id_capitulo={itens._id} texto={itens.texto} aberto={isOpen} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas} filtro = {this.props.filtro}></Capitulos>
    }})}
            {artigos.map(itens => {
                if(this.props.filtro.includes(itens._id)){
                return <Artigo aberto={isOpen} texto={itens.texto} id_artigo={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas}></Artigo >

    }})}
                    
        </div>
        )

    }
}

export default Titulo;