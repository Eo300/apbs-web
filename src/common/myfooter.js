import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../styles/myfooter.css';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CopyOutlined, GithubOutlined, LinkOutlined } from '@ant-design/icons';
import { Layout, Tooltip, Col, Row } from 'antd';
const { Footer } = Layout;

/**
 * This is the footer component. Serves as footer for every page
 */
class MyFooter extends Component{
    state = {
        copied: false,
        copyTooltip: "Copy to clipboard"
    }

    /** Resets text within "Copy to clipboard" tooltip   */
    tooltipCopyTextChange(){
        this.setState({ copied: true, copyTooltip: "Copied" })
        setTimeout(() => {
            this.setState({ copied: false, copyTooltip: "Copy to clipboard" })
        }, 1500);
    }

    generateCopyTooltip(text, placement){
        return (
            <Tooltip title={this.state.copyTooltip} placement={placement} >
                <CopyToClipboard text={text.trim()} onCopy={() => this.tooltipCopyTextChange()}>
                    <CopyOutlined
                        id="copyCitation"
                        className="footer-icon"
                        value={text}
                        style={{ fontSize: 26, cursor: "pointer" }} />
                </CopyToClipboard>
            </Tooltip>
        );
    }
    generateLinkTooltip(url_text, placement){
        return (
            <Tooltip title="Go to publication" placement={placement}>
                <a href={url_text} target="BLANK">
                    <LinkOutlined
                        // style={{ fontSize: 26, color: "#545456" }}
                        className="footer-icon" />
                </a>
            </Tooltip>
        );
    }

    render(){
        // PDB2PQR citation
        let pdb2pqrCitationText =
        `Dolinsky TJ, Nielsen JE, McCammon JA, Baker NA. PDB2PQR: an automated pipeline for the setup, execution,
        and analysis of Poisson-Boltzmann electrostatics calculations. Nucleic Acids Research 32 W665-W667 (2004).
        `;
        let pdb2pqrCitationLink = 'https://academic.oup.com/nar/article/32/suppl_2/W665/1040494';
        let pdb2pqrCopyTooltip = this.generateCopyTooltip(pdb2pqrCitationText, 'bottom')
        let pdb2pqrLinkTooltip = this.generateLinkTooltip(pdb2pqrCitationLink, 'bottom')
        
        // APBS citation
        let apbsCitationText = 
        `
        Baker NA, Sept D, Joseph S, Holst MJ, McCammon JA. Electrostatics of nanosystems: application to
        microtubules and the ribosome. Proc. Natl. Acad. Sci. USA 98, 10037-10041 2001.
        `;
        let apbsCitationLink = 'https://www.pnas.org/content/98/18/10037';
        let apbsCopyTooltip = this.generateCopyTooltip(apbsCitationText, 'top')
        let apbsLinkTooltip = this.generateLinkTooltip(apbsCitationLink, 'top')
        
        // New citation
        let newCitationText = 
        `
        Baker NA, Sept D, Joseph S, Holst MJ, McCammon JA. Electrostatics of nanosystems: application to
        microtubules and the ribosome. Proc. Natl. Acad. Sci. USA 98, 10037-10041 2001.
        `;

        const footerStyle = {
            // textAlign: 'center',
            fontSize: 16,
        }
        const tooltipStyle = {
            fontSize: 26
        }

        return (
            <Footer className="footer-block">
                {/* <Row><Col span={20} offset={2}>
                    <b>If using the PDB2PQR service in a publication, please cite: </b><br/>
                    <i>{pdb2pqrCitationText}</i><br/><br/>
                </Col></Row> */}
                   
                {/* <Row><Col span={20} offset={2}> */}
                <Row>
                    <Col span={20}>
                        {/* <hr/> */}
                        <br/>
                    </Col>
                </Row>
                <Row style={{ fontSize: 16 }}>
                    <Col span={20} >
                    <b>If using APBS/PDB2PQR in a publication, please cite the respective software: </b><br/>
                    {/* <i>{pdb2pqrCitationText}</i><br/><br/> */}
                    </Col>
                </Row>

                {/* PDB2PQR citation text plus its tooltips */}

                <Row>
                    <Col span={2}>
                        <b>APBS: </b>
                    </Col>
                    <Col span={16}>
                        <i>{apbsCitationText}</i>
                    </Col>

                    <Col offset={1}>
                        {/** Compo`nent specifying the copy-to-clipboard icon */}
                        {apbsCopyTooltip}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {/** Component specifying the icon to link to paper from citation */}
                        {apbsLinkTooltip}

                    </Col>

                </Row>

                {/* PDB2PQR citation text plus its tooltips */}
                <Row>
                    <Col span={2}>
                        <b>PDB2PQR: </b>
                    </Col>
                    <Col span={16}>
                        <i>{pdb2pqrCitationText}</i>
                    </Col>
                    <Col offset={1}>
                        {/** Component specifying the copy-to-clipboard icon */}
                        {pdb2pqrCopyTooltip}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {/** Component specifying the icon to link to paper from citation */}
                        {pdb2pqrLinkTooltip}
                    </Col>
                    
                </Row>
                
                <Row>
                    <br/>
                    <Col push={10}>
                        <a href="https://github.com/Electrostatics/apbs-pdb2pqr" target="_BLANK"  rel="noopener noreferrer">
                            <GithubOutlined className="footer-icon" />
                        </a>
                    </Col>
                </Row>


                {/* <Tooltip title={this.state.copyTooltip} placement="bottom" >
                    <CopyToClipboard text={pdb2pqrCitationText.trim()} onCopy={() => this.tooltipCopyTextChange()}>
                        <Icon 
                            type="copy" 
                            id="copyCitation" 
                            value={pdb2pqrCitationText} 
                            style={{ fontSize: 26, cursor: "pointer" }} 
                        />
                    </CopyToClipboard>
                </Tooltip> */}
                {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
                {/* <Tooltip title="Go to publication" placement="bottom">
                    <a href={pdb2pqrCitationLink} target="BLANK">
                        <Icon 
                            type="link" 
                            style={{ fontSize: 26, color: "#545456" }}
                        />
                    </a>
                </Tooltip> */}
                

            </Footer>
        );
    }
}

export default MyFooter;