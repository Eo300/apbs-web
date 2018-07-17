import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber
        } from 'antd';
const { Content, Sider } = Layout;

class ConfigPDB2PQR extends Component{
  renderSidebar(){
    return(
      <Affix offsetTop={10}>
      <Sider width={200} style={{ background: '#ffffff' }}>
        <Menu
        // theme="dark"
        mode="inline"
        defaultSelectedKeys={['which_pdb']}
        style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="which_pdb"    ><a href="#pdbid">        PDB ID Entry </a></Menu.Item>
          <Menu.Item key="which_ff"     ><a href="#forcefield">   Forcefield </a></Menu.Item>
          <Menu.Item key="which_output" ><a href="#outputscheme"> Output Naming Scheme </a></Menu.Item>
          <Menu.Item key="which_options"><a href="#addedoptions"> Additional Options </a></Menu.Item>
          <Menu.Item key="which_pka"    ><a href="#pka">          pKa Settings (optional) </a></Menu.Item>
          {/* <Menu.Item key="submission"     href="#submission"> Start Job </Menu.Item> */}
          {/* <Menu.Item key="submission" style={{ background: '#73d13d' }}> Start Job </Menu.Item> */}
        </Menu>
      </Sider>
      </Affix>
    )
  }

  renderConfigForm(){
    const additionalOptions = [
      {label: 'Ensure that new atoms are not rebuilt too close to existing atoms', value: 'atomsnotclose'},
      {label: 'Optimize the hydrogen bonding network', value: 'optimizeHnetwork'},
      {label: 'Assign charges to the ligand specified in a MOL2 file', value: 'assignfrommol2'},
      {label: 'Create an APBS input file', value: 'makeapbsin'},
      {label: 'Add/keep chain IDs in the PQR file', value: 'keepchainids'},
      {label: 'Insert whitespaces between atom name and residue name, between x and y, and between y and z', value: 'insertwhitespace'},
      {label: 'Create Typemap output', value: 'maketypemap'},
      {label: 'Make the protein\'s N-terminus neutral (requires PARSE forcefield)', value: 'neutralnterminus'},
      {label: 'Make the protein\'s C-terminus neutral (requires PARSE forcefield)', value: 'neutralcterminus'},
      {label: 'Remove the waters from the output file', value: 'removewater'},
    ]

    let optionChecklist = []
    additionalOptions.forEach(function(element){
      optionChecklist.push(
        <div>
          <Row><Checkbox value={element['value']}> {element['label']} </Checkbox></Row>
        </div>
      );
    });

    return(
      <Form>
        <div id="pdbid">
        <Form.Item
          // id="pdbid"
          label="PDB Source"
          // label="Please enter a PDB ID"
          // label="Please enter a PDB ID or upload your own"
        >
          <Col span={2}><Input autoFocus="True" placeholder="PDB ID" maxLength={4}/></Col>
        </Form.Item>
        </div>
        
        <Form.Item
          id="forcefield"
          label="Please choose a forcefield to use"
        >
          <Radio.Group defaultValue="parse" buttonStyle="solid">
            <Radio.Button value="amber">  AMBER   </Radio.Button>
            <Radio.Button value="charmm"> CHARMM  </Radio.Button>
            <Radio.Button value="parse">  PARSE   </Radio.Button>
            <Radio.Button value="peoepb"> PEOEPB  </Radio.Button>
            <Radio.Button value="swanson">SWANSON </Radio.Button>
            <Radio.Button value="tyl06">  TYL06   </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          id="outputscheme"
          label="Please choose an output naming scheme to use"
        >
          <Radio.Group defaultValue="internal" buttonStyle="solid">
            <Radio.Button value="amber">  AMBER   </Radio.Button>
            <Radio.Button value="charmm"> CHARMM  </Radio.Button>
            <Radio.Button value="parse">  PARSE   </Radio.Button>
            <Radio.Button value="peoepb"> PEOEPB  </Radio.Button>
            <Radio.Button value="swanson">SWANSON </Radio.Button>
            <Radio.Button value="tyl06">  TYL06   </Radio.Button>
            <Radio.Button value="internal"> Internal naming scheme   </Radio.Button>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item
          id="addedoptions"
          label="Additional Options"
        >
          <Checkbox.Group
            // options={additionalOptions}
            defaultValue={[ 'atomsnotclose', 'optimizeHnetwork', 'makeapbsin' ]}
          >
            {optionChecklist}
            {/* <Row><Checkbox value='atomsnotclose'>     Ensure that new atoms are not rebuilt too close to existing atoms</Checkbox></Row>
            <Row><Checkbox value='optimizeHnetwork'>  Optimize the hydrogen bonding network</Checkbox></Row>
            <Row><Checkbox value='assignfrommol2'>    Assign charges to the ligand specified in a MOL2 file</Checkbox></Row>
            <Row><Checkbox value='makeapbsin'>        Create an APBS input file</Checkbox></Row>
            <Row><Checkbox value='keepchainids'>      Add/keep chain IDs in the PQR file</Checkbox></Row>
            <Row><Checkbox value='insertwhitespace'>  Insert whitespaces between atom name and residue name, between x and y, and between y and z</Checkbox></Row>
            <Row><Checkbox value='maketypemap'>       Create Typemap output</Checkbox></Row>
            <Row><Checkbox value='neutralnterminus'>  Make the protein's N-terminus neutral (requires PARSE forcefield)</Checkbox></Row>
            <Row><Checkbox value='neutralcterminus'>  Make the protein's C-terminus neutral (requires PARSE forcefield)</Checkbox></Row>
            <Row><Checkbox value='removewater'>       Remove the waters from the output file</Checkbox></Row> */}

          </Checkbox.Group>
        </Form.Item>
        <div id="pka">
        <Form.Item
          // id="pka"
          label="pKa Options"
        >
          <Switch checkedChildren="pKa Calculation" unCheckedChildren="pKa Calculation" defaultChecked={true} /><br/>
          pH: <InputNumber min={0} max={14} step={0.5} defaultValue={7} />

        </Form.Item>
        </div>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">Start Job</Button>
        </Form.Item>
      </Form>
    )
  }
      
  render(){
    return(
      <Layout id="pdb2pqr">
          {this.renderSidebar()}
          <Layout>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              {/* Content goes here */}
              {this.renderConfigForm()}
            </Content>
          </Layout>
        </Layout>    
    );
  }
}

export default ConfigPDB2PQR;