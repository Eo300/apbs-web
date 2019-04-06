import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
          Collapse
        } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
const { Content, Sider } = Layout;
const Panel = Collapse.Panel;

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

  /** 
   * renderDropdown(panelHeader =string, options =array)
   *    panelHeader:  string to display on the header field of Panel component
   *    options:      array collection of form objects to display within Panel
   */
  renderCollapsePanel(panelHeader, optionObjs){
    // for (option of optionObjs){

    // }
    return(
      <Panel header={panelHeader} forceRender={true}>
        {optionObjs}
      </Panel>
    );
  }

  renderOutputFormat(){
    let header = 'FORMAT TO WRITE DATA:';
    let outputNameField = 'writeformat';
    let radioOptions = [];
    let outputOptions = 
      { 'dx'  : 'OpenDX', 
        'avs' : 'AVS UCD',
        'uhbd': 'UBHD'
      };

    for (let optVal in outputOptions){
      radioOptions.push(
        <Radio value={optVal}> {outputOptions[optVal]} </Radio>
      )
    }
    let outputGroup = 
      <RadioGroup name={outputNameField}> {radioOptions} </RadioGroup>
    ;

    return this.renderCollapsePanel(header, outputGroup);
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
        {/** Choose the calculation type */}
        <Form.Item label='Calculation Type'>
        </Form.Item>


        {/** Choose format of the data output */}
        <Form.Item label='Output'>
          <Collapse>
            {this.renderOutputFormat()}
          </Collapse>
        </Form.Item>

        {/** Where the submission button lies */}
        <Form.Item>
          <Button type="primary" htmlType="submit">Start Job</Button>
        </Form.Item>
      </Form>
    )
  }
      
  render(){
    return(
      <Layout id="apbs" style={{ padding: '16px 0', marginBottom: 5, background: '#fff', boxShadow: "2px 4px 10px #00000033" }}>
          {/* {this.renderSidebar()} */}
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