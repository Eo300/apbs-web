import React, { Component } from 'react';
// import logo from './logo.svg';
import PAGES from './pagenames.js';
import MyHeader from './myheader.js';
import MyFooter from './myfooter.js';
import HomePage from './home.js';
import AboutPage from './about.js';
import ConfigPDB2PQR from './configpdb2pqr.js';
import ConfigAPBS from './configapbs.js';
import JobStatus from './jobstatus.js';
import './App.css';
import 'antd/dist/antd.css';

import { Layout, Breadcrumb, Col } from 'antd';
// import { Layout, Col, Menu, Icon, Tooltip, Alert } from 'antd';
// const { Header, Content, Sider, Footer } = Layout;

/**
 * Main application code.
 * The page displayed to the user is dependent on the state of the current page.
 * The current page is determined through the React Router, implemented in router.js
 */
class App extends Component {
  constructor(props){
      super(props);
      this.onClickSelectPage = this.onClickSelectPage.bind(this);
      // this.handleJobSubmit = this.handleJobSubmit.bind(this);
      this.state = {
          cur_page: this.props.page,  // Current page
          job_submit: false,          // Maintains if user tries clicking the Start Job button again
      };
  }

  /** 
   * onClick handler for user selecting a page. Is passed into child componenets
   */
  onClickSelectPage(selected_page){
    this.setState({
        cur_page: selected_page
    })
  }

  /** Builds Breadcrumb component
   * @param {array} items - list containing the desired items for the breadcrumb
   */
  createServiceBreadcrumb(items){
    let trail = [];
    let itemNum = 0;
    items.forEach(function(value){
      itemNum += 1;
      // console.log(k)
      if(itemNum != items.length){
        trail.push(<Breadcrumb.Item >{value}</Breadcrumb.Item>)
      }
      else{
        trail.push(<Breadcrumb.Item><b>{value}</b></Breadcrumb.Item>)
      }
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


    // HOME page
    // Renders landing page, with choice to do PDB2PQR or APBS
    if (this.state.cur_page === PAGES.home || this.state.cur_page === null){
      content = <HomePage />;
    }
    
    // ABOUT page
    // Renders the about page
    else if (this.state.cur_page === PAGES.about){
      content = <AboutPage />;
    }

    // DOCUMENTATION page
    // Renders the about page
    // Directs user to the APBS-PDB2PQR documentation
    else if (this.state.cur_page === PAGES.documentation){
      bcrumb = this.createServiceBreadcrumb(['Documentation'])
      content = <embed 
        style={{height: '70vh'}}
        src="https://apbs-pdb2pqr.readthedocs.io/en/latest/"/>;
    }

    // PDB2PQR page
    // Renders configuration elements to set up an PDB2PQR job
    else if (this.state.cur_page === PAGES.pdb2pqr){
      bcrumb = this.createServiceBreadcrumb(['Services', 'PDB2PQR Job Configuration'])
      content = <ConfigPDB2PQR />;
    }
    
    // APBS page
    // Renders configuration elements to set up an APBS job
    else if (this.state.cur_page === PAGES.apbs){
      bcrumb = this.createServiceBreadcrumb(['Services', 'APBS Job Configuration'])
      content = <ConfigAPBS />;
    }

    // JOB STATUS page
    // Renders job status page
    else if (this.state.cur_page === PAGES.status){
      let queryParser = require('query-string-es5');
      let job_id = queryParser.parse(this.props.query)['jobid']

      bcrumb = this.createServiceBreadcrumb(['Services', 'Job Status', job_id])
      content = 
        <JobStatus
          jobid={job_id}
        />;
    }


    return(
      <Layout style={{ height: '100%' }}>
        <MyHeader
          activeItem={this.state.cur_page}
          navbar_items={navbar_options}
          all_header_items={new Array()}
          onClick={j => this.onClickSelectPage(j)}
        />
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
