import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
          Collapse, Spin
        } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import '../../styles/configJob.css';


const { Content, Sider } = Layout;
const Panel = Collapse.Panel;

class ConfigForm extends Component{
  constructor(props){
    super(props);
    this.state = {

      job_submit: false
    }

    /** Styling to have radio buttons appear vertical */
    this.radioVertStyle = {
      display:    'block',
      height:     '25px',
      lineHeight: '30px',
    }

    this.submitButtonStyle = {
      backgroundColor: '#52c41a',
      borderColor: '#52c41a',
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

  
  /** Submission button rendered by default. If submission button's pressed,
   *  button text changes with spinning icon to indicate data has been sent
   */
  renderSubmitButton(){
    if (!this.state.job_submit)
      return (
        <Button className='config-submit' type="primary" htmlType="submit" size='large' shape='round' >
          Start Job
        </Button>
      )
    else
      return (
        <Button className='config-submit' type="primary" htmlType="submit" size='large' shape='round' loading>
          Submitting job...
        </Button>
      )
    
  }

}

export default ConfigForm