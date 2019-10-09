import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/home.css';

import{ Layout, Col, Menu, Carousel, Row,
        Card, Icon, Button, } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

class HomePage extends Component{
    /**
     * Creates and returns the main banner welcoming the user to the website
     */
    mainBanner(){
        return(
            <Row align="middle"  className="banner">
                <Col xs={1} sm={1} md={2} lg={4} xl={4} />
                <Col xs={22} sm={22} md={20} lg={16} xl={16}>
                {/* <Col style={{ boxShadow: "2px 4px 10px #00000033" }} span={16}> */}
                {/* <Col span={18} offset={3} style={{ boxShadow: "2px 4px 10px #00000033" }} > */}
                    {/* <Carousel autoplay > */}
                    <Content className="welcome-text">
                        <div>
                            <h1> APBS </h1>
                            <p> Welcome to the new home for running the APBS/PDB2PQR software suite </p>

                            <br/>
                            <p> Use the software: </p>
                                {/* <Button> <Link to="/pdb2pqr"> PDB2PQR </Link> </Button>
                                <Button> <Link to="/apbs"> APBS </Link> </Button> */}
                                <Button className="banner-button" shape="round">
                                    <Link to="/pdb2pqr"><span>PDB2PQR</span></Link>
                                </Button>
                                <Button className="banner-button" shape="round">
                                    <Link to="/apbs"><span>APBS</span></Link>
                                </Button>
                            
                        </div>
                    </Content>
                    {/* </Carousel>         */}
                </Col>
                {/* <Col span={8}/> */}
                <Col xs={1} sm={1} md={2} lg={4} xl={4}/>
            </Row>
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