import React from 'react';
import Nivel4 from './nivel4';
import axios from 'axios';
import Questoes from './questoes';


class Nivel3 extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            nivel4: null,


            isOpen: false,
            questoes:[],


        }
    }
    async componentDidMount() {
        var lista_recebidos = this.props.lista_de_subordinados
        var string_list = "lista/{lista_id}?"

        if (lista_recebidos.constructor === Array){


        var nivel4 = []

        lista_recebidos.map( i => {
            string_list += "lista_de_ids="+i+"&"


        })
        var subordinado = await axios.get('https://api-startup-luka-xuxu.herokuapp.com/' + string_list)
        nivel4.push(subordinado.data)

        var questoes = []
            if (this.props.id_alteradas.includes(this.props.id_nivel3)) {
                questoes = await (await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_nivel3)).data

            }


        this.setState({ nivel4: nivel4,questoes:questoes })

    }}

    render() {
        const { nivel4, isOpen,questoes } = this.state;
        const user = this.props.current_user
        const url = Object.values(this.props.custom_list)
        const id_custom_view = url
        const questoes_lista = Object.values(questoes)

        var tem_questao = false
                if (questoes_lista.length != 0) {
                    tem_questao = true
                }
    
        if (this.props.aberto) {
            return (<div className="nivel3">

                <p onClick={() => this.setState({ isOpen: !this.state.isOpen })} >{this.props.texto} - ID {this.props.id_nivel3} {tem_questao === true && <p>...</p>}</p>

                {questoes_lista.map(i => {
                    if (isOpen) {
                        return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                    }
                })}

                {nivel4 ? nivel4.map(itens => {
                        return <Nivel4 aberto={isOpen} texto={itens.texto} id_nivel4={itens._id} custom_list={id_custom_view} current_user={this.props.current_user} id_alteradas = {this.props.id_alteradas}/>
                }):<div></div>}

            </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Nivel3;