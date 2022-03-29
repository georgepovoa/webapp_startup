import React from 'react';

class Questoes extends React.Component {
    render()

        {
            var texto_splitado = []
            function receber_texto_todo(texto){
                texto_splitado = texto.split("@@@")
                
                return texto_splitado
            }
            
            var texto_splitado_return = receber_texto_todo(this.props.texto)
            

            

        if (this.props.aberto) {
            return (<div className="questoes">
                {<p>{texto_splitado_return.map((i,ii)=>{
                    
                    if(ii %2 != 0){
                        return (<b>{i}</b>)
                    }
                    else{
                        return (i)
                    }
                })}</p>}
                {/* {this.props.texto} */}
                <p>({this.props.banca} - {this.props.orgao} - {this.props.cargo} - {this.props.ano})</p>
            </div>
            )
        }
        else {
            return (null)
        }
    }
}

export default Questoes;