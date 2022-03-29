import React from 'react';
import Nivel2 from './nivel2';
import axios from 'axios';
import Questoes from './questoes';

class Artigo extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            nivel2: null,

            isOpen: false,
            loading: true,
            questoes: [],

        }
    }
    async componentDidMount() {


        var lista_recebidos = this.props.lista_de_subordinados
        var string_list = "lista/{lista_id}?"


        var nivel2 = []
        if (lista_recebidos.constructor === Array) {

            lista_recebidos.map(async i => {
                string_list += "item_ids=" + i + "&"


            })
            var subordinado = await axios.get('https://api-startup-luka-xuxu.herokuapp.com/' + string_list)
            nivel2 = subordinado.data
            var questoes = []
            if (this.props.id_alteradas.includes(this.props.id_artigo)) {
                questoes = await (await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_artigo)).data

            }

            this.setState({ nivel2: nivel2, loading: false, questoes: questoes })
        }




    }

    render() {
        const { nivel2, isOpen, questoes } = this.state;
        const user = this.props.current_user
        const url = Object.values(this.props.custom_list)
        const questoes_lista = Object.values(questoes)
        const id_custom_view = url

        var tem_questao = false
        if (questoes_lista.length != 0) {
            tem_questao = true
        }


        if (this.props.aberto) {
            return (<div className="artigo">

                <p onClick={() => this.setState({ isOpen: !this.state.isOpen })} >{this.props.texto} - ID {this.props.id_artigo} {tem_questao === true && <p>...</p>}</p>


                {questoes_lista.map(i => {
                    if (isOpen) {
                        return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                    }
                })}

                {nivel2 ? nivel2.map(itens => {
                    return <Nivel2 aberto={isOpen} texto={itens.texto} id_nivel2={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} lista_de_subordinados={itens.subordinado} id_alteradas={this.props.id_alteradas} />
                }) : <div></div>}
            </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Artigo;