import React, {Component} from 'react';
import 'antd/dist/antd.css'
import  { Radio, Form, Collapse, Switch, Input, InputNumber, Col, Row, 
} from 'antd';

const Panel = Collapse.Panel;

class MgAuto extends Component{
  constructor(props){
    super(props);
    this.state = {
      removewater : 'on',
      cgcent      : 'mol',
      fgcent      : 'mol',
      solvetype   : 'lpbe',
      bcfl        : 'sdh',
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

  renderCoarseGrid(){
    let inputFields = null;
    if (this.state.cgcent == 'mol'){
      inputFields = <Input name='cgcentid' placeholder='Molecule ID'/>
    }
    else if(this.state.cgcent == 'coord'){
      inputFields = 
        <div>
          <Input name='cgxcent' placeholder='x-coordinate' />
          <Input name='cgycent' placeholder='y-coordinate' />
          <Input name='cgzcent' placeholder='z-coordinate' />
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
      inputFields = <Input name='fgcentid' placeholder='Molecule ID'/>
    }
    else if(this.state.fgcent == 'coord'){
      inputFields = 
        <div>
          <Input name='fgxcent' placeholder='x-coordinate' />
          <Input name='fgycent' placeholder='y-coordinate' />
          <Input name='fgzcent' placeholder='z-coordinate' />
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

  renderMobileIon(){}
  // renderGridGroup(label, )


  /** Generic function to render numerical input field,
   *    using passed-in parameter objects
   */
  renderNumericalField(label, fieldName){
    return(
      <Input name={fieldName} placeholder={label}/>
    )
  }
  /** Generic function to render radio button group,
   *    using passed-in parameter objects
   */
  renderRadioGroup(label, choiceObj, defaultVal=null){
    let all_choices = []
    for (let val in choiceObj){
      all_choices.push(
        <Radio.Button value={val}>{choiceObj[val]}</Radio.Button>
      )
    }
    return(
      <Radio.Group name={label} defaultValue={defaultVal} buttonStyle='solid' onChange={this.handleFormChange}>
        {all_choices}
      </Radio.Group>
    )
  }

  render(){
    return(
      <div>
        <Form.Item label='mg-auto Configuration'>
          <Collapse>
            <Panel header='CENTER OF THE COARSE GRID'>
              {this.renderCoarseGrid()}
            </Panel>
            <Panel header='CENTER OF THE FINE GRID'>
              {this.renderFineGrid()}
            </Panel>
            <Panel header='TYPE OF PBE TO BE SOLVED'>
              {this.renderPbeType()}
            </Panel>
            <Panel header='BOUNDARY CONDITION DEFINITION'>
              {this.renderBoundary()}
            </Panel>
          </Collapse>
        </Form.Item>

      </div>
    )
  }
}

export default MgAuto;