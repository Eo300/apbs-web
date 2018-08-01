import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
        } from 'antd';
const { Content, Sider } = Layout;

class ConfigPDB2PQR extends Component{
  renderJobStatus(){
    return(
      <Layout>
      </Layout>
    )
  }
      
  render(){
    return(
      <Layout id="pdb2pqr">
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {/* Content goes here */}
            {this.renderJobStatus()}
        </Content>
      </Layout>    
    );
  }
}

export default ConfigPDB2PQR;