import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
          Collapse, Spin, message
        } from 'antd';
// import Radio.Group from 'antd/lib/radio/group';
import ConfigForm from './utils/formutils';
import { MgAuto, MgPara, MgManual, FeManual, MgDummy
       } from './apbs/calculationtypes';

const { Content, Sider } = Layout;
const Panel = Collapse.Panel;

/**
 * Component defining how the APBS job configuration page is rendered
 */
class ConfigAPBS extends ConfigForm {

  constructor(props){
    super(props);
    this.state = {
      allCollapsed : true,
      
      /** state variables related to PQR upload */
      jobid: this.props.jobid,


      /**
       elec_calctype: 'mg-auto',
       calculate_energy: 'total',
       calculate_forces: 'no',
       output_scalar: [],
       output_format: 'dx',
      */

      read_type: 'mol',

      type: 'mg-auto',
      calcenergy: 'total',
      calcforce: 'no',
      output_scalar: ['writepot'],
      writeformat: 'dx',

      autofill_data: {},
  
      /** Hidden element holdovers from original website */
      hiddencheck: 'local',
      // pdb2pqrid: null,
      mol: '1',
    }
    // this.handleFormChange = this.handleFormChange.bind(this)
    // this.handlePqrUpload = this.handlePqrUpload.bind(this);
    // this.calc_method_component = this.renderMethodFormItems();
  }

  componentDidMount(){
    if(this.props.jobid){
      this.fetchAutofillData(this.state.jobid)
      this.setState({ to_fill: false })

      // console.log('jobid: '+ this.props.jobid)
      // let server_domain = window._env_.API_URL;
      // console.log(server_domain.concat('/api/autofill/jobs/apbs/',this.props.jobid))

      // // let immediateObj = setImmediate(function(){
      //   fetch(server_domain.concat('/api/autofill/jobs/apbs/',this.props.jobid))
      //     .then(response => response.json())
      //     .then(data => {
      //       this.setState({
      //         autofill_data: data
      //       })
      //       // for(let key in data){
      //       //   console.log(key.concat(':\n    ', data[key],'\n'))
      //       // }
      //     })
      //     .catch(error => console.error(error));
      // });
    }
  }

  fetchAutofillData(jobid){
    let self = this
    let server_domain = window._env_.API_URL;

    console.log('jobid: '+ jobid)
    console.log('comp: ')
    // console.log(self.calc_method_component)
    // this.calc_method_component = this.renderMethodFormItems()
    console.log(server_domain.concat('/api/autofill/jobs/apbs/',jobid))

    fetch(server_domain.concat('/api/autofill/jobs/apbs/',jobid))
      .then(response => response.json())
      .then(data => {
        self.setState({
          autofill_data: data
        })
        // for(let key in data){
        //   console.log(key.concat(':\n    ', data[key],'\n'))
        // }
        console.log(data)
      })
      .catch(error => console.error(error));
  }

  /** Updates current state of form values when changed */
  handleFormChange = (e, nameString) => {
    let itemName  = (nameString === undefined) ? e.target.name : nameString;
    let itemValue = (e.target !== undefined) ? e.target.value : e;
    console.log('itemName:  ' + itemName)
    console.log('itemValue: ' + itemValue)
    this.setState({
      [itemName] : itemValue
    })
  }

  /** Creates button to upload a PQR file to use as base for  */
  renderPqrUpload(){

    return(
      <Form.Item label="Autofill with PQR file">
        <Upload
          name='file'
          accept='.pqr'
          action={window._env_.API_URL+'/api/upload/autofill/pqr'}
          // action={'http://jsonplaceholder.typicode.com/posts/'}
          onChange={ (e) => this.handlePqrUpload(e, this)}
        >
          <Button icon="upload">
            Click to Upload PQR File
          </Button>
        </Upload>
      </Form.Item>
    )
  }
  handlePqrUpload(info, self){
    if (info.file.status !== 'uploading') {
      console.log('uploading')
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      console.log(`${info.file.name} file uploaded successfully`)
      console.log(info)
      console.log('jobid (pre-upload):  '+self.state.jobid)
      self.setState({
        jobid: info.file.response['job_id']
      })
      console.log('jobid (post-upload): '+self.state.jobid)
      self.fetchAutofillData(this.state.jobid);
      this.setState({ to_fill: false })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

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
    return(
      <Panel header={panelHeader} isActive={true} forceRender={true}>
        {optionObjs}
      </Panel>
    );
  }

  renderCalcChoices(){
    let header = 'CALCULATION METHOD TO USE:';
    let outputNameField = 'type';
    let radioOptions = [];
    let outputOptions = 
      {
        'mg-auto'   : 'mg-auto',
        'mg-para'   : 'mg-para',
        'mg-manual' : 'mg-manual',
        'fe-manual' : 'fe-manual',
        'mg-dummy'  : 'mg-dummy',
      }

      for (let optVal in outputOptions){
        radioOptions.push(
          <Radio.Button value={optVal}> {outputOptions[optVal]} </Radio.Button>
        )
      }
      let outputGroup = 
        <Radio.Group name={outputNameField} defaultValue={this.state.type} onChange={this.handleFormChange} buttonStyle='solid'> {radioOptions} </Radio.Group>
      ;
  
      // return this.renderCollapsePanel(header, outputGroup);
      return outputGroup;
  }

  /** Renders the majority of the configuration options depending calculation method in use.
   * 
   *  The variable components of configuring each form is delegated to
   *  separate class files, with the intent to keep the form setups separated
   */
  renderMethodFormItems(){
    console.log("Calculation Method Type: " + this.state.type)
    switch(this.state.type){
      case "mg-auto":
        return <MgAuto   autofill={this.state.autofill_data} />

      case "mg-para":
        return <MgPara   autofill={this.state.autofill_data} />

      case "mg-manual":
        return <MgManual autofill={this.state.autofill_data} />

      case "fe-manual":
        return <FeManual autofill={this.state.autofill_data} />

      case "mg-dummy":
        return <MgDummy  autofill={this.state.autofill_data} />
    }
  }

  renderCalcEnergy(){
    let header = 'CALCULATION OF ELECTROSTATIC ENERGY FROM A PBE CALCULATION:';
    let outputNameField = 'calcenergy';
    let radioOptions = [];
    let outputOptions = 
      { 'no'   : 'Don\'t calculate any energies', 
        'total': 'Calculate and return total electrostatic energy for the entire molecule',
        'comps': 'Calculate and return total electrostatic energy for the entire molecule as well as energy components for each atom'
      };

    for (let optVal in outputOptions){
      radioOptions.push(
        <Radio style={this.radioVertStyle} value={optVal}> {outputOptions[optVal]} </Radio>
      )
    }
    let outputGroup = 
      <Radio.Group name={outputNameField} defaultValue={this.state.calcenergy} onChange={this.handleFormChange}> {radioOptions} </Radio.Group>
    ;

    return this.renderCollapsePanel(header, outputGroup);
  }


  renderCalcForces(){
    let header = 'CALCULATION OF ELECTROSTATIC AND APOLAR FORCE OUTPUTS FROM A PBE CALCULATION:';
    let outputNameField = 'calcforce';
    let radioOptions = [];
    let outputOptions = 
      { 'no'   : 'Don\'t calculate any forces', 
        'total': 'Calculate and return total electrostatic and apolar forces for the entire molecule',
        'comps': 'Calculate and return total electrostatic and apolar forces for the entire molecule as well as force components for each atom'
      };

    for (let optVal in outputOptions){
      radioOptions.push(
        <Radio style={this.radioVertStyle} value={optVal}> {outputOptions[optVal]} </Radio>
      )
    }
    let outputGroup = 
      <Radio.Group name={outputNameField} defaultValue={this.state.calcforce} onChange={this.handleFormChange}> {radioOptions} </Radio.Group>
    ;

    return this.renderCollapsePanel(header, outputGroup);
  }

  renderOutputScalar(){
    let header = 'OUTPUT OF SCALAR DATA CALCULATED DURING THE PB RUN:';
    let outputNameField = 'output_scalar';
    let checkboxOptions = [];
    let outputOptions = 
      { 
        // 'dx'  : 'OpenDX', 
        // 'avs' : 'AVS UCD',
        // 'uhbd': 'UBHD',

        'writecharge': 'Write out the biomolecular charge distribution in units of ec (multigrid only)',
        'writepot'   : 'Write out the electrostatic potential in units of kbT/ec (multigrid and finite element)',
        'writesmol'  : 'Write out the solvent accessibility defined by the molecular surface definition',
        'writesspl'  : 'Write out the spline-based solvent accessibility',
        'writevdw'   : 'Write out the van der Waals-based solvent accessibility',
        'writeivdw'  : 'Write out the inflated van der Waals-based ion accessibility',
        'writelap'   : 'Write out the Laplacian of the potential in units of kBT/ec/A2 (multigrid only)',
        'writeedens' : 'Write out the "energy density" in units of kBT/ec/A2 (multigrid only)',
        'writendens' : 'Write out the mobile ion number density for m ion species in units of M (multigrid only)',
        'writegdens' : 'Write out the mobile charge density for m ion species in units of e\u209C\u1d9c M (multigrid only)',
        'writedielx' : 'Write out the dielectric map shifted by 1/2 grid spacing in the x-direction',
        'writediely' : 'Write out the dielectric map shifted by 1/2 grid spacing in the y-direction',
        'writedielz' : 'Write out the dielectric map shifted by 1/2 grid spacing in the z-direction',
        'writekappa' : 'Write out the ion-accessibility kappa map',
      };

    for (let optVal in outputOptions){
      checkboxOptions.push(
        <Checkbox style={this.radioVertStyle} name={optVal} value={optVal}> {outputOptions[optVal]} </Checkbox>
      )
    }
    let outputGroup = 
      <Checkbox.Group name={outputNameField} value={this.state.output_scalar} onChange={(e) => this.handleFormChange(e, outputNameField)}> {checkboxOptions} </Checkbox.Group>
    ;

    return this.renderCollapsePanel(header, outputGroup);
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
      <Radio.Group name={outputNameField} defaultValue={this.state.writeformat} onChange={this.handleFormChange}> {radioOptions} </Radio.Group>
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

    // this.calc_method_component = this.renderMethodFormItems();

    return(
      <Form action={window._env_.API_URL + "/jobstatus?submitType=apbs"} method="POST" onSubmit={this.handleJobSubmit} name="thisform" encType="multipart/form-data">
        {/** Load data from PQR file */}
        {this.renderPqrUpload()}

        {/** Choose the calculation method */}
        <Form.Item label='Calculation Type'>
          {/* <Collapse> */}
            {this.renderCalcChoices()}
          {/* </Collapse> */}
        </Form.Item>

        {/** Choose calculation method-specific options */}
        {/* {this.calc_method_component} */}
        {this.renderMethodFormItems()}
        {/* <Form.Item label='Remove water from calculations and visualizations'>
          <Switch name='removewater' value='on'/>
        </Form.Item> */}

        {/** Choose whether to calculate electrostatic energy from PBE calculation */}
        <Form.Item label='Energy Calculations'>
          <Collapse>
            {this.renderCalcEnergy()}
          </Collapse>
        </Form.Item>

        {/** Choose whether to calculate electrostatic and apolar forces from PBE calculation */}
        <Form.Item label='Force Calculations'>
          <Collapse>
            {this.renderCalcForces()}
          </Collapse>
        </Form.Item>

        {/** Choose output of scalar data */}
        <Form.Item label='Scalar data output'>
          <Collapse>
            {this.renderOutputScalar()}
          </Collapse>
        </Form.Item>

        {/** Choose format of the data output */}
        <Form.Item label='Output'>
          <Collapse>
            {this.renderOutputFormat()}
          </Collapse>
        </Form.Item>

        {/** Where the submission button lies */}
        <Form.Item>
          <Col offset={20}>
          <Affix offsetBottom={100}>
            {this.renderSubmitButton()}
          </Affix>
          </Col>
        </Form.Item>

        {/** Hidden element holdovers from original website */}
        {/**   obscure to server-side later */}
        <input type='hidden' name='hiddencheck' value={this.state.hiddencheck} />
        <input type='hidden' name='pdb2pqrid' value={this.state.jobid} />
        <input type='hidden' name='mol' value={this.state.mol} />
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