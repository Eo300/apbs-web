import React, { Component } from 'react';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload, List,
        } from 'antd';
const { Content, Sider } = Layout;

// function getStatusJSON(jobid){
//   // let request = require('request');
//   let json_text = null;
//   // request('http://localhost:5000/api/jobstatus?jobid='+jobid, function(error, response, body){
//   //   json_text = body;
//   // });
//   json_text = fetch('http://localhost:5000/api/jobstatus?jobid='+jobid).body;
//   return json_text;
// }

class JobStatus extends Component{
  constructor(props){
    super(props);
    /** RENAME TO REAL DOMAIN BEFORE PRODUCTION */
    this.jobServerDomain = "http://localhost:7000"
    /********************************************/
    this.fetchIntervalPDB2PQR = null;
    this.fetchIntervalAPBS = null;
    this.elapsedIntervalPDB2PQR = null;
    this.elapsedIntervalAPBS = null;

    this.colorCompleteStatus  = "#52C41A";
    this.colorRunningStatus   = "#1890FF";
    this.colorErrorStatus     = "#F5222D";
    // this.totalElapsedTime = 0;
    this.state = {
      totalElapsedTime: 0,
      pdb2pqrElapsedTime: this.elapsedIntervalPDB2PQR,
      apbsElapsedTime: 0,
      // full_request: getStatusJSON(this.props.jobid),
      // job_status_response: null
      // job_status_response: "hello world",
      pdb2pqrColor: null,
      apbsColor: null,
      pdb2pqr: {
        // status: "pdb2pqrStatus",
        status: 'no_job',
        startTime: null, // in seconds
        endTime: null, // in seconds
        files: [],
      },
      apbs: {
        status: 'no_job',
        startTime: null, // in seconds
        endTime: null, // in seconds
        files: [],
      }
    }
  }


  componentDidMount(){
    let self = this;
    // setTimeout(function(){
    //   self.fetchInterval = self.fetchJobStatus();
    //   self.elapsedInterval = self.computeElapsedTime('pdb2pqr')
    // },0)

    this.fetchIntervalPDB2PQR = this.fetchJobStatus('pdb2pqr');
    this.fetchIntervalAPBS = this.fetchJobStatus('apbs');
    // this.elapsedIntervalPDB2PQR = this.computeElapsedTime('pdb2pqr');//setInterval(this.computeElapsedTime('pdb2pqr'), 1000);
    // this.elapsedIntervalAPBS = this.computeElapsedTime('apbs');//setInterval(this.computeElapsedTime('pdb2pqr'), 1000);
    // console.log("lakj;sdfiuaofjayleihfujosk");

    // this.computeElapsedTime('pdb2pqr');
    // this.fetchInterval = setInterval(this.fetchJobStatus, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.fetchIntervalPDB2PQR);
    clearInterval(this.fetchIntervalAPBS);

    // clearInterval(this.elapsedIntervalPDB2PQR);
    // clearInterval(this.elapsedIntervalAPBS);
  }

  componentDidUpdate(){
    let statuses = ["complete", "error", null];
    if(statuses.includes(this.state.pdb2pqr.status)){//} && statuses.includes(this.state.pdb2pqr.status)){
      clearInterval(this.fetchIntervalPDB2PQR);
      // clearInterval(this.elapsedIntervalPDB2PQR);
    }
    if(statuses.includes(this.state.apbs.status)){
      clearInterval(this.fetchIntervalAPBS);
      // clearInterval(this.elapsedIntervalAPBS);
    }
    
    // if(this.state.pdb2pqr.status == "complete") this.setState( {pdb2pqrColor: this.colorCompleteStatus, statusColor: this.colorCompleteStatus} );
    // else if(this.state.pdb2pqr.status == "running") this.setState( {pdb2pqrColor: this.colorRunningStatus, statusColor: this.colorRunningStatus} );
    // else if(this.state.pdb2pqr.status == "error") this.setState( {pdb2pqrColor: this.colorErrorStatus, statusColor: this.colorErrorStatus} );
    
    // if(this.state.apbs.status == "complete") this.setState( {apbsColor: this.colorCompleteStatus, statusColor: this.colorCompleteStatus} );
    // else if(this.state.apbs.status == "running") this.setState( {apbsColor: this.colorRunningStatus, statusColor: this.colorRunningStatus} );
    // else if(this.state.apbs.status == "error") this.setState( {apbsColor: this.colorErrorStatus, statusColor: this.colorErrorStatus} );

    // console.log(this.state.pdb2pqr.status)
    // console.log(this.state.totalElapsedTime)
  }

  /**
   * Fetches job status upon loading, udpating state with results
   */
  fetchJobStatus(jobtype){
    let self = this;
    let statusStates = ["complete", "error", null];
    
    // Initialize interval to continually compute elapsed time
    if(self.elapsedIntervalPDB2PQR == null)
      self.elapsedIntervalPDB2PQR = self.computeElapsedTime('pdb2pqr');
    if(self.elapsedIntervalAPBS == null)
      self.elapsedIntervalAPBS = self.computeElapsedTime('apbs')

    let interval = setInterval(function(){
      // console.log(self.props.jobid)
      // console.log("Fetched")
      // fetch(self.jobServerDomain+'/api/jobstatus?jobid='+self.props.jobid +'&'+jobtype+'=true')
      fetch(window._env_.API_URL+'/api/jobstatus?jobid='+self.props.jobid +'&'+jobtype+'=true')
        .then(response => response.json())
        .then(data => {

          if(jobtype == 'pdb2pqr'){
            // Update PDB2PQR component states
            self.setState({
              pdb2pqr: {
                status: data.pdb2pqr.status,
                startTime: data.pdb2pqr.startTime,
                endTime: data.pdb2pqr.endTime,
                files: data.pdb2pqr.files,         
              },
            });
          }
          else{
            // Update APBS component states
            self.setState({
              apbs: {
                status: data.apbs.status,
                startTime: data.apbs.startTime,
                endTime: data.apbs.endTime,
                files: data.apbs.files,
              }
            });     
          }
        })
        .catch(error => console.log(error));

      // if(this.state.pdb2pqr.status == "complete") this.setState( {pdb2pqrColor: this.colorCompleteStatus, statusColor: this.colorCompleteStatus} );
      // else if(this.state.pdb2pqr.status == "running") this.setState( {pdb2pqrColor: this.colorRunningStatus, statusColor: this.colorRunningStatus} );
      // else if(this.state.pdb2pqr.status == "error") this.setState( {pdb2pqrColor: this.colorErrorStatus, statusColor: this.colorErrorStatus} );
      
      // if(this.state.apbs.status == "complete") this.setState( {apbsColor: this.colorCompleteStatus, statusColor: this.colorCompleteStatus} );
      // else if(this.state.apbs.status == "running") this.setState( {apbsColor: this.colorRunningStatus, statusColor: this.colorRunningStatus} );
      // else if(this.state.apbs.status == "error") this.setState( {apbsColor: this.colorErrorStatus, statusColor: this.colorErrorStatus} );
    
    }, 1000);
    return interval;
    // console.log(this.props.jobid)
    // fetch('http://localhost:5000/api/jobstatus?jobid='+this.props.jobid)
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     pdb2pqr: {
    //       status: data.pdb2pqr.status,
    //       startTime: data.pdb2pqr.startTime,
    //       endTime: data.pdb2pqr.endTime,
    //       files: data.pdb2pqr.files,         
    //     },
    //     apbs: {
    //       status: data.apbs.status,
    //       startTime: data.apbs.startTime,
    //       endTime: data.apbs.endTime,
    //       files: data.apbs.files,
    //     }
    //   }))
    //   .catch(error => console.log(error))    
  }

  prependZeroIfSingleDigit(numString){ 
    return (numString > 9) ? numString : '0'+ numString;
  }
  computeElapsedTime(jobtype){
    let self = this;
    let start = null;
    let statuses = ["complete", "error", null];
    let interval = setInterval(function(){
      let end = new Date().getTime() / 1000;
      // console.log(end)
      
      console.log("\njobtype: "+jobtype)
      if(jobtype == 'pdb2pqr'){
        start = self.state.pdb2pqr.startTime;
        if(self.state.pdb2pqr.endTime) end = self.state.pdb2pqr.endTime;
        console.log("status: "+self.state.pdb2pqr.status)
      }
      else if(jobtype == 'apbs'){
        start = self.state.apbs.startTime;
        if(self.state.apbs.endTime) end = self.state.apbs.endTime;
        console.log("status: "+self.state.apbs.status)
      }
      console.log("start: "+start)
      console.log("end: "+end)
      // console.log("start state: "+self.state.pdb2pqr.startTime)


      let elapsed = null;
      let elapsedDate = null;
      let elapsedHours = null;
      let elapsedMin = null;
      let elapsedSec = null;
      if(start != null){
        let elapsed = (end - start)*1000;
        console.log("elapsed: "+elapsed)
        
        elapsedDate = new Date(elapsed);
        console.log("elapsedDate: "+elapsedDate)
        
        elapsedHours = self.prependZeroIfSingleDigit( elapsedDate.getUTCHours().toString() );
        elapsedMin = self.prependZeroIfSingleDigit( elapsedDate.getUTCMinutes().toString() );
        elapsedSec = self.prependZeroIfSingleDigit( elapsedDate.getUTCSeconds().toString() );
        // return elapsedHours+':'+elapsedMin+':'+elapsedSec;

      }
      else{
        elapsedHours = '00';
        elapsedMin = '00';
        elapsedSec = '00';
      }

      if(jobtype == 'pdb2pqr'){
        self.setState({pdb2pqrElapsedTime: elapsedHours+':'+elapsedMin+':'+elapsedSec});
        if(statuses.includes(self.state.pdb2pqr.status)) clearInterval(interval);
      }
      else if(jobtype == 'apbs'){
        self.setState({apbsElapsedTime: elapsedHours+':'+elapsedMin+':'+elapsedSec});
        if(statuses.includes(self.state.apbs.status)) clearInterval(interval);
      }
      // self.setState({totalElapsedTime: elapsedHours+':'+elapsedMin+':'+elapsedSec});
      
    }, 1000);
    return interval;

    // return elapsedDate.getUTCHours().toString()+':'+elapsedDate.getUTCMinutes().toString()+':'+elapsedDate.getUTCSeconds().toString();
    // return elapsed;
  }

  createOutputList(jobtype){
    let status = (jobtype === "pdb2pqr") ? this.state.pdb2pqr.status : this.state.apbs.status;
    if(status !== null){
      return(
        <div>
          {/* <Row>
            <h1>Status</h1>
            <h2 style={{color: this.statusColor}}> {
              (jobtype === "pdb2pqr") ? this.state.pdb2pqr.status.charAt(0).toUpperCase() + this.state.pdb2pqr.status.substr(1) // Uppercase first letter
                                      : this.state.apbs.status.charAt(0).toUpperCase() + this.state.apbs.status.substr(1)       // Uppercase first letter
            }</h2>
            Start time: {this.state.pdb2pqr.startTime}<br/>
            End time: {this.state.pdb2pqr.endTime}<br/>
            Elapsed time (PDB2PQR): {this.state.pdb2pqrElapsedTime}  
            this.computeElapsedTime('pdb2pqr')
          </Row> */}

          <h3 style={{ margin: '10px 0' }}>{jobtype.toUpperCase()}:</h3>
          <List
            size="small"
            bordered
            dataSource={(jobtype === "pdb2pqr") ? this.state.pdb2pqr.files : this.state.apbs.files}
            renderItem={ item => (
                <List.Item actions={[<a href={item}><Button type="primary" icon="download">Download</Button></a>]}>
                  {item}
                </List.Item>
              )}
          />
        </div>
      )
    }
    else{
      return null;
    }
  }

  createJobStatus(){
    // let full_status = getStatusJSON(this.props.jobid);
    if(this.props.jobid){
      // console.log(this.state['full_request']);
      // console.log(full_status);
      let displayed_status = "";
      if (this.state.pdb2pqr.status !== null){//} && this.state.pdb2pqr.status != 'complete'){
        displayed_status = this.state.pdb2pqr.status.charAt(0).toUpperCase() + this.state.pdb2pqr.status.substr(1) // Uppercase first letter
      }
      else if(this.state.apbs.status !== null){//} && this.state.apbs.status != 'complete'){
        displayed_status = this.state.apbs.status.charAt(0).toUpperCase() + this.state.apbs.status.substr(1)       // Uppercase first letter
      }
      return(
        <Layout style={{background: '#ffffff'}}>
          <Row>
            <h1>Status</h1>
            <h2 style={{color: this.statusColor}}> {
              displayed_status
              // (this.state.pdb2pqr.status !== null && this.state.pdb2pqr.status != 'complete') 
              //     ? this.state.pdb2pqr.status.charAt(0).toUpperCase() + this.state.pdb2pqr.status.substr(1) // Uppercase first letter
              //     : this.state.apbs.status.charAt(0).toUpperCase() + this.state.apbs.status.substr(1)       // Uppercase first letter
            }</h2>
            Start time: {this.state.pdb2pqr.startTime}<br/>
            End time: {this.state.pdb2pqr.endTime}<br/>
            Elapsed time (PDB2PQR): {this.state.pdb2pqrElapsedTime}  {/*this.computeElapsedTime('pdb2pqr')*/}
          </Row>
          <hr/>
          {/* Job ID from query string: {this.props.jobid}<br/>
          JSON Response (PDB2PQR): {this.state.pdb2pqr.files} */}
          {this.createOutputList('pdb2pqr')}
          {this.createOutputList('apbs')}
          {null}
        </Layout>
      )
    }
    else{
      return(
        <Layout>
          <h2>Missing jobid field</h2>
          <p>Your request URL is missing the jobid field</p>
          <p>Usage: /jobstatus?<b>jobid=JOBID</b> </p>
        </Layout>
      )
    }
  }
      
  render(){
    return(
      <Layout id="pdb2pqr">
          <Content style={{ background: '#fff', padding: 16, marginBottom: 5, minHeight: 280, boxShadow: "2px 4px 10px #00000033" }}>
          {/* <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}> */}
            {/* Content goes here */}
            {this.createJobStatus()}
        </Content>
      </Layout>
    );
  }
}

export default JobStatus;