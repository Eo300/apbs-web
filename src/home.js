import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './home.css';

import{ Layout, Col, Menu, Carousel, Row,
        Card, Icon } from 'antd';
// const { HomeLayout } = Layout;

class HomePage extends Component{
    mainBanner(){
        return(
            <Carousel autoplay >
                <div><h3>Welcome to the PDB2PQR Server</h3></div>
            </Carousel>        
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