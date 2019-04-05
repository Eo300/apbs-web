import React, { Component } from 'react';
import 'antd/dist/antd.css';
import PAGES from './pagenames.js';

import { Link } from 'react-router-dom';

import { Layout, Col, Row, Menu, Icon, Affix } from 'antd';
const { Header } = Layout;

/**
 * This is the navbar component. Serves as header for every page
 */
class MyHeader extends Component{
  render(){

    // Uses passed navbar_items to fill the navbar (UNUSED)
    let all_header_items = [];
    this.props.navbar_items.forEach(function(value, k, map){
      // console.log(k)
      all_header_items.push(
        <Menu.Item onClick={() => this.props.onClick(k)} key={k}>{value}</Menu.Item>
      )
    }); 

    return(
      <Affix offsetTop={0}>
      <Row style={{boxShadow: '2px 4px 10px #00000033' }}>
      <Header >
        <Col offset='2'>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.props.activeItem]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item onClick={() => this.props.onClick(PAGES.home)} key={PAGES.home}> <Link to="/">Home</Link> </Menu.Item>
            {/* <Menu.Item onClick={() => this.props.onClick("navbar_pdb2pqr")} key="navbar_pdb2pqr"> <Link to="/pdb2pqr">PDB2PQR</Link> </Menu.Item>
            <Menu.Item onClick={() => this.props.onClick("navbar_apbs")} key="navbar_apbs"> <Link to="/apbs">APBS</Link> </Menu.Item> */}
            <Menu.Item onClick={() => this.props.onClick(PAGES.about)} key={PAGES.about}> <Link to="/about">About</Link> </Menu.Item>
            <Menu.Item onClick={() => this.props.onClick(PAGES.docs)} key={PAGES.docs}> <Link to="/documentation">Documentation</Link> </Menu.Item>
            <Menu.SubMenu key={PAGES.services} title={<span>Services&nbsp;&nbsp;<Icon type="down" /></span>}>
              <Menu.Item onClick={() => this.props.onClick(PAGES.pdb2pqr)} key={PAGES.pdb2pqr}> <Link to="/pdb2pqr">PDB2PQR</Link> </Menu.Item>
              <Menu.Item onClick={() => this.props.onClick(PAGES.apbs)} key={PAGES.apbs}> <Link to="/apbs">APBS</Link> </Menu.Item>
            </Menu.SubMenu>
            
          </Menu>
        </Col>
      </Header>
      </Row>
      </Affix>
    );
  }
}

export default MyHeader;