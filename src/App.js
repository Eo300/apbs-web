import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

import 'antd/dist/antd.css'

import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

class MyHeader extends Component{
  render(){
    return(
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.props.active]}
          // defaultSelectedKeys={["navbar_pdb2pqr"]}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item onClick={() => this.props.onClick(this.key)} key="navbar_home"> Home </Menu.Item>
          <Menu.Item onClick={() => this.props.onClick(this.key)} key="navbar_pdb2pqr"> PDB2PQR </Menu.Item>
          <Menu.Item onClick={() => this.props.onClick(this.key)} key="navbar_apbs"> APBS </Menu.Item>
        </Menu>
      </Header>
    )
  }
}

class App extends Component {
  constructor(props){
      super(props);
      this.selectJobClick = this.selectJobClick.bind(this)
      this.state = {
          job_type: "navbar_home",

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
          job_type: selected_job
      })
  }

  render() {

    let content = "";
    // Renders landing page, with choice to do PDB2PQR or APBS
    if (this.state.job_type === "navbar_home"){
      // return(
      //   <Layout>
      //     <MyHeader
      //       active={this.state.job_type}
      //       onClick={j => this.selectJobClick(j)}            
      //     />

      //   </Layout>
      // )
      content = "You are in Home";
    }
    
    // Renders configuration elements to set up an PDB2PQR job
    else if (this.state.job_type === "navbar_pdb2pqr"){
      content = "You are in PDB2PQR";
    }
    
    // Renders configuration elements to set up an APBS job
    else if (this.state.job_type === "navbar_apbs"){
      content = "You are in APBS";
        // return("Selected APBS")
    }

    // This should be unreachable since the state is only changed via a button press
    // else{ return("job_type is invalid. How'd you get here") }

    return(
      <Layout>
        <MyHeader
          active={this.state.job_type}
          onClick={j => this.selectJobClick(j)}            
        />
        <Layout>
          {content}
        </Layout>
      </Layout>

    )

    return (
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["navbar_pdb2pqr"]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="navbar_home"> Home </Menu.Item>
            <Menu.Item key="navbar_pdb2pqr"> PDB2PQR </Menu.Item>
            <Menu.Item key="navbar_apbs"> APBS </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              // theme="dark"
              mode="inline"
              defaultSelectedKeys={['which_pdb']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="which_pdb"> PDB ID Entry </Menu.Item>
              <Menu.Item key="which_ff"> Forcefield </Menu.Item>
              <Menu.Item key="which_output"> Output Naming Scheme </Menu.Item>
              <Menu.Item key="which_options"> Additional Options </Menu.Item>
              <Menu.Item key="which_pka"> pKa Settings (optional) </Menu.Item>
              <Menu.Item key="submission"> Start Job </Menu.Item>
              {/* <Menu.Item key="submission" style={{ background: '#73d13d' }}> Start Job </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              Content goes here
            </Content>
          </Layout>
        </Layout>

      </Layout>

    );
  }
}

export default App;
