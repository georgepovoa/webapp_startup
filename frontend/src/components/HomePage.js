import React, { Component } from "react";
import Lei from "./leis/lei";
import Caderno from "./caderno/caderno";
import CadernoNome from "./caderno/nome_caderno";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import Image_upload from "./image_upload/image_upload";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state ={
            current_user : []
        }
    }

    async componentDidMount(){
        const response = await axios.get("/api/current")

        this.setState({current_user : response.data})
        
    }

    render() {
        return (
            <div>
            <Router>
                
                
                <Switch>
                    <Route path="/lei/:id_pv" component={Lei}></Route>
                    <Route path="/criarcadernoreact/:nome" component={Caderno}></Route>
                    <Route path="/criarcadernoreactnome" component={CadernoNome}></Route>
                    <Route path="/upload_image" component={Image_upload}></Route>


                    

                </Switch>
            </Router>
            </div>
        )
    }

}