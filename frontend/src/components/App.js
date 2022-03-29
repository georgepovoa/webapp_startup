import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import axios from 'axios'
import Navbar from "./Navbar";
import UserNav from "./Usernav";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state ={   
            current_user : {},
            

        }
    }

    async componentDidMount(){
        const response = await axios.get("/api/current")

        this.setState({current_user:response.data[0]})
    
        
    }
    




    render() {
        
        


        return (
            <div className = "appdiv" >
                
                
                
                <br/>
                
                
                <HomePage />
                
                
            </div>

        )
        
    }
    
}

const appDiv = document.getElementById("app");
render(<App />, appDiv)