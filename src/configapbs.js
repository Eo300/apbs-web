import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
        } from 'antd';
const { Content, Sider } = Layout;

/**
 * Component defining how the APBS job configuration page is rendered
 */
class ConfigAPBS extends Component{

  /** Creates and returns the sidebar component. */
  renderSidebar(){
    return(
      <Affix offsetTop={80}>
        <Sider width={200} style={{ background: '#ffffff' }}>
          <Menu
          // theme="dark"
          mode="inline"
          defaultSelectedKeys={['which_pdb']}
          style={{ height: '100%', borderRight: 0 }}
          >

          </Menu>
        </Sider>
      </Affix>
    )
  }

  /** Creates and returns the APBS configuration form.
   * @todo Create the submission form using APBS config from http://nbcr-222.ucsd.edu/pdb2pqr_2.1.1/ as a template 
   */
  renderConfigForm(){

    // let optionChecklist = []
    // additionalOptions.forEach(function(element){
    //   optionChecklist.push(
    //     <div>
    //       <Row><Checkbox name={element['name']} value={element['value']}> {element['label']} </Checkbox></Row>
    //     </div>
    //   );
    // });

    /** Styling to have radio buttons appear vertical */
    const radioVertStyle = {
      display:    'block',
      height:     '25px',
      lineHeight: '30px',
    }

    return(
      <Form action="/jobstatus?submitType=apbs" method="POST" onSubmit={this.handleJobSubmit} name="thisform" enctype="multipart/form-data">
        
        {/** Where the submission button lies */}
        <Form.Item>
          <Button type="primary" htmlType="submit">Start Job</Button>
        </Form.Item>
      </Form>
    )
  }
      
  render(){
    return(
      <Layout id="pdb2pqr" style={{ padding: '16px 0', marginBottom: 5, background: '#fff', boxShadow: "2px 4px 10px #00000033" }}>
          {this.renderSidebar()}
          <Layout>
            <Content style={{ background: '#fff', padding: 16, margin: 0, minHeight: 280 }}>
              {/* Content goes here */}
              {this.renderConfigForm()}
            </Content>
          </Layout>
        </Layout>    
    );
  }
}

export default ConfigAPBS;