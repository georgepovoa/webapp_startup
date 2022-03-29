import React, { Component } from "react";

export default class HomeQuestao extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const a = "o Presidente ficará suspenso de suas funções nas infrações penais comuns, após a instauração do processo pela Câmara dos Deputados."
        const b = "admitida a acusação contra o Presidente, por dois terços da Câmara dos Deputados, será ele submetido a julgamento perante o Senado Federal, nos crimes de responsabilidade."
        const c = 'o Presidente da República, na vigência de seu mandato, pode ser responsabilizado por atos estranhos ao exercício de suas funções, desde que se configurem como crimes hediondos.'
        const d = 'nas infrações comuns, antes da prolação da sentença condenatória pelo STF, o Presidente da República estará sujeito a prisão, desde que autorizada por decisão de dois terços do Plenário.'
        const e = 'se decorrido o prazo de noventa dias da suspensão do Presidente de suas funções e o julgamento não estiver concluído, cessará automaticamente o afastamento do Chefe do Poder Executivo.'


return <div className="homeQuestao">
            <div className="info-bar">
                <p>1790580</p>
                <p>Presidente da República, Vice-Presidente da República e Ministros de Estado. , Poder Executivo</p>
                <p>2020</p>
                <p>VUNESP</p>
                <p>Prefeitura de Ilhabela</p>
                <p>SP Analista Ciências Sociais Gestão Pública</p>
            </div>

            <div>
                <p>A respeito da responsabilidade do Presidente da República, é correto afirmar que</p>
                <br></br>
            </div>
            <form>
                <fieldset>
                    <legend>Personalia:</legend>
                    
                    <input type="radio" id="a" name="resposta" value = "a"/>
                    <label for="a">{a}</label>
                    <br /><br />
                    
                    <input type="radio" id="b" name="resposta" value = "b"/>
                    <label for="b">{b}</label>
                    <br /><br />
                    
                    <input type="radio" id="c" name="resposta" value = "c"/>
                    <label for="c">{c}</label>
                    <br /><br />
                    
                    <input type="radio" id="d" name="resposta" value = "d"/>
                    <label for="d">{d}</label>
                    <br/><br/>

                    <input type="radio" id="e" name="resposta" value = "e"/>
                    <label for="e">{e}</label>
                    <br/><br/>
                        <input type="submit" value="Submit" />
                    </fieldset>
                    </form>
                </div>
    }

}

                [, , , 'se decorrido o prazo de noventa dias da suspensão do Presidente de suas funções e o julgamento não estiver concluído, cessará automaticamente o afastamento do Chefe do Poder Executivo.']


// o Presidente ficará suspenso de suas funções nas infrações penais comuns, após a instauração do processo pela Câmara dos Deputados.
//admitida a acusação contra o Presidente, por dois terços da Câmara dos Deputados, será ele submetido a julgamento perante o Senado Federal, nos crimes de responsabilidade.
//o Presidente da República, na vigência de seu mandato, pode ser responsabilizado por atos estranhos ao exercício de suas funções, desde que se configurem como crimes hediondos.
//nas infrações comuns, antes da prolação da sentença condenatória pelo STF, o Presidente da República estará sujeito a prisão, desde que autorizada por decisão de dois terços do Plenário.
//se decorrido o prazo de noventa dias da suspensão do Presidente de suas funções e o julgamento não estiver concluído, cessará automaticamente o afastamento do Chefe do Poder Executivo.