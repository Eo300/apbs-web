import React, { Component } from 'react';
// import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import logo from './logo.svg';
import MyHeader from './myheader.js';
import MyFooter from './myfooter.js';
import HomePage from './home.js';
import ConfigPDB2PQR from './configpdb2pqr.js';
import './App.css';
import 'antd/dist/antd.css';

import { Layout } from 'antd';

const Home = () => (
<div>
    <h2>Home</h2>
</div>
)
  
const About = () => (
    <div>
        <h2>About</h2>
    </div>
)
  
const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)
  
const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
        <li>
            <Link to={`${match.url}/rendering`}>
            Rendering with React
            </Link>
        </li>
        <li>
            <Link to={`${match.url}/components`}>
            Components
            </Link>
        </li>
        <li>
            <Link to={`${match.url}/props-v-state`}>
            Props v. State
            </Link>
        </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic}/>
        <Route exact path={match.path} render={() => (
        <h3>Please select a topic.</h3>
        )}/>
    </div>
)
  
class BasicExample extends Component{
    render(){

        let navbar_options = new Map();
        let content = "";

        navbar_options.set("navbar_home",    "Home");
        navbar_options.set("navbar_pdb2pqr", "PDB2PQR");
        navbar_options.set("navbar_apbs",    "APBS");
        navbar_options.set("navbar_about",   "About");

        return(
            <Router>
                <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={Home}/>
                <Route path="/about" component={MyHeader}/>
                <Route path="/topics" component={Topics}/>
                </div>
            </Router>
        )
    }
}

export default BasicExample