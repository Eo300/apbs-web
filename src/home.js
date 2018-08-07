import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './home.css';

import{ Layout, Col, Menu, Carousel, Row,
        Card, Icon, Button, Link } from 'antd';
// const { HomeLayout } = Layout;

class HomePage extends Component{
    mainBanner(){
        return(
            <Col style={{ boxShadow: "2px 4px 10px #00000033" }} >
            {/* <Col span={18} offset={3} style={{ boxShadow: "2px 4px 10px #00000033" }} > */}
                <Carousel autoplay >
                    <div>
                        <h3>
                            Welcome to the PDB2PQR Server
                            {/* <Button>Configure </Button> */}
                        </h3>
                        
                    </div>
                </Carousel>        
            </Col>
        )
    }

    cardContent(){
        // return()
    }

    render(){
        return(
            <Layout>
                {this.mainBanner()}
                <Row type="flex" justify="center">
                    <div style={{padding: 25}}>
                        <a href="http://apbs-pdb2pqr.readthedocs.io/en/latest/getting-started.html" target="_blank" rel="noopener noreferrer">
                        <Card hoverable cover={<Icon type="book" style={{fontSize: 72}} />} style={{ width: 240, height: 250, paddingTop: 25}}>
                            <div  style={{ paddingTop: 10, textAlign: 'center', fontSize: 18 }}>
                                Go to User Guide
                            </div>
                        </Card>
                        </a>
                    </div>
                    <div style={{padding: 25}}>
                        <a href="http://eepurl.com/by4eQr" target="_blank" rel="noopener noreferrer">
                        <Card hoverable cover={<Icon type="form" style={{fontSize: 72}} />} style={{ width: 240, height: 250, paddingTop: 25}}>
                            <div  style={{ paddingTop: 10, textAlign: 'center', fontSize: 18 }}>
                                Register to help support PDB2PQR & APBS
                            </div>
                        </Card>
                        </a>
                    </div>
                    <div style={{padding: 25}}>
                        <a href="http://apbs-pdb2pqr.readthedocs.io/en/latest/examples/" target="_blank" rel="noopener noreferrer">
                        <Card hoverable cover={<Icon type="folder-open" style={{fontSize: 72}} />} style={{ width: 240, height: 250, paddingTop: 25}}>
                            <div  style={{ paddingTop: 10, textAlign: 'center', fontSize: 18 }}>
                                See Examples
                            </div>
                        </Card>
                        </a>
                    </div>
                </Row>
            </Layout>        
        )
    }
}

export default HomePage;