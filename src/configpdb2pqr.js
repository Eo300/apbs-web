import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
        } from 'antd';
const { Content, Sider } = Layout;

class ConfigPDB2PQR extends Component{
  handleJobSubmit = (e) => {
    // e.preventDefault();
    // <Alert message="Success Text" type="success" />
    this.setState({
      job_submit: true
    })
    if(this.state.job_submit)
      alert("submitted: hello world");
  }

  renderSidebar(){
    return(
      <Affix offsetTop={64}>
      {/* <Affix offsetTop={16}> */}
      <Sider width={200} style={{ background: '#ffffff' }}>
        <Menu
        // theme="dark"
        mode="inline"
        defaultSelectedKeys={['which_pdb']}
        style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="which_pdb"    ><a href="#pdbid">        PDB ID Entry </a></Menu.Item>
          <Menu.Item key="which_pka"    ><a href="#pka">          pKa Settings (optional) </a></Menu.Item>
          <Menu.Item key="which_ff"     ><a href="#forcefield">   Forcefield </a></Menu.Item>
          <Menu.Item key="which_output" ><a href="#outputscheme"> Output Naming Scheme </a></Menu.Item>
          <Menu.Item key="which_options"><a href="#addedoptions"> Additional Options </a></Menu.Item>
          {/* <Menu.Item key="submission"     href="#submission"> Start Job </Menu.Item> */}
          {/* <Menu.Item key="submission" style={{ background: '#73d13d' }}> Start Job </Menu.Item> */}
        </Menu>
      </Sider>
      </Affix>
    )
  }

  renderConfigForm(){
    const additionalOptions = [
      {name: 'DEBUMP',      value: 'atomsnotclose',    label: 'Ensure that new atoms are not rebuilt too close to existing atoms'},
      {name: 'OPT',         value: 'optimizeHnetwork', label: 'Optimize the hydrogen bonding network'},
      {name: 'LIGANDCHECK', value: 'assignfrommol2',   label: 'Assign charges to the ligand specified in a MOL2 file'},
      {name: 'INPUT',       value: 'makeapbsin',       label: 'Create an APBS input file'},
      {name: 'CHAIN',       value: 'keepchainids',     label: 'Add/keep chain IDs in the PQR file'},
      {name: 'WHITESPACE',  value: 'insertwhitespace', label: 'Insert whitespaces between atom name and residue name, between x and y, and between y and z'},
      {name: 'TYPEMAP',     value: 'maketypemap',      label: 'Create Typemap output'},
      {name: 'NEUTRALN',    value: 'neutralnterminus', label: 'Make the protein\'s N-terminus neutral (requires PARSE forcefield)'},
      {name: 'NEUTRALC',    value: 'neutralcterminus', label: 'Make the protein\'s C-terminus neutral (requires PARSE forcefield)'},
      {name: 'DROPWATER',   value: 'removewater',      label: 'Remove the waters from the output file'},
    ]

    let optionChecklist = []
    additionalOptions.forEach(function(element){
      optionChecklist.push(
        <div>
          <Row><Checkbox name={element['name']} value={element['value']}> {element['label']} </Checkbox></Row>
        </div>
      );
    });

    const radioVertStyle = {
      display:    'block',
      height:     '25px',
      lineHeight: '30px',
    }

    return(
      <Form action="/jobstatus" method="POST" onSubmit={this.handleJobSubmit} name="thisform" enctype="multipart/form-data">
      {/* <Form action="http://apbs-1328226216.us-west-2.elb.amazonaws.com/pdb2pqr.cgi" method="POST" onSubmit={this.handleJobSubmit} name="thisform"> */}
        {/* <div id="pdbid"> */}
        <Form.Item
          // id="pdbid"
          label="PDB Source"
          // label="Please enter a PDB ID"
          // label="Please enter a PDB ID or upload your own"
        >
          <Radio.Group name="PDBSOURCE" defaultValue="ID">
            <Radio style={radioVertStyle} value="ID"> PDB ID:&nbsp;&nbsp;
              <Input name="PDBID" autoFocus="True" placeholder="PDB ID" maxLength={4}/>
            </Radio>

            <Radio style={radioVertStyle} value="UPLOAD"> Upload a PDB file:&nbsp;&nbsp;
              {/* <Upload name="PDB" accept=".pdb"> */}
                <input type="file" name="PDB" accept=".pdb"/>
                {/* <Button>
                  <Icon type="upload" >
                  </Icon> Click to upload
                </Button> */}
              {/* </Upload> */}
            </Radio>
          </Radio.Group>
        </Form.Item>
        {/* </div> */}
        
        {/* <div id="pka"> */}
        <Form.Item
          // id="pka"
          label="pKa Options"
        >
          {/* <Switch checkedChildren="pKa Calculation" unCheckedChildren="pKa Calculation" defaultChecked={true} /><br/> */}
          pH: <InputNumber name="PH" min={0} max={14} step={0.5} defaultValue={7} /><br/>
          <Radio.Group name="PKACALCMETHOD" defaultValue="pka_propka" >
            <Radio style={radioVertStyle} value="pka_none">    No pKa calculation </Radio>
            <Radio style={radioVertStyle} value="pka_propka">  Use PROPKA to assign protonation states at provided pH </Radio>
            <Radio style={radioVertStyle} value="pka_pdb2pka"> Use PDB2PKA to parametrize ligands and assign pKa values (requires PARSE forcefield) at provided pH </Radio>
          </Radio.Group>

        </Form.Item>
        {/* </div> */}

        <Form.Item
          id="forcefield"
          label="Please choose a forcefield to use"
        >
          <Radio.Group name="FF" defaultValue="parse" buttonStyle="solid">
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
          <Radio.Group name="FFOUT" defaultValue="internal" buttonStyle="solid">
            <Radio.Button value="internal"> Internal naming scheme <Tooltip placement="bottomLeft" title="This is placeholder help text to tell the user what this option means"><Icon type="question-circle" /></Tooltip> </Radio.Button>
            <Radio.Button value="amber">  AMBER   </Radio.Button>
            <Radio.Button value="charmm"> CHARMM  </Radio.Button>
            <Radio.Button value="parse">  PARSE   </Radio.Button>
            <Radio.Button value="peoepb"> PEOEPB  </Radio.Button>
            <Radio.Button value="swanson">SWANSON </Radio.Button>
            <Radio.Button value="tyl06">  TYL06   </Radio.Button>
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
        
        <Form.Item>
          <Button type="primary" htmlType="submit">Start Job</Button>
        </Form.Item>
      </Form>
    )
  }
      
  render(){
    return(
      <Layout id="pdb2pqr" style={{ padding: '16px 0', background: '#fff', boxShadow: "2px 4px 10px #00000033" }}>
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

export default ConfigPDB2PQR;