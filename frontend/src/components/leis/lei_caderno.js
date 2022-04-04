import React from 'react';
import Titulo from './titulo';
import axios from 'axios';


class Lei_caderno extends React.Component {
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


        const response = await axios.get("/current-user")

        const response_caderno = await axios.get("https://api-startup-luka-xuxu.herokuapp.com/cadernos/"+response.data.email)

        
        console.log("response caderno",response_caderno)

        var nome_caderno = ""

        var lista_caderno =""
        
        this.setState({
            current_user: response.data.email,
            titulos: response_api.data,
            filtro_caderno:lista_caderno,
            nome_caderno:nome_caderno
        })
    }

    render() {
        const { titulos, current_user,lei_id_alteradas } = this.state;

        const lista_de_titulos = Object.values(titulos)
        const id_pv = 0
        console.log(lei_id_alteradas)

        return (<div> 
            {
            lista_de_titulos.map((t => {  
                console.log(this.props.ativos)
                console.log(lista_de_titulos)
                console.log(t)
                
                if (this.props.ativos.includes(t._id)){
                    return <div className="titulo-class">
                    {console.log(t._id, t.subordinado)}
                    <Titulo id_titulo={t._id} key={t._id} texto={t.texto} custom_list={id_pv} current_user={current_user} lista_de_subordinados={t.subordinado} id_alteradas = {[]} filtro = {this.props.ativos}/>
                </div>
                }
}))}

        </div>
        )

    }
}

export default Lei_caderno;