import React, { Component } from 'react';
import ReactGA from 'react-ga';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload,
          Collapse, Spin
        } from 'antd';
import RadioGroup from 'antd/lib/radio/group';
import '../../styles/utils.css'
import '../../styles/configJob.css';


const { Content, Sider } = Layout;
const Panel = Collapse.Panel;

class ConfigForm extends Component{
  constructor(props){
    super(props);
    this.state = {

      job_submit: false,
      show_register_button: false,
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

  hasAnalyticsId(){
    return (window._env_.GA_TRACKING_ID !== "")
  }
  
  getNewJobID(){
    console.log('inside getNewJobID')
    let id_gen_url = window._env_.ID_URL
    // let id_gen_url = window._env_.ID_URL + '/api/uid'
    // console.log(id_gen_url)
    fetch(id_gen_url)
    .then(response => response.json())
    .then(data => {
      // console.log(data)
      // console.log(data.job_id)
      // console.log(data['job_id'])
      this.setState({
          jobid : data['job_id']
      })
      console.log(this.state.jobid)
    })
    .catch(error => console.error(error)) 
  }

  saveIdToStorage(jobid){
    
  }
  

  toggleRegisterButton(show_button){
    this.setState({
      show_register_button: show_button
    });
  }

  sendRegisterClickEvent(pageType){
    if( this.hasAnalyticsId() ){
      ReactGA.event({
        category: 'Registration',
        action: 'linkClick',
        label: pageType,
      })
    }
  }

  renderRegistrationButton(){
    return (
      <a href='http://eepurl.com/by4eQr' target="_blank" rel="noopener noreferrer">
        <Button
          className='registration-button' 
          type="default"  
          size='large' 
          shape='round'
          icon="form"
        >
          Register Here
        </Button>
      </a>
    )
  }

  /** Submission button rendered by default. If submission button's pressed,
   *  button text changes with spinning icon to indicate data has been sent
   */
  renderSubmitButton(){
    let submission_text = '';
    let loading = false;

    if(!this.state.job_submit)
      submission_text = 'Start Job'
    else{
      submission_text = 'Submitting job...'
      loading = true
    }

    // TODO: return a submission bar affixed to the bottom of the window
    return (
      <Button className='config-submit' type="primary" htmlType="submit" size='large' shape='round' loading={loading}>
        {submission_text}
      </Button>
    )

  }

}

export default ConfigForm