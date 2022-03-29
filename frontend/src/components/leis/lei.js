import React from 'react';
import Titulo from './titulo';
import axios from 'axios';


class Lei extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            titulos: [],
            current_user: "",
            lei_id_alteradas:[],
            filtro_caderno:[],
            nome_caderno:"Sem caderno",


        }
    }



    async componentDidMount() {
        const response_api = await axios.get("https://api-startup-luka-xuxu.herokuapp.com/titulo")


        const response = await axios.get("/api/current")

        const response_questoes = await axios.get("https://api-startup-luka-xuxu.herokuapp.com/get_all_q_user/"+response.data[0].email)

        const response_caderno = await axios.get("https://api-startup-luka-xuxu.herokuapp.com/cadernos/"+response.data[0].email)

        var id_caderno = response_caderno.data.caderno_ativo

        var nome_caderno = response_caderno.data.cadernos[id_caderno].nome_caderno

        var lista_caderno = response_caderno.data.cadernos[id_caderno].indices_lei
        
        this.setState({
            current_user: response.data[0].email,
            titulos: response_api.data,
            lei_id_alteradas:response_questoes.data,
            filtro_caderno:lista_caderno,
            nome_caderno:nome_caderno
        })
    }

    render() {
        const { titulos, current_user,lei_id_alteradas } = this.state;

        const lista_de_titulos = Object.values(titulos)
        const url = Object.values(this.props)[2].url
        const id_pv = url.split("/")[2]
        console.log(lei_id_alteradas)

        return (<div>
            <nav>
                <a href="/"><img src="https://www.logomaker.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6khvCBqRBPmxjNwXs1M3EMoAJtliMkhvBq9...Q... " /></a>

                <div className="divnav">
                    <a href="/homequestao">Resolver Questoes</a>

                    <a href="/feitas">Questoes Feitas</a>
                    <a href="/lei/0">Lei</a>
                    <a href="/accounts/logout">Logout</a>

                    <a href="/accounts/login">Login</a>

                </div>
            </nav>
            <h1>{this.state.nome_caderno}</h1>
            <h1>{current_user}</h1>
            
            {
            lista_de_titulos.map((t => {  
                
                if (this.state.filtro_caderno.includes(t._id)){
                    return <div className="titulo-class">
                    {console.log(t._id, t.subordinado)}
                    <Titulo id_titulo={t._id} key={t._id} texto={t.texto} custom_list={id_pv} current_user={current_user} lista_de_subordinados={t.subordinado} id_alteradas = {lei_id_alteradas} filtro = {this.state.filtro_caderno}/>
                </div>
                }
}))}

        </div>
        )

    }
}

export default Lei;