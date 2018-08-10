import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './home.css';

import{ Layout, Col, Menu, Carousel, Row,
        Card, Icon, Button, Link } from 'antd';

class HomePage extends Component{
    /**
     * Creates and returns the main banner welcoming the user to the website
     */
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

    /** Creates uniform cards
     * @param {string} linkUrl - URL to be taken when card is clicked
     * @param {string} text - Desired text to be displayed within card
     * @param {string} iconType - Icon type to be shown on the card
     */
    createCard(linkUrl, text, iconType){
        return(
            <div style={{padding: 25}}>
                <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                    <Card hoverable cover={<Icon type={iconType} style={{fontSize: 72}} />} style={{ width: 240, height: 250, paddingTop: 25}}>
                        <div  style={{ paddingTop: 10, textAlign: 'center', fontSize: 18 }}>
                            {text}
                        </div>
                    </Card>
                </a>
            </div>
        )
    }

    render(){
        return(
            <Layout>
                {this.mainBanner()}
                <Row type="flex" justify="center">
                    {this.createCard("http://apbs-pdb2pqr.readthedocs.io/en/latest/getting-started.html", "Go to User Guide", "book")}
                    {this.createCard("http://eepurl.com/by4eQr", "Register to help support PDB2PQR & APBS", "form")}
                    {this.createCard("http://apbs-pdb2pqr.readthedocs.io/en/latest/examples/", "See Examples", "folder-open")}
                </Row>
            </Layout>        
        )
    }
}

export default HomePage;