import React, { Component } from 'react';
import 'antd/dist/antd.css';
// import './home.css';

import{ Layout, Col, Menu, Carousel, Row,
        Card, Icon, Button, Link } from 'antd';
const { Content } = Layout;

class AboutPage extends Component{

    render(){
        return(
            <Layout id="about" style={{ padding: '16px 0', marginBottom: 5, background: '#fff', boxShadow: "2px 4px 10px #00000033" }}>
                <Content style={{ background: '#fff', padding: 16, margin: 0, minHeight: 280 }}>
                    This server enables a user to convert PDB files into PQR files. PQR files are PDB files where the occupancy and B-factor columns have been replaced by per-atom charge and radius.
                    pKa calculations are performed by PROPKA.

                    <h3>The PDB2PQR application and web server was written by:</h3>
                    <ul>
                        <li>Jens Erik Nielsen</li>
                        <li>Todd Dolinsky</li>
                        <li>Nathan Baker</li>
                        <li>Kyle Monson</li>
                    </ul>

                    
                    <h3>PDB2PQR Opal integration by:</h3>
                    <ul>
                        <li>Wes Goodman</li>
                        <li>Samir Unni</li>
                        <li>Yong Huang</li>
                    </ul>


                    <h3>3dMol visualization provided by:</h3>
                    <ul>
                        <li>David Koes</li>
                    </ul>


                    <h3>JMol visualization scripts and applets provided by:</h3>
                    <ul>
                        <li>Robert Hanson</li>
                    </ul>
                </Content>
            </Layout>
        )
    }
}

export default AboutPage