import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
        } from 'antd';
const { Content, Sider } = Layout;

class JobStatus extends Component{
  // constructor(){
  //   super(props);
  //   // this.props.jobid
  // }

  renderJobStatus(){
    if(!this.props.jobid){
      return(
        <Layout>
          <h2>Missing jobid field</h2>
          <p>Your request URL is missing the jobid field</p>
          <p>Usage: /jobstatus?<b>jobid=JOBID</b> </p>
        </Layout>
      )
    }
    else{
      return(
        <Layout>
          Job ID from query string: {this.props.jobid}
        </Layout>
      )
    }
  }
      
  render(){
    return(
      <Layout id="pdb2pqr">
          <Content style={{ background: '#fff', padding: 16, marginBottom: 5, minHeight: 280, boxShadow: "2px 4px 10px #00000033" }}>
          {/* <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}> */}
            {/* Content goes here */}
            {this.renderJobStatus()}
        </Content>
      </Layout>    
    );
  }
}

export default JobStatus;