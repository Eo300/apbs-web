import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Layout, Icon, Tooltip, Col, Row } from 'antd';
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

    render(){
        let citationText =
        `Dolinsky TJ, Nielsen JE, McCammon JA, Baker NA. PDB2PQR: an automated pipeline for the setup, execution,
        and analysis of Poisson-Boltzmann electrostatics calculations. Nucleic Acids Research 32 W665-W667 (2004).
        `

        const footerStyle = {
            textAlign: 'center',
            fontSize: 16,
        }

        return(
        <Footer style={footerStyle}>
            <Row><Col span={20} offset={2}>
                <b>If using the PDB2PQR service in a publication, please cite: </b><br/>
                <i>{citationText}</i><br/><br/>
            </Col></Row>
            
            {/** Component specifying the copy-to-clipboard icon */}
            <Tooltip title={this.state.copyTooltip} placement="left" >
                <CopyToClipboard text={citationText.trim()} onCopy={() => this.tooltipCopyTextChange()}>
                    <Icon 
                        type="copy" 
                        id="copyCitation" 
                        value={citationText} 
                        style={{ fontSize: 26, cursor: "pointer" }} 
                    />
                </CopyToClipboard>
            </Tooltip>

            &nbsp;&nbsp;&nbsp;&nbsp;
            
            {/** Component specifying the icon to link to paper from citation */}
            <Tooltip title="Go to publication" placement="right">
                <a href="https://academic.oup.com/nar/article/32/suppl_2/W665/1040494" target="BLANK">
                    <Icon 
                        type="link" 
                        style={{ fontSize: 26, color: "#545456" }}
                    />
                </a>
            </Tooltip>

        </Footer>
        );
    }
}

export default MyFooter;