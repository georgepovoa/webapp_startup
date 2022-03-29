import React from 'react';
import axios from 'axios';
import cookie from "react-cookies";
import Lei_caderno from '../leis/lei_caderno';




class CadernoNome extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            nome :"",
            foto_perfil : ""

        }
    }



    async componentDidMount() {
        
        
    }
    

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.setState({image: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      handleChange=(e)=>{
        this.setState({nome:e.target.value})
      }
    
    render() {
        


     return <div class = "caderno-react-nome">
         
         {/* <label for="nome">Nome do perfil</label>
         <input name='nome'></input>
         <input type='file'></input> */}
         <div class = "caderno-react-nome-nome">
<label for="nome">Nome do perfil</label>

         <input name='nome'  value={this.state.nome} onChange={this.handleChange}></input>
         </div>
         <div class = "caderno-react-nome-imagem">
<input type="file" onChange={this.onImageChange} className="filetype" id="group_image"/>

<img id="target" src={this.state.image} className="criar-caderno-imagem"/>
</div>
<div> <a href={'/criarcadernoreact/' + this.state.nome}> Next</a> </div>
   </div>
        }
}

export default CadernoNome;


