import React, { Component } from 'react';
import 'antd/dist/antd.css';
import PAGES from './pagenames.js';

import { Link } from 'react-router-dom';

import { Layout, Col, Row, Menu, Icon, Affix, Input } from 'antd';

const { Header, Sider } = Layout;
const Search = Input.Search;

/**
 * This is the navbar component. Serves as header for every page
 */
class MyHeader extends Component{
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed, type) => {
    console.log(collapsed, type);
    this.setState({ collapsed });
  };  

  render(){

    let sider_header = 
      <Sider
        collapsible
        breakpoint="lg"
        // collapsedWidth="1"
        onCollapse={this.onCollapse}
      >
        <Menu
          theme="dark"
          // mode="horizontal"
          // mode="inline"
          defaultSelectedKeys={[this.props.activeItem]}
          style={{ lineHeight: '64px' }}
        >
          
          <Menu.Item  name={PAGES.home} onClick={() => this.props.onClick(PAGES.home)} key={PAGES.home}>
            <Link to="/">
              <Icon type="home"/>
              <span>Home</span>
            </Link>
          </Menu.Item>
          <Menu.SubMenu 
            name={PAGES.tools}
            key={PAGES.tools}
            title={
              <span>
                <Icon type="experiment" />
                <span> Tools </span>
              </span>
            }>
            <Menu.Item  name={PAGES.pdb2pqr} key={PAGES.pdb2pqr} onClick={() => this.props.onClick(PAGES.pdb2pqr)}> <Link to="/pdb2pqr">PDB2PQR</Link> </Menu.Item>
            <Menu.Item  name={PAGES.apbs}    key={PAGES.apbs}    onClick={() => this.props.onClick(PAGES.apbs)}> <Link to="/apbs">APBS</Link> </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item  name={PAGES.about}         onClick={() => this.props.onClick(PAGES.about)}         key={PAGES.about}>         
            <Link to="/about">
              <Icon type="team"/>
              <span>About</span>
            </Link> 
          </Menu.Item>
          <Menu.Item  name={PAGES.documentation} onClick={() => this.props.onClick(PAGES.documentation)} key={PAGES.documentation}> 
            <Link to="/documentation">
              <Icon type="book"/>
              <span>Documentation</span>
            </Link> 
          </Menu.Item>

        </Menu>
      </Sider>

    // Uses passed navbar_items to fill the navbar (UNUSED)
    let all_header_items = [];
    this.props.navbar_items.forEach(function(value, k, map){
      // console.log(k)
      all_header_items.push(
        <Menu.Item onClick={() => this.props.onClick(k)} key={k}>{value}</Menu.Item>
      )
    }); 

    let affixed_header = 
      <Affix offsetTop={0}>
        <Row style={{boxShadow: '2px 4px 10px #00000033' }}>
        <Header >
          <Col offset={2}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={[this.props.activeItem]}
              style={{ lineHeight: '64px' }}
            >
              {/* <Menu.Item>
                <Col  width={4}>
                  <Search
                    placeholder='Search Job ID'
                    style={{width: 200}}
                  />
                </Col>
              </Menu.Item> */}
              
              <Menu.Item  name={PAGES.home}          onClick={() => this.props.onClick(PAGES.home)}          key={PAGES.home}>          <Link to="/">Home</Link> </Menu.Item>
              <Menu.SubMenu name={PAGES.tools}   key={PAGES.tools}   title={<span>Tools&nbsp;&nbsp;<Icon type="down" /></span>}>
                <Menu.Item  name={PAGES.pdb2pqr} key={PAGES.pdb2pqr} onClick={() => this.props.onClick(PAGES.pdb2pqr)}> <Link to="/pdb2pqr">PDB2PQR</Link> </Menu.Item>
                <Menu.Item  name={PAGES.apbs}    key={PAGES.apbs}    onClick={() => this.props.onClick(PAGES.apbs)}> <Link to="/apbs">APBS</Link> </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item  name={PAGES.about}         onClick={() => this.props.onClick(PAGES.about)}         key={PAGES.about}>         <Link to="/about">About</Link> </Menu.Item>
              <Menu.Item  name={PAGES.documentation} onClick={() => this.props.onClick(PAGES.documentation)} key={PAGES.documentation}> <Link to="/documentation">Documentation</Link> </Menu.Item>
              
              
              {/* <Menu.Item  name={PAGES.home}          onClick={() => this.props.onClick(PAGES.home)}          href="/" key={PAGES.home}>          Home </Menu.Item>
              <Menu.Item  name={PAGES.about}         onClick={() => this.props.onClick(PAGES.about)}         href="/about" key={PAGES.about}>         About </Menu.Item>
              <Menu.Item  name={PAGES.documentation} onClick={() => this.props.onClick(PAGES.documentation)} href="/documentation" key={PAGES.documentation}> Documentation </Menu.Item>
              
              <Menu.SubMenu name={PAGES.tools}   key={PAGES.tools}   title={<span>Tools&nbsp;&nbsp;<Icon type="down" /></span>}>
                <Menu.Item  name={PAGES.pdb2pqr} key={PAGES.pdb2pqr} href="/pdb2pqr" onClick={() => this.props.onClick(PAGES.pdb2pqr)}> PDB2PQR </Menu.Item>
                <Menu.Item  name={PAGES.apbs}    key={PAGES.apbs}    href="/apbs" onClick={() => this.props.onClick(PAGES.apbs)}> APBS </Menu.Item>
              </Menu.SubMenu> */}

            </Menu>
          </Col>
        </Header>
        </Row>
      </Affix>


    return(
      <div>
        {affixed_header}
        {/* {sider_header} */}
      </div>
    );
  }
}

export default MyHeader;