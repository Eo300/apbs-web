import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import App from './App';
import './App.css';
import 'antd/dist/antd.css';
import PAGES from './pagenames.js';

  
class ServerRouter extends Component{
    render(){

        // let navbar_options = new Map();
        // let content = "";

        // navbar_options.set("navbar_home",    "Home");
        // navbar_options.set("navbar_pdb2pqr", "PDB2PQR");
        // navbar_options.set("navbar_apbs",    "APBS");
        // navbar_options.set("navbar_about",   "About");

        return(
            <Router>
                <div>
                    <Route exact path="/"
                        render={ props => (
                            <App page={PAGES.home}/>
                            // <App page="navbar_home"/>
                        )}                
                    />
                    <Route path="/about"
                        render={ props => (
                            <App page={PAGES.about}/>
                        )}
                    />
                    <Route path="/documentation"
                        render={ props => (
                            <App page={PAGES.documentation}/>
                        )}
                    />
                    <Route path="/pdb2pqr"
                        render={ props => (
                            <App page={PAGES.pdb2pqr}/>
                        )}
                    />
                    <Route path="/apbs"
                        render={ props => (
                            <App page={PAGES.apbs}/>
                        )}
                    />
                    <Route path="/jobstatus"
                        render={ props => (
                            <App page={PAGES.status} query={props.location.search}/>
                        )}
                    />
                </div>
            </Router>
        )
    }
}

export default ServerRouter