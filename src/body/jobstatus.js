import React, { Component } from 'react';
import ReactGA from 'react-ga';
import 'antd/dist/antd.css'
import  { Affix, Layout, Menu, Button, Form, Switch,
          Input, Radio, Checkbox , Row, Col, InputNumber,
          Icon, Tooltip, Upload, List, message, Timeline, notification
        } from 'antd';
import { stat } from 'fs';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';

import '../styles/jobstatus.css'

const { Content, Sider } = Layout;

// message.config({
//   maxCount: 2,
//   // duration: .5
// })

class JobStatus extends Component{
  constructor(props){
    super(props);
    if( window._env_.GA_TRACKING_ID !== "" ) 
      ReactGA.pageview(window.location.pathname + window.location.search)

    this.jobServerDomain = window._env_.API_URL
    this.jobStatusDomain = window._env_.STATUS_URL

    this.fetchIntervalPDB2PQR = null;
    this.fetchIntervalAPBS = null;
    this.elapsedIntervalPDB2PQR = null;
    this.elapsedIntervalAPBS = null;

    this.colorCompleteStatus  = "#52C41A";
    this.colorRunningStatus   = "#1890FF";
    this.colorErrorStatus     = "#F5222D";
    // this.totalElapsedTime = 0;
    this.state = {
      current_jobid: props.jobid,

      totalElapsedTime: 0,
      pdb2pqrElapsedTime: this.elapsedIntervalPDB2PQR,
      apbsElapsedTime: 0,
      elapsedTime: {
        apbs: this.elapsedIntervalAPBS,
        pdb2pqr: this.elapsedIntervalPDB2PQR,
      },
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
        files_input: [],
        files_output: [],
      },
      apbs: {
        status: 'no_job',
        startTime: null, // in seconds
        endTime: null, // in seconds
        files: [],
        files_input: [],
        files_output: [],
      }
    }
  }

  /** Begins fetching status as soon this component loads
   *  TODO: remove socketIO from npm package dependencies
   */
  componentDidMount(){
    this.fetchIntervalPDB2PQR = this.fetchJobStatus('pdb2pqr');
    this.fetchIntervalAPBS = this.fetchJobStatus('apbs');
    // this.fetchJobStatusSocketIO('apbs')
    // this.fetchJobStatusSocketIO('pdb2pqr')

    // if( window._env_.ON_CLOUD == true ){
    if( true ){
      notification.warn({
        key: 'data_retention_notice',
        message: "Regarding Data Retention",
        duration: 0,
        description: 
          "Files for a JobID WILL BE DELETED 48 hours after job creation,\
            if using APBS-REST via our cloud service. Please download\
            the files you need in the meantime.",
        // btn: (<Button type="primary" size="small" onClick={() => notification.close('data_retention_notice')}> Close </Button>)
      })
    }
  }

  /** Cleans up setInterval objects before unmounting */
  componentWillUnmount(){
    clearInterval(this.fetchIntervalPDB2PQR);
    clearInterval(this.fetchIntervalAPBS);
  }

  /** Stops polling the job status if fetched status isn't 'running' */
  componentDidUpdate(){
    let statuses = ["complete", "error", null];
    if( statuses.includes(this.state.pdb2pqr.status) ){//} && statuses.includes(this.state.pdb2pqr.status)){
      clearInterval(this.fetchIntervalPDB2PQR);
    }
    if( statuses.includes(this.state.apbs.status) ){
      clearInterval(this.fetchIntervalAPBS);
    }

    if( this.props.jobid !== this.state.current_jobid ){
      this.setState({
        current_jobid: this.props.jobid
      })
      // this.fetchIntervalPDB2PQR = this.fetchJobStatus('pdb2pqr');
      // this.fetchIntervalAPBS = this.fetchJobStatus('apbs');     
    }
  }

  /**
   * Continually fetch job status from server, using 
   * response data to update states.
   * 
   * Returns the setInterval object of the aforementioned
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
      // fetch(self.jobServerDomain+'/api/jobstatus?jobid='+self.props.jobid +'&'+jobtype+'=true')
      fetch(`${window._env_.WORKFLOW_URL}/${self.props.jobid}/${jobtype}`)
        .then(response => response.json())
        .then(data => {
            // Update job-respective component states
            self.setState({
              [jobtype]: {
                status: data[jobtype].status,
                startTime: data[jobtype].startTime,
                endTime: data[jobtype].endTime,
                files: data[jobtype].files,
                files_input: data[jobtype].inputFiles,
                files_output: data[jobtype].outputFiles,
              },
            });
        })
        .catch(error => console.error(error));
    
    }, 1000);
    return interval;
  }

  /**
   * Inquires job status from server via WebSocket, using 
   * response data to update states.
   */
  fetchJobStatusSocketIO(jobtype){
    let self = this;

    // Initialize interval to continually compute elapsed time
    if(self.elapsedIntervalPDB2PQR == null && jobtype === 'pdb2pqr')
      self.elapsedIntervalPDB2PQR = self.computeElapsedTime('pdb2pqr');
    if(self.elapsedIntervalAPBS == null && jobtype === 'apbs')
      self.elapsedIntervalAPBS = self.computeElapsedTime('apbs')

    // Connect to job status service; send job status request to server 
    let socket = io.connect(self.jobStatusDomain);
    socket.emit('status', {'jobid': self.props.jobid, 'jobtype': jobtype})

    // When server responds, set the appropriate status values
    socket.on(`${jobtype}_status`, function(data){
      console.log(data);
      self.setState({
        [jobtype]: {
          status: data[jobtype].status,
          startTime: data[jobtype].startTime,
          endTime: data[jobtype].endTime,
          files: data[jobtype].files,         
        },
      });
    })

    // Disconnects socket; log to console
    socket.on('disconnect', (reason) =>{ 
      if(reason === 'termination'){
        console.log(reason)
        socket.disconnect()
      }
      else
        console.log(`other reason: ${reason}`)
    })
  }

  prependZeroIfSingleDigit(numString){ 
    return (numString > 9) ? numString : '0'+ numString;
  }


  /** Compute the elapsed time of a submitted job,
   *  for as long as it is 'running'.
   * 
   *  Returns the setInterval object of the the aforementioned
   */
  computeElapsedTime(jobtype){
    let self = this;
    let start = null;
    let statuses = ["complete", "error", null];
    let interval = setInterval(function(){
      let end = new Date().getTime() / 1000;
      
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
      }
      else{
        elapsedHours = '00';
        elapsedMin = '00';
        elapsedSec = '00';
      }

      // Applies the computed elapsed time value to the appropriate jobtype
      if(jobtype == 'pdb2pqr'){
        self.setState({pdb2pqrElapsedTime: elapsedHours+':'+elapsedMin+':'+elapsedSec});
        self.setState({
          elapsedTime: {
            apbs: self.state.elapsedTime.apbs,
            pdb2pqr: elapsedHours+':'+elapsedMin+':'+elapsedSec
          } 
        });
        if(statuses.includes(self.state.pdb2pqr.status)) clearInterval(interval);
      }
      else if(jobtype == 'apbs'){
        self.setState({apbsElapsedTime: elapsedHours+':'+elapsedMin+':'+elapsedSec});
        self.setState({
          elapsedTime: {
            apbs: elapsedHours+':'+elapsedMin+':'+elapsedSec,
            pdb2pqr: self.state.elapsedTime.pdb2pqr,
          } 
        });
        if(statuses.includes(self.state.apbs.status)) clearInterval(interval);
      }
      // self.setState({totalElapsedTime: elapsedHours+':'+elapsedMin+':'+elapsedSec});
    }, 1000);

    return interval;
  }

  /** Creates the component for the file list and 
   *  elapsed time of the particular jobtype */
  createOutputList(jobtype){
    // let status = (jobtype === "pdb2pqr") ? this.state.pdb2pqr.status : this.state.apbs.status;
    let completion_status = this.state[jobtype].status;
    let outputList = null;
    
    // console.log(new Date(this.state[jobtype].startTime*1000))
    
    let displayed_job_state = '';
    let running_icon = null;
    if(completion_status !== null){
      displayed_job_state = completion_status.charAt(0).toUpperCase() + completion_status.substr(1)
      if(completion_status == 'running')
        running_icon = <Icon type='loading'/>
      // else if(completion_status == 'complete')
      //   message.success(jobtype.toUpperCase()+' job completed')
    }

    let start_time = this.state[jobtype].startTime
    let end_time   = this.state[jobtype].endTime
    start_time = (this.state[jobtype].startTime !== null) ? new Date(start_time*1000).toLocaleString() : null
    end_time   = (this.state[jobtype].endTime !== null) ? new Date(end_time*1000).toLocaleString() : null

    outputList =  <div>
                    <h2 style={{ margin: '10px 0' }}>{jobtype.toUpperCase()}:</h2>

                    <Row>
                      <Col span={12}>
                        <h3 style={{color: this.statusColor}}>
                          {displayed_job_state} &nbsp;&nbsp; {running_icon}
                        </h3>
                        {/* Start time: {this.state[jobtype].startTime}<br/>
                        End time: {this.state[jobtype].endTime}<br/> */}
                        Start time: {start_time}<br/>
                        End time: {end_time}<br/>
                        <h3>{this.state.elapsedTime[jobtype]}</h3>
                        {/* Elapsed time ({jobtype.toUpperCase()}): <strong>{this.state.elapsedTime[jobtype]}</strong> */}
                      </Col>
                    </Row>

                    <List
                      size="small"
                      bordered
                      dataSource={this.state[jobtype].files}
                      // dataSource={(jobtype === "pdb2pqr") ? this.state.pdb2pqr.files : this.state.apbs.files}
                      renderItem={ item => (
                          <List.Item actions={[<a href={window._env_.STORAGE_URL+'/'+item}><Button type="primary" icon="download">Download</Button></a>]}>
                            {/* {window._env_.API_URL+'/download/'+item} */}
                            {item.split('/')[1]}
                          </List.Item>
                        )}
                    />
                  </div>
    return (
      <Col span={12}>
        {outputList}
      </Col>
    );
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
            <h1>ID: {this.props.jobid}</h1>
            {/* <h1>Status</h1> */}
            {/* <h2 style={{color: this.statusColor}}> {
              displayed_status
              // (this.state.pdb2pqr.status !== null && this.state.pdb2pqr.status != 'complete') 
              //     ? this.state.pdb2pqr.status.charAt(0).toUpperCase() + this.state.pdb2pqr.status.substr(1) // Uppercase first letter
              //     : this.state.apbs.status.charAt(0).toUpperCase() + this.state.apbs.status.substr(1)       // Uppercase first letter
            }</h2>
            Start time: {this.state.pdb2pqr.startTime}<br/>
            End time: {this.state.pdb2pqr.endTime}<br/>
            Elapsed time (PDB2PQR): {this.state.pdb2pqrElapsedTime}  */}
          </Row>
          <hr/>
          {/* Job ID from query string: {this.props.jobid}<br/>
          JSON Response (PDB2PQR): {this.state.pdb2pqr.files} */}

          <Row gutter={24}>
            {this.createOutputList('pdb2pqr')}
            {this.createOutputList('apbs')}
          </Row>
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

  createFileListItem(item){
    let action_list = [
      <a href={window._env_.STORAGE_URL+'/'+item}><Icon type='download'/> Download </a>
    ]

    // Add view option if extension is .txt or .json
    if( item.endsWith('.txt') || item.endsWith('.json') ){
      action_list.unshift(
        <a href={window._env_.STORAGE_URL+'/'+item+'?view=true'} target='_BLANK'><Icon type='eye'/> View </a>
      )
    }

    return (
      <List.Item actions={action_list}>
        {item.split('/')[1]}
      </List.Item>
    )
  }

  newCreateJobStatus(){
    if( this.props.jobid ){

      let jobtype = undefined;
      if( ['apbs','pdb2pqr'].includes(this.props.jobtype) ){
        jobtype = this.props.jobtype;
      }

      /** Create the timeline view of the current job status */
      // let state_list = ['Download input files', 'Queued', 'Running', 'Upload output files', 'Complete']
      // let state_list = ['Pending', 'Aborted', 'Running', 'Complete', 'Terminated']
      let state_list = ['Submitted', 'Running', 'Complete']
      let stop_index = state_list.length

      let is_pending = false
      let pending_text = ''

      let timeline_list = []
      if( this.state[jobtype].status === 'running' )
        stop_index = 2;
      else if( this.state[jobtype].status === 'complete' ){
        /** Do nothing */
      }else
        stop_index = 0;

      for (let val of state_list.slice(0, stop_index)){
        if( val == 'Running' && this.state[jobtype].status === 'running' ){
          console.log('Running should be a pending dot')
          is_pending = true
          pending_text = "Running"

          // timeline_list.push( <Timeline.Item pending >{val}</Timeline.Item> )
        }
        else if( val == 'Complete' && this.state[jobtype].status === 'complete' ){
          timeline_list.push( <Timeline.Item color="green" dot={<Icon type="check-circle"/>}>{val}</Timeline.Item> )
        }
        else
          timeline_list.push( <Timeline.Item>{val}</Timeline.Item> )
      }

      /** Set elapsed time */
      let elapsedTime = 'computing...'
      if (this.state.elapsedTime[jobtype] !== undefined){
        elapsedTime = this.state.elapsedTime[jobtype]
      }
      else{
        elapsedTime = 'computing...'
      }

      /** Setup button to configure APBS post-PDB2PQR */
      let apbs_button_block = null
      // if ( jobtype !== undefined ){
      if ( jobtype === 'pdb2pqr' ){
        let apbs_config_url = `/apbs?jobid=${this.props.jobid}`
        let is_disabled = true;
        if (this.state[jobtype].status === 'complete'){
          // TODO: Use alternative means to determine if user requested APBS input file
          if ( this.state[jobtype].files_output.some( e => e.slice(-3) === '.in' ) ) // check if APBS input file exists in output_files with *.in
            is_disabled = false;
        }
        apbs_button_block = 
        // <Button type="primary" href={apbs_config_url}>
        <Link to={apbs_config_url}>
          <Button type="primary" size='large' disabled={is_disabled}>
              Use results with APBS
              <Icon type="right"/>
            </Button>
        </Link>
      }

      // Setup button to view results in vizualizer
      // TODO: use dropdown when we add more than just 3Dmol
      let viz_button_block = null
      let pqr_prefix = null
      if ( jobtype === 'apbs' ){
        // find pqr name prefix
        for( let element of this.state[jobtype].files_input ){
          let file_name = element.split('/').slice(-1)[0]
          let extension_index = file_name.search(/.pqr$/)
          if( extension_index !== -1 ){
            pqr_prefix = file_name.slice(0, extension_index)
            // console.log(pqr_prefix)
            break
          }
        }
        // load visualizer button link if on the respective job status page
        // let viz_3dmol_url = `/viz/3dmol?jobid=${this.props.jobid}&pqr=${pqr_prefix}`
        let viz_3dmol_url = `${window._env_.VIZ_URL}/3dmol?jobid=${this.props.jobid}&pqr=${pqr_prefix}`
        let is_disabled = true;
        if (this.state[jobtype].status === 'complete') is_disabled = false;
        viz_button_block = 
        // <Button type="primary" href={apbs_config_url}>
        <Button type="primary" size='large' href={viz_3dmol_url} target='_BLANK' disabled={is_disabled}>
            View in 3Dmol
            {/* View in Visualizer */}
            <Icon type="right"/>
        </Button>
      }

      let bookmark_notice_block = 
        <div style={{ textAlign: 'center' }}>
          <h2> <b>Bookmark</b> <Icon type="star" theme="twoTone" /> this page to return to your results after leaving</h2>
          {/* <h2> <b>Bookmark</b> this page in order to view your results after leaving this page.</h2> */}
          <br/>
        </div>

      let job_status_block =
        <div>
          <Row>
            {bookmark_notice_block}
          </Row>
          <Row gutter={16}>
            {/* General job information */}
            <Col span={6}>
              <h2>
                ID: {this.props.jobid}
              </h2>

              {/* General job information here */}
              <h3>Time Elapsed:</h3>
              <p style={{fontSize:24}}>
                {elapsedTime}
                {/* <b>{elapsedTime}</b> */}
                {/* Time Elapsed: {this.state.elapsedTime[jobtype]} */}
              </p>

              <Timeline mode="left" pending={pending_text}>
                {timeline_list}
              </Timeline>

              {/* <br/> */}
              {/* <h3>Regarding data retention</h3> */}
            </Col>

            {/* Display input/output files */}
            <Col span={12}>
              {/* {this.createOutputList('pdb2pqr')} */}
              {/* {this.createOutputList(jobtype)} */}

              <h2>Files:</h2>
              {/* <h3>Notice regarding data retention</h3> */}
              <List
                size="small"
                bordered
                header={<h3>Input</h3>}
                dataSource={this.state[jobtype].files_input}
                // dataSource={(jobtype === "pdb2pqr") ? this.state.pdb2pqr.files : this.state.apbs.files}
                renderItem={ item => (
                    <List.Item actions={[
                      <a href={window._env_.STORAGE_URL+'/'+item}><Icon type='download'/> Download </a>,
                      // <a href={window._env_.STORAGE_URL+'/'+item}><Icon type='eye'/> View </a>
                    ]}>
                    {/* <List.Item actions={[<a href={window._env_.STORAGE_URL+'/'+item}><Button type="primary" icon="download">Download</Button></a>]}> */}
                      {item.split('/')[1]}
                    </List.Item>
                  )}
              />
              <br/>
              <List
                size="small"
                bordered
                header={<h3>Output</h3>}
                dataSource={this.state[jobtype].files_output}
                // dataSource={(jobtype === "pdb2pqr") ? this.state.pdb2pqr.files : this.state.apbs.files}
                renderItem={ (item) => this.createFileListItem(item) }
                // renderItem={ item => (
                //     <List.Item actions={[
                //       <a href={window._env_.STORAGE_URL+'/'+item}><Icon type='download'/> Download </a>,
                //       <a href={window._env_.STORAGE_URL+'/'+item+'?view=true' target="BLANK"}><Icon type='eye'/> View </a>
                //     ]}>
                //     {/* <List.Item actions={[<a href={window._env_.STORAGE_URL+'/'+item}><Button type="primary" icon="download">Download</Button></a>]}> */}
                //       {item.split('/')[1]}
                //     </List.Item>
                //   )}
              />

              <br/>

              <div className='next-process'>
                {apbs_button_block}
                {viz_button_block}
              </div>

            </Col>

            {/* Show timeline of task related to job */}
            <Col span={6}>
              {/* <Timeline mode="left">
                <Timeline.Item>Download input files</Timeline.Item>
                <Timeline.Item>Queued</Timeline.Item>
                <Timeline.Item>Running</Timeline.Item>
                <Timeline.Item>Upload output files</Timeline.Item>
                <Timeline.Item>Complete</Timeline.Item>
              </Timeline> */}
              {/* <Timeline mode="left" pending={pending_text}>
                {timeline_list}
              </Timeline> */}
            </Col>

          </Row>

          {/* <Row>
            <Col offset={18}>
              {apbs_button_block}
            </Col>
          </Row>
          <Row>
            <Col offset={18}>
              {viz_button_block}
            </Col>
          </Row> */}

        </div>

      return job_status_block;
    }

    // If a job ID not in URL, display appropriate message
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
            {/* {this.createJobStatus()} */}
            {this.newCreateJobStatus()}
        </Content>
      </Layout>
    );
  }
}

export default JobStatus;