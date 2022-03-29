import React from 'react';
import SubSec from './subsec';
import Artigo from './artigos';
import axios from 'axios';
import Questoes from './questoes';

class Secoes extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            subSec: [],
            artigos: [],
            isOpen: false,
            questoes: [],

        }

    }



    async componentDidMount() {
        var lista_recebidos = this.props.lista_de_subordinados
        var string_list = "lista/{lista_id}?"


        var artigo = []
        var subsecoes = []

        lista_recebidos.map(async i => {
            string_list += "item_ids="+i+"&"

            
        })
        var subordinado = await axios.get('https://api-startup-luka-xuxu.herokuapp.com/' + string_list)
            if (subordinado.data[0].tipo == "artigo") {
                artigo = subordinado.data
            }
            else {
                subsecoes = subordinado.data
            }
            var questoes = []
            if (this.props.id_alteradas.includes(this.props.id_secoes)) {
                questoes = await (await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_secoes)).data
    
            }
            


        this.setState({
            subSec: subsecoes,
            artigos: artigo,
            questoes:questoes
        })

    }

    render() {
        const { subSec, isOpen, artigos,questoes } = this.state;

        const url = Object.values(this.props.custom_list)
        const questoes_lista = Object.values(questoes)


        const id_custom_view = url

        const user = this.props.current_user
        var tem_questao = false

        if (questoes_lista.length != 0) {
            tem_questao = true
        }

        if (this.props.aberto) {
            return (<div className="secao">

                <p onClick={() => this.setState({ isOpen: !this.state.isOpen })} >{this.props.texto} - ID {this.props.id_secoes} {tem_questao === true && <p>...</p>}</p>


                {questoes_lista.map(i => {
                    if (isOpen) {
                        return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                    }
                })}

                {subSec || artigos ? subSec.map(itens => {
                    if(this.props.filtro.includes(itens._id)){
                    return <SubSec aberto={isOpen} texto={itens.texto} id_subsec={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas}/>
        }}):<div></div>}

                {subSec || artigos ? artigos.map(itens => {
                    return <Artigo aberto={isOpen} texto={itens.texto} id_artigo={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas}/>
                }):
                <div></div>}
                

            </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Secoes;