import React from 'react';
import Secoes from './secoes';
import Artigo from './artigos';
import axios from 'axios';
import Questoes from './questoes';


class Capitulo extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            secoes: null,
            artigos: null,

            isOpen: false,
            loading: true,
            questoes:[],

        }
    }
    async componentDidMount() {
       
        var lista_recebidos = this.props.lista_de_subordinados
        var string_list = "lista/{lista_id}?"



        var artigo = []
        var secao = []

        lista_recebidos.map(async i => {
            string_list += "item_ids="+i+"&"
        })
        var subordinado = await axios.get('https://api-startup-luka-xuxu.herokuapp.com/' + string_list)
        if (subordinado.data[0].tipo == "artigo") {
            artigo = subordinado.data
        }
        else {
            secao = subordinado.data
        }

        var questoes = []
            if (this.props.id_alteradas.includes(this.props.id_capitulo)) {
                questoes = await (await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_capitulo)).data

            }


        this.setState({
            secoes: secao,
            artigos: artigo,
            loading: false,
            questoes:questoes
        })

        document.body.style.cursor = 'default'

        

    }

    render() {
        
        const { secoes, isOpen, artigos,questoes } = this.state;

        const url = Object.values(this.props.custom_list)
        const id_custom_view = url

        const user = this.props.current_user

        
        const questoes_lista = Object.values(questoes)

        var tem_questao = false
                if (questoes_lista.length != 0) {
                    tem_questao = true
                }
        
        if (this.props.aberto) {

            return (
                <div className="capitulo">

                    <p onClick={() => this.setState({ isOpen: !this.state.isOpen })} >{this.props.texto} - ID {this.props.id_capitulo}{tem_questao === true && <p>...</p>}</p>


                    {questoes_lista.map(i => {
                    if (isOpen) {
                        return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                    }
                })}

                    {secoes || artigos ? secoes.map(itens => {
                        if(this.props.filtro.includes(itens._id)){
                        return <Secoes aberto={isOpen} texto={itens.texto} id_secoes={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas} filtro = {this.props.filtro}/>
        }}) : <p>Loading</p>}


                    {secoes || artigos ? artigos.map(itens => {
                        return <Artigo aberto={isOpen} texto={itens.texto} id_artigo={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas}/>
                    }) : <p>Loading...</p>}

                </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Capitulo;