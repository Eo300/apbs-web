import React, {Component} from 'react';
import 'antd/dist/antd.css'
import  { Radio, Form, Collapse, Switch, Input, InputNumber, Col, Row, 
} from 'antd';
import CalctypeBase from './calctypebase';

const Panel = Collapse.Panel;

class MgAuto extends CalctypeBase{
  constructor(props){
    super(props);
    this.state = {
      removewater : 'on',
      cgcent      : 'mol',
      fgcent      : 'mol',
      solvetype   : 'lpbe',
      bcfl        : 'sdh',
      chgm        : 'spl2',
      srfm        : 'smol',
      pdie        : '',
      sdie        : '',
      sdens       : '',
      
      dimenx      : '',
      dimeny      : '',
      dimenz      : '',
      fglenx      : '',
      fgleny      : '',
      fglenz      : '',
      cglenx      : '',
      cgleny      : '',
      cglenz      : '',

      charge0     : '',
      charge1     : '',
      charge2     : '',
      conc0       : '',
      conc1       : '',
      conc2       : '',
      radius0     : '',
      radius1     : '',
      radius2     : '',

      // Values filled in by APBS fetch request
      // temp : this.props.autofill.temperature

    }

    this.formItemLayout = {
     labelCol: { span: 7 },
     wrapperCol: { span: 12 },
   };
  }

  handleFormChange = (e, nameString) => {
    let itemName  = (nameString === undefined) ? e.target.name : nameString;
    let itemValue = (e.target !== undefined) ? e.target.value : e;
    console.log('itemName:  ' + itemName)
    console.log('itemValue: ' + itemValue)
    this.setState({
      [itemName] : itemValue
    })
  }

  renderGridPointsDomain(){
    return(
      <Col offset={4}>
        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>Grid Points Per Processor </Col>
          <Col  span={6}>Coarse Mesh Domain Lengths </Col>
          <Col  span={6}>Fine Mesh Domain Lengths</Col>
        </Row>
        
        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>{this.renderNumericalField('X-direction','dimenx')}</Col>
          <Col  span={6}>{this.renderNumericalField('X-direction','cglenx')}</Col>
          <Col  span={6}>{this.renderNumericalField('X-direction','fglenx')}</Col>
        </Row>
        
        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>{this.renderNumericalField('Y-direction','dimeny')}</Col>
          <Col  span={6}>{this.renderNumericalField('Y-direction','cgleny')}</Col>
          <Col  span={6}>{this.renderNumericalField('Y-direction','fgleny')}</Col>
        </Row>

        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>{this.renderNumericalField('Z-direction','dimenz')}</Col>
          <Col  span={6}>{this.renderNumericalField('Z-direction','cglenz')}</Col>
          <Col  span={6}>{this.renderNumericalField('Z-direction','fglenz')}</Col>
        </Row>
      </Col>
    )
  }

  renderCoarseGrid(){
    let inputFields = null;
    if (this.state.cgcent == 'mol'){
      inputFields = <Input name='cgcentid' placeholder='Molecule ID' onChange={this.handleFormChange}/>
    }
    else if(this.state.cgcent == 'coord'){
      inputFields = 
        <div>
          <Input name='cgxcent' placeholder='x-coordinate' onChange={this.handleFormChange}/>
          <Input name='cgycent' placeholder='y-coordinate' onChange={this.handleFormChange}/>
          <Input name='cgzcent' placeholder='z-coordinate' onChange={this.handleFormChange}/>
        </div>
    }

    return(
      <div>
        <Row>
          <Radio.Group name='cgcent' buttonStyle='solid' defaultValue={this.state.cgcent} onChange={this.handleFormChange}>
            <Radio.Button value='mol'> Center grid on a molecule</Radio.Button>
            <Radio.Button value='coord'> Manually enter coordinates for center of grid</Radio.Button>
          </Radio.Group>
        </Row>
        <Row>
          <Col span={4}>
            {inputFields}
          </Col>
        </Row>
      </div>
    )
  }

  renderFineGrid(){
    let inputFields = null;
    if (this.state.fgcent == 'mol'){
      inputFields = <Input name='fgcentid' placeholder='Molecule ID' onChange={this.handleFormChange}/>
    }
    else if(this.state.fgcent == 'coord'){
      inputFields = 
        <div>
          <Input name='fgxcent' placeholder='x-coordinate' defaultValue={this.state.fgxcent} onChange={this.handleFormChange}/>
          <Input name='fgycent' placeholder='y-coordinate' defaultValue={this.state.fgycent} onChange={this.handleFormChange}/>
          <Input name='fgzcent' placeholder='z-coordinate' defaultValue={this.state.fgzcent} onChange={this.handleFormChange}/>
        </div>
    }

    return(
      <div>
        <Row>
          <Radio.Group name='fgcent' buttonStyle='solid' defaultValue={this.state.fgcent} onChange={this.handleFormChange}>
            <Radio.Button value='mol'> Center grid on a molecule</Radio.Button>
            <Radio.Button value='coord'> Manually enter coordinates for center of grid</Radio.Button>
          </Radio.Group>
        </Row>
        <Row>
          <Col span={4}>
            {inputFields}
          </Col>
        </Row>
      </div>
    )
  }

  renderPbeType(){
    let name = 'solvetype';
    let choices = {
      'lpbe' : 'Linearized',
      'npbe' : 'Nonlinearized',
    }
    return this.renderRadioGroup(name, choices, this.state.solvetype);
  }

  renderBoundary(){
    let name = 'bcfl';
    let choices = {
      'zero'  : 'Zero',
      'sdh'   : 'Single Debye-Huckel',
      'mdh'   : 'Multiple Debye-Huckel',
      'focus' : 'Focusing',
    }
    return this.renderRadioGroup(name, choices, this.state.bcfl);
  }

  renderMobileIon(){
    /** color: rgba(0, 0, 0, 0.65); */
    return(
      <Col offset={4}>
        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>Charge (E<sub>C</sub>) </Col>
          <Col  span={6}>Concentration (M) </Col>
          <Col  span={6}>Radius (A)</Col>
        </Row>
        
        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>{this.renderNumericalField('Ion 1','charge0')}</Col>
          <Col  span={6}>{this.renderNumericalField('Ion 1','conc0')}</Col>
          <Col  span={6}>{this.renderNumericalField('Ion 1','radius0')}</Col>
        </Row>
        
        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>{this.renderNumericalField('Ion 2','charge1')}</Col>
          <Col  span={6}>{this.renderNumericalField('Ion 2','conc1')}</Col>
          <Col  span={6}>{this.renderNumericalField('Ion 2','radius1')}</Col>
        </Row>

        <Row gutter={16} style={{marginBottom: 8}}>
          <Col  span={6}>{this.renderNumericalField('Ion 3','charge2')}</Col>
          <Col  span={6}>{this.renderNumericalField('Ion 3','conc2')}</Col>
          <Col  span={6}>{this.renderNumericalField('Ion 3','radius2')}</Col>
        </Row>
      </Col>
    )
  }
  
  renderPointCharges(){
    let name = 'chgm';
    let choices = {
      'spl0'   : 'Traditional trilinear interpolation',
      'spl2'   : 'Cubic B-spline discretization',
      'spl4'   : 'Quintic B-spline discretization',
    }
    return this.renderRadioGroup(name, choices, this.state.chgm);
  }

  renderDielectric(){
    let name = 'srfm';
    let choices = {
      'mol'    : 'Molecular Surface Defiinition',
      'smol'   : '9-point Harmonic Averaging',
      'spl2'   : 'Cubic-Spline Surface',
      'spl4'   : '7th Order Polynomial',
    }
    return this.renderRadioGroup(name, choices, this.state.srfm);
  }

  /** Generic function to render numerical input field,
   *    using passed-in parameter objects
   */
  // renderGridGroup(label )

  /**
   * Regular render() function used by React.
   * 
   * NOTE:  For each <Panel/> object, the forceRender prop is neccessary
   *        so that the form data within is passed to the server in despite
   *        whether the user opens it. 
   */
  render(){
    console.log(this.props.autofill['temperature'])
    return(
      <div>
        <Form.Item label='mg-auto Configuration'>
        {/* <Col offset={6} span={12}> */}
        <Col>
          <Collapse>
            <Panel forceRender={true} header='GRID POINTS AND DOMAIN LENGTHS'>
              {this.renderGridPointsDomain()}
            </Panel>

            <Panel forceRender={true} header='CENTER OF THE COARSE GRID'>
              {this.renderCoarseGrid()}
            </Panel>
            
            <Panel forceRender={true} header='CENTER OF THE FINE GRID'>
              {this.renderFineGrid()}
            </Panel>
            
            <Panel forceRender={true} header='TYPE OF PBE TO BE SOLVED'>
              {this.renderPbeType()}
            </Panel>
            
            <Panel forceRender={true} header='BOUNDARY CONDITION DEFINITION'>
              {this.renderBoundary()}
            </Panel>
            
            <Panel forceRender={true} header='MOBILE ION SPECIES PRESENT IN SYSTEM (OPTIONAL)'>
              {this.renderMobileIon()}
            </Panel>

            <Panel forceRender={true} header='BIOMOLECULAR DIELECTRIC CONSTANT'>
              <Col span={4}> {this.renderNumericalField('', 'pdie')} </Col>
            </Panel>
            
            <Panel forceRender={true} header='DIELECTRIC CONSTANT OF SOLVENT'>
              <Col span={4}> {this.renderNumericalField('', 'sdie')} </Col>
            </Panel>
            
            <Panel forceRender={true} header='METHOD BY WHICH THE BIOMOLECULAR POINT CHARGES ARE MAPPED ONTO THE GRID'>
              {this.renderPointCharges()}
            </Panel>
            
            <Panel forceRender={true} header='NUMBER OF GRID POINTS PER SQUARE-ANGSTROM TO USE IN SURFACE CONSTRUCTIONS'>
              <Col span={4}> {this.renderNumericalField('', 'sdens')} </Col>
            </Panel>

            <Panel forceRender={true} header='MODEL TO USE TO CONSTRUCT THE DIELECTRIC ION-ACCESSIBILITY COEFFICIENTS'>
              {this.renderDielectric()}
            </Panel>

            <Panel forceRender={true} header='RADIUS OF THE SOLVENT MOLECULES'>
              <Col span={4}> {this.renderNumericalField('', 'srad')} </Col>
            </Panel>
            
            <Panel forceRender={true} header='SIZE OF THE SUPPORT FOR SPLINE-BASED SURFACE DEFINITIONS'>
              <Col span={4}> {this.renderNumericalField('', 'swin')} </Col>
            </Panel>
            
            <Panel forceRender={true} header='TEMPERATURE FOR PBE CALCULATION (IN K)'>
              <Col span={4}> {this.renderNumericalField('in Kelvin', 'temp', )} </Col>
            </Panel>

          </Collapse>
        </Col>
        </Form.Item>

      </div>
    )
  }
}

export default MgAuto;