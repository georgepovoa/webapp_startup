import React from 'react';
import axios from 'axios';
import Questoes from './questoes';


class Nivel4 extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            isOpen: false,
            questoes:[],


        }
    }
    async componentDidMount() {

        var questoes = []
        if (this.props.id_alteradas.includes(this.props.id_nivel4)) {
            questoes = await (await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_q_individual/" + this.props.current_user + "/questao/" + this.props.id_nivel4)).data

        }
        this.setState({questoes:questoes})
    }

    render() {

        const { isOpen,questoes } = this.state;
        const user = this.props.current_user
        const questoes_lista = Object.values(questoes)

        var tem_questao = false
                if (questoes_lista.length != 0) {
                    tem_questao = true
                }
            
        
         
       
        if (this.props.aberto) {
            return (<div className="nivel4">

                <p onClick={() => this.setState({ isOpen: !this.state.isOpen })} >{this.props.texto} - ID {this.props.id_nivel4} {tem_questao===true && <p>...</p>}</p>
                {questoes_lista.map(i => {
                            if (isOpen) {
                                return <Questoes texto={i.correcao} id_questao = {i.id_q} aberto={isOpen}></Questoes>
                            }
                        })}
            </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Nivel4;