import React from 'react';
import Nivel3 from './nivel3';

import axios from 'axios';

import Questoes from './questoes';

class Nivel2 extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            nivel3: null,


            isOpen: false,
            questoes:[],

        }
    }
    async componentDidMount() {
        var lista_recebidos = this.props.lista_de_subordinados
        var string_list = "lista/{lista_id}?"
        var nivel3 = []
        if (lista_recebidos.constructor === Array) {
            
            lista_recebidos.map(async i => {
                string_list += "item_ids="+i+"&"
            })
            var subordinado = await axios.get('https://api-startup-luka-xuxu.herokuapp.com/' + string_list)
            nivel3 = subordinado.data
            
            
        }
        var questoes = []
            if (this.props.id_alteradas.includes(this.props.id_nivel2)) {
                questoes = await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_nivel2)
                questoes = questoes.data
            }
        
            this.setState({ nivel3: nivel3,questoes:questoes})


    }

    render() {
        const { nivel3, isOpen,questoes } = this.state;
        const url = Object.values(this.props.custom_list)

        const id_custom_view = url


        const user = this.props.current_user

        const questoes_lista = Object.values(questoes)
        var tem_questao = false
                if (questoes_lista.length != 0) {
                    tem_questao = true
                }
    



        if (this.props.aberto) {
            return (<div className="nivel2">

                <p onClick={() => this.setState({ isOpen: !this.state.isOpen })}>{this.props.texto} - ID {this.props.id_nivel2} {tem_questao === true && <p>...</p>}</p>

                {questoes_lista.map(i => {
                    if (isOpen) {
                        return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                    }
                })}
                {nivel3 ? nivel3.map(itens => {
                    return <Nivel3 aberto={isOpen} texto={itens.texto} id_nivel3={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas = {this.props.id_alteradas}/>
                }):<div></div>}
                
            </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Nivel2;