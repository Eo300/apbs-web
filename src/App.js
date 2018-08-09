import React, { Component } from 'react';
// import logo from './logo.svg';
import MyHeader from './myheader.js';
import MyFooter from './myfooter.js';
import HomePage from './home.js';
import ConfigPDB2PQR from './configpdb2pqr.js';
import JobStatus from './jobstatus.js';
import './App.css';
import 'antd/dist/antd.css';

import { Layout, Breadcrumb, Col } from 'antd';
// import { Layout, Col, Menu, Icon, Tooltip, Alert } from 'antd';
// const { Header, Content, Sider, Footer } = Layout;

class App extends Component {
  constructor(props){
      super(props);
      this.selectJobClick = this.selectJobClick.bind(this);
      // this.handleJobSubmit = this.handleJobSubmit.bind(this);
      this.state = {
          // job_type: "navbar_pdb2pqr",
          cur_page: this.props.page,
          // query_string: this.props.query,
          // job_type: "navbar_home",
          job_submit: false,

          // Maintains state for PDB2PQR configuration in case user hops back and forth
          pdb2pqr_settings: {
              pdb_id: null,
              ff: null,
              output_scheme: null,
          },
          
          // Maintains state for APBS for same purpose as pdb2pqr_settings
          apbs_settings: {

          },
      };
  }

  // onClick handler for user selecting a job. Is passed into child componenets
  selectJobClick(selected_job){
    this.setState({
        cur_page: selected_job
    })
  }

  createServiceBreadcrumb(items){
    let trail = [];
    items.forEach(function(value){
      // console.log(k)
      trail.push(
        <Breadcrumb.Item >{value}</Breadcrumb.Item>
      )
    });    
    return(
      <Breadcrumb style={{ margin: '16px 0' }}>
        {trail}
        {/* <Breadcrumb.Item>Services</Breadcrumb.Item>
        <Breadcrumb.Item>{tail}</Breadcrumb.Item> */}
      </Breadcrumb>      
    )
  }

  render() {
    let navbar_options = new Map();
    let content = "";
    let bcrumb = "";

    navbar_options.set("navbar_home",    "Home");
    navbar_options.set("navbar_pdb2pqr", "PDB2PQR");
    navbar_options.set("navbar_apbs",    "APBS");
    navbar_options.set("navbar_about",   "About");


    // Renders landing page, with choice to do PDB2PQR or APBS
    if (this.state.cur_page === "navbar_home" || this.state.cur_page === null){
      // content = "You are in Home";
      content = <HomePage />;
    }
    
    // Renders configuration elements to set up an PDB2PQR job
    else if (this.state.cur_page === "navbar_pdb2pqr"){
      bcrumb = this.createServiceBreadcrumb(['Services', 'PDB2PQR Job Configuration'])
      content = <ConfigPDB2PQR />;
    }
    
    // Renders configuration elements to set up an APBS job
    else if (this.state.cur_page === "navbar_apbs"){
      // content = "You are in APBS";
      // return("Selected APBS")
      bcrumb = this.createServiceBreadcrumb(['Services', 'APBS Job Configuration'])
    }

    else if (this.state.cur_page === "navbar_about"){}

    // Renders job status page
    else if (this.state.cur_page === "navbar_status"){
      let queryParser = require('query-string-es5');
      let job_id = queryParser.parse(this.props.query)['jobid']
      // let job_id = this.state.query_string.substring(1)
      bcrumb = this.createServiceBreadcrumb(['Services', 'Job Status', job_id])
      content = 
        <JobStatus
          jobid={job_id}
          // jobid={this.state.query_string}
        />;
    }


    return(
      <Layout style={{ height: '100%' }}>
        <MyHeader
          activeItem={this.state.cur_page}
          navbar_items={navbar_options}
          all_header_items={new Array()}
          onClick={j => this.selectJobClick(j)}
        />
        {/* <Layout> */}
        <Layout style={{ padding: '0 50px' }}>
          {bcrumb}
          {content}
        </Layout>
        <MyFooter />
      </Layout>

    )

  }
}

export default App;
