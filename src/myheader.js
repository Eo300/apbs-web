import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Layout, Col, Menu, } from 'antd';
const { Header } = Layout;

class MyHeader extends Component{
    render(){
      let all_header_items = [];
      this.props.navbar_items.forEach(function(value, k, map){
        // console.log(k)
        all_header_items.push(
          <Menu.Item onClick={() => this.props.onClick(k)} key={k}>{value}</Menu.Item>
        )
      });
  
      return(
        <Header>
        <Col offset='2'>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.props.activeItem]}
            // defaultSelectedKeys={["navbar_pdb2pqr"]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item onClick={() => this.props.onClick("navbar_home")} key="navbar_home"> Home </Menu.Item>
            <Menu.Item onClick={() => this.props.onClick("navbar_pdb2pqr")} key="navbar_pdb2pqr" href="#pdb2pqr"> PDB2PQR </Menu.Item>
            <Menu.Item onClick={() => this.props.onClick("navbar_apbs")} key="navbar_apbs"> APBS </Menu.Item>
            <Menu.Item onClick={() => this.props.onClick("navbar_about")} key="navbar_about"> About </Menu.Item>
          </Menu>
        </Col>
        </Header>
      );
    }
}

export default MyHeader;