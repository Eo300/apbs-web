import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload, Spin
        } from 'antd';
const { Content, Sider } = Layout;

/**
 * Component defining how the PDB2PQR job configuration page is rendered
 */
class ConfigPDB2PQR extends Component{

  constructor(props){
    super(props);
    this.state = {
      pdb_upload_hidden: true,
      ff_upload_hidden: true,
      mol2_upload_hidden: true,
      only_parse: false,
      no_NC_terminus: false,

      PDBSOURCE_value:      "ID",
      PH_value:             7,
      PKACALCMETHOD_value:  "propka",
      FF_value:             "parse",
      FFOUT_value:          "internal",
      OPTIONS_value:        [ 'atomsnotclose', 'optimizeHnetwork', 'makeapbsin' ],

      job_submit: false
    }
    // this.handleJobSubmit = this.handleJobSubmit.bind(this);
    this.changeFormValue = this.changeFormValue.bind(this)
    // this.renderConfigForm = this.renderConfigForm.bind(this)
  }

  /** Updates current state of form values when changed */
  changeFormValue = (e, nameString) => {
    let itemName  = (nameString === undefined) ? e.target.name : nameString;
    let itemValue = (e.target !== undefined) ? e.target.value : e;
    // let itemValue = e.target.value;
    // let itemName  = e.target.name;

    console.log(itemName +": "+ itemValue);
    switch(itemName){
      case "PDBSOURCE":
        this.setState({
          PDBSOURCE_value: itemValue
        });
        (itemValue == "UPLOAD") ? this.togglePdbUploadButton(true) : this.togglePdbUploadButton(false);
        break;

      case "PH":
        this.setState({
          PH_value: itemValue
        });
        break;

      case "PKACALCMETHOD":
        this.setState({
          PKACALCMETHOD_value: itemValue
        });
        (itemValue == "pdb2pka") ? this.toggleMustUseParse(true) : this.toggleMustUseParse(false);
        break;

      case "FF":
        this.setState({
          FF_value: itemValue
        });
        (itemValue != "parse")? this.toggleDisableForNoParse(true) : this.toggleDisableForNoParse(false);
        (itemValue == "user") ? this.toggleUserForcefieldUploadButton(true) : this.toggleUserForcefieldUploadButton(false);
        this.uncheckTerminusOptions()
        break;

      case "FFOUT":
        this.setState({
          FFOUT_value: itemValue
        });
        break;
        
      case "OPTIONS":
        this.setState({
          OPTIONS_value: itemValue
        });
        (itemValue.includes("assignfrommol2")) ? this.toggleMol2UploadButton(true) : this.toggleMol2UploadButton(false);
        (["neutralnterminus", "neutralcterminus"].some(opt=>itemValue.includes(opt))) ? this.toggleMustUseParse(true) : this.toggleMustUseParse(false);
        break;
    }
  }

  /** If user tries submitting job again, raise alert. */
  handleJobSubmit = (e) => {
    // e.preventDefault();
    if(this.state.job_submit)
      alert("Job is submitted. Redirecting to job status page");
    else{
      this.setState({
        job_submit: true
      })
    }
  }

  handlePdbSourceChoice = (e) => {
    // if ()
  }
  
  togglePdbUploadButton(show_upload){
    this.setState({
      pdb_upload_hidden: !show_upload
    });
  }
  toggleUserForcefieldUploadButton(show_upload){
    // console.log(this.state.ff_upload_hidden)
    this.setState({
      ff_upload_hidden: !show_upload
    });
  }
  toggleMol2UploadButton(show_upload){
    this.setState({
      mol2_upload_hidden: !show_upload
    });
  }

  toggleMustUseParse(do_disable){
    if(do_disable){
      this.setState({
        only_parse: do_disable,
        FF_value: "parse",
        ff_upload_hidden: true,
        no_NC_terminus: !do_disable
      })
    }
    this.setState({
      only_parse: do_disable,
    })
  }
  toggleDisableForNoParse(do_disable){
    this.setState({
      no_NC_terminus: do_disable
    })
    if(do_disable == false){
      this.uncheckTerminusOptions()
    }
  }

  uncheckTerminusOptions(){
      let new_OPTIONS = [];
      // this.state.OPTIONS_value.forEach()
      for(let element of this.state.OPTIONS_value){
        if( !["neutralnterminus", "neutralcterminus"].some(opt => {return element == opt;}) ){
          console.log(element);
          new_OPTIONS.push(element)
        }
      }
      this.setState({
        OPTIONS_value: new_OPTIONS
      }) 
  }
  // togglePdbUploadButton = (e) => {
  //   this.setState({
  //     pdb_upload_hidden: !this.state.pdb_upload_hidden
  //   })
  // }

  renderPdbUploadButton(){
    if(this.state.pdb_upload_hidden) return;
    else{
      return(
        <input type="file" name="PDB" accept=".pdb"/>
        )
    }
  }

  renderUserForcefieldUploadButton(){
    // console.log("hello world")
    if(this.state.ff_upload_hidden) { return; }
    else{
      return(
        <div>
          Forcefield file: <input type="file" name="USERFF" />
          Names file (*.names): <input type="file" name="USERNAMES" accept=".names" />
        </div>
      );
    }
  }
  
  renderMol2UploadButton(){
    if(this.state.mol2_upload_hidden) return;
    else{
      return(
        <input type="file" name="LIGAND"/>
      )
    }
  }


  /** Creates and returns the sidebar component. */
  renderSidebar(){
    return(
      <Affix offsetTop={80}>
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

  /** Submission button rendered by default. If submission button's pressed,
   *  button text changes with spinning icon to indicate data has been sent
   */
  renderSubmitButton(){
    if (!this.state.job_submit)
      return <Button type="primary" htmlType="submit"> Start Job </Button>
    else
      return <div><Button type="primary" htmlType="submit"> Submitting job... </Button>  <Spin hidden={!this.state.job_submit}/></div>
    
  }

  /** Creates and returns the PDB2PQR configuration form. */
  renderConfigForm(){
    /** Builds checkbox options for the Additional Options header */
    const additionalOptions = [
      {name: 'DEBUMP',      value: 'atomsnotclose',    label: 'Ensure that new atoms are not rebuilt too close to existing atoms',  disabled: false},
      {name: 'OPT',         value: 'optimizeHnetwork', label: 'Optimize the hydrogen bonding network',                              disabled: false},
      {name: 'LIGANDCHECK', value: 'assignfrommol2',   label: 'Assign charges to the ligand specified in a MOL2 file',              disabled: false},
      {name: 'INPUT',       value: 'makeapbsin',       label: 'Create an APBS input file',                                          disabled: false},
      {name: 'CHAIN',       value: 'keepchainids',     label: 'Add/keep chain IDs in the PQR file',                                 disabled: false},
      {name: 'WHITESPACE',  value: 'insertwhitespace', label: 'Insert whitespaces between atom name and residue name, between x and y, and between y and z', disabled: false},
      {name: 'TYPEMAP',     value: 'maketypemap',      label: 'Create Typemap output',                                              disabled: false},
      {name: 'NEUTRALN',    value: 'neutralnterminus', label: 'Make the protein\'s N-terminus neutral (requires PARSE forcefield)', disabled: this.state.no_NC_terminus, },
      {name: 'NEUTRALC',    value: 'neutralcterminus', label: 'Make the protein\'s C-terminus neutral (requires PARSE forcefield)', disabled: this.state.no_NC_terminus, },
      {name: 'DROPWATER',   value: 'removewater',      label: 'Remove the waters from the output file',                             disabled: false},
    ]     
    let optionChecklist = [];
    additionalOptions.forEach(function(element){
      if (element['name'] == 'LIGANDCHECK'){
        optionChecklist.push(
          <div>
            <Row>
              <Checkbox name={element['name']} value={element['value']}> {element['label']} </Checkbox>
              {this.renderMol2UploadButton()}
            </Row>
          </div>
        );
      }

      else{
        optionChecklist.push(
          <div>
            <Row><Checkbox name={element['name']} value={element['value']} disabled={element['disabled']}> {element['label']} </Checkbox></Row>
          </div>
        );
      }
    }.bind(this));

    /** Styling to have radio buttons appear vertical */
    const radioVertStyle = {
      display:    'block',
      height:     '25px',
      lineHeight: '30px',
    }

    const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess("ok");
      }, 0);
    };

    return(
      <Form action={window._env_.API_URL + "/jobstatus?submitType=pdb2pqr"} method="POST" onSubmit={this.handleJobSubmit} name="thisform" enctype="multipart/form-data">
      {/* <Form action={"http://localhost:7000/jobstatus?submitType=pdb2pqr"} method="POST" onSubmit={this.handleJobSubmit} name="thisform" enctype="multipart/form-data"> */}
      {/* <Form action="/jobstatus?submitType=pdb2pqr" method="POST" onSubmit={this.handleJobSubmit} name="thisform" enctype="multipart/form-data"> */}
      {/* <Form action="http://apbs-1328226216.us-west-2.elb.amazonaws.com/pdb2pqr.cgi" method="POST" onSubmit={this.handleJobSubmit} name="thisform"> */}

        {/** Form item for PDB Source (id | upload) */}
        <Form.Item
          // id="pdbid"
          label="PDB Source"
        >
          <Radio.Group name="PDBSOURCE" defaultValue={this.state.PDBSOURCE_value} onChange={this.changeFormValue}>
            <Radio style={radioVertStyle} value="ID"> PDB ID:&nbsp;&nbsp;
              <Input name="PDBID" autoFocus="True" placeholder="PDB ID" maxLength={4}/>
            </Radio>
            <Radio style={radioVertStyle} value="UPLOAD"> Upload a PDB file:&nbsp;&nbsp;
              {this.renderPdbUploadButton()}
              {/* <input type="file" name="PDB" accept=".pdb" hidden={this.state.pdb_upload_hidden}/> */}
              {/* <Row><Upload name="PDB" accept=".pdb" customRequest={dummyRequest} >
                <Button>
                  <Icon type="upload" >
                  </Icon> Click to upload
                </Button>
              </Upload></Row> */}
            </Radio>
          </Radio.Group>
        </Form.Item>
        
        {/** Form item for pKa option*/}
        <Form.Item
          // id="pka"
          label="pKa Options"
        >
          {/* <Switch checkedChildren="pKa Calculation" unCheckedChildren="pKa Calculation" defaultChecked={true} /><br/> */}
          pH: <InputNumber name="PH" min={0} max={14} step={0.5} defaultValue={this.state.PH_value} /><br/>
          <Radio.Group name="PKACALCMETHOD" defaultValue={this.state.PKACALCMETHOD_value} onChange={this.changeFormValue} >
            <Radio style={radioVertStyle} id="pka_none" value="none">    No pKa calculation </Radio>
            <Radio style={radioVertStyle} id="pka_propka" value="propka">  Use PROPKA to assign protonation states at provided pH </Radio>
            <Tooltip placement="right" title="requires PARSE forcefield">
              <Radio style={radioVertStyle} id="pka_pdb2pka" value="pdb2pka"> Use PDB2PKA to parametrize ligands and assign pKa values <b>(requires PARSE forcefield)</b> at provided pH </Radio>
            </Tooltip>
          </Radio.Group>
        </Form.Item>

        {/** Form item for forcefield choice */}
        <Form.Item
          id="forcefield"
          label="Please choose a forcefield to use"
        >
          <Radio.Group name="FF" value={this.state.FF_value} buttonStyle="solid" onChange={this.changeFormValue}>
            <Radio.Button disabled={this.state.only_parse} value="amber">  AMBER   </Radio.Button>
            <Radio.Button disabled={this.state.only_parse} value="charmm"> CHARMM  </Radio.Button>
            <Radio.Button disabled={this.state.only_parse} value="peoepb"> PEOEPB  </Radio.Button>
            <Radio.Button value="parse">  PARSE   </Radio.Button>
            <Radio.Button disabled={this.state.only_parse} value="swanson">SWANSON </Radio.Button>
            <Radio.Button disabled={this.state.only_parse} value="tyl06">  TYL06   </Radio.Button>
            <Radio.Button disabled={this.state.only_parse} value="user">   User-defined Forcefield </Radio.Button>
          </Radio.Group><br/>
          {this.renderUserForcefieldUploadButton()}
          {/* Forcefield file: <input type="file" name="USERFF" />
          Names file (*.names): <input type="file" name="USERNAMES" accept=".names" /> */}
        </Form.Item>

        {/** Form item for output scheme choice*/}
        <Form.Item
          id="outputscheme"
          label="Please choose an output naming scheme to use"
        >
          <Radio.Group name="FFOUT" defaultValue={this.state.FFOUT_value} buttonStyle="solid" onChange={this.changeFormValue}>
            <Radio.Button value="internal"> Internal naming scheme <Tooltip placement="bottomLeft" title="This is placeholder help text to tell the user what this option means"><Icon type="question-circle" /></Tooltip> </Radio.Button>
            <Radio.Button value="amber">  AMBER   </Radio.Button>
            <Radio.Button value="charmm"> CHARMM  </Radio.Button>
            <Radio.Button value="parse">  PARSE   </Radio.Button>
            <Radio.Button value="peoepb"> PEOEPB  </Radio.Button>
            <Radio.Button value="swanson">SWANSON </Radio.Button>
            <Radio.Button value="tyl06">  TYL06   </Radio.Button>
          </Radio.Group>
        </Form.Item>
        
        {/** Form item for choosing additional options (defined earlier) */}
        <Form.Item
          id="addedoptions"
          label="Additional Options"
        >
          <Checkbox.Group name="OPTIONS" value={this.state.OPTIONS_value} onChange={(e) => this.changeFormValue(e, "OPTIONS")}>
            {optionChecklist}
          </Checkbox.Group>
        </Form.Item>
        
        {/** Where the submission button lies */}
        <Form.Item>
          {this.renderSubmitButton()}
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
              {this.renderConfigForm()}
            </Content>
          </Layout>
        </Layout>    
    );
  }
}

export default ConfigPDB2PQR;