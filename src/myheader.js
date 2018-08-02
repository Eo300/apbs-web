import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Link } from 'react-router-dom';

import { Layout, Col, Row, Menu, Icon } from 'antd';
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
      // <div style={{boxShadow: '2px 40px 10px #00000033' }}>
      <Row style={{boxShadow: '2px 4px 10px #00000033' }}>
      <Header >
        <Col offset='2'>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[this.props.activeItem]}
            // defaultSelectedKeys={["navbar_pdb2pqr"]}
            style={{ lineHeight: '64px' }}
          >
            {/* {all_header_items} */}
            {/* <Menu.Item onClick={() => this.props.onClick("navbar_home")} key="navbar_home" href="/"> Home </Menu.Item> */}
            {/* <Menu.Item onClick={() => this.props.onClick("navbar_pdb2pqr")} key="navbar_pdb2pqr" href="/pdb2pqr"> PDB2PQR </Menu.Item> */}
            {/* <Menu.Item onClick={() => this.props.onClick("navbar_apbs")} key="navbar_apbs" href="/apbs"> APBS </Menu.Item> */}
            {/* <Menu.Item onClick={() => this.props.onClick("navbar_about")} key="navbar_about" href="/about"> About </Menu.Item> */}


            <Menu.Item onClick={() => this.props.onClick("navbar_home")} key="navbar_home"> <Link to="/">Home</Link> </Menu.Item>
            {/* <Menu.Item onClick={() => this.props.onClick("navbar_pdb2pqr")} key="navbar_pdb2pqr"> <Link to="/pdb2pqr">PDB2PQR</Link> </Menu.Item>
            <Menu.Item onClick={() => this.props.onClick("navbar_apbs")} key="navbar_apbs"> <Link to="/apbs">APBS</Link> </Menu.Item> */}
            <Menu.Item onClick={() => this.props.onClick("navbar_about")} key="navbar_about"> <Link to="/about">About</Link> </Menu.Item>
            <Menu.SubMenu title={<span>Services&nbsp;&nbsp;<Icon type="down" /></span>}>
              <Menu.Item onClick={() => this.props.onClick("navbar_pdb2pqr")} key="navbar_pdb2pqr"> <Link to="/pdb2pqr">PDB2PQR</Link> </Menu.Item>
              <Menu.Item onClick={() => this.props.onClick("navbar_apbs")} key="navbar_apbs"> <Link to="/apbs">APBS</Link> </Menu.Item>
            </Menu.SubMenu>
            
          </Menu>
        </Col>
      </Header>
      </Row>
      //{/* </div> */}
    );
  }
}

export default MyHeader;