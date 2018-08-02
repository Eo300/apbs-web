import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './home.css';

import{ Layout, Col, Menu, Carousel, Row,
        Card, Icon, Button, Link } from 'antd';
// const { HomeLayout } = Layout;

class HomePage extends Component{
    mainBanner(){
        return(
            <Col span={18} offset={3} style={{ boxShadow: "2px 4px 10px #00000033" }} >
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
                    <Card hoverable cover={<Icon type="book" style={{fontSize: 72}} />} style={{ width: 250, height: 300, padding: 25}}>
                        Go to User Guide
                    </Card>
                    </div>
                    <div style={{padding: 25}}>
                    <Card hoverable cover={<Icon type="book" style={{fontSize: 72}} />} style={{ width: 250, height: 300, padding: 25}}>
                        Go to User Guide
                    </Card>
                    </div>
                    <div style={{padding: 25}}>
                    <Card hoverable cover={<Icon type="book" style={{fontSize: 72}} />} style={{ width: 250, height: 300, padding: 25}}>
                        Go to User Guide
                    </Card>
                    </div>
                </Row>
            </Layout>        
        )
    }
}

export default HomePage;