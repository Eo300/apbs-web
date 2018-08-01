import React, { Component } from 'react';
import 'antd/dist/antd.css';

import { Layout, Icon, Tooltip } from 'antd';
const { Footer } = Layout;

class MyFooter extends Component{
    copyCitationToClipboard(){
        // let copyText = document.getElementById("citation");
        // copyText.select();
        // document.execCommand("copy");
        // alert("copied");
    }

    render(){
        let citaitonText =
        `
        Dolinsky TJ, Nielsen JE, McCammon JA, Baker NA. PDB2PQR: an automated pipeline for the setup, execution,
        and analysis of Poisson-Boltzmann electrostatics calculations. Nucleic Acids Research 32 W665-W667 (2004).
        `

        return(
        <Footer style={{ textAlign: 'center ', fontSize: 16 }}>
            <b>If using the PDB2PQR service in a publication, please cite: </b><br/>

            {/* <div style={{ textAlign: 'center', width: '55%' }}> */}
            {/* <div id="citation"> */}
            <i>{citaitonText}</i><br/><br/>
            {/* </div> */}

            <Tooltip title="Copy to clipboard *inoperational*" placement="left">
            <Icon style={{ fontSize: 26 }} type="copy" value={citaitonText} id="copyCitation" onClick={this.copyCitationToClipboard()}/>
            </Tooltip>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tooltip title="Go to publication" placement="right">
            <a href="https://academic.oup.com/nar/article/32/suppl_2/W665/1040494" target="BLANK">
                <Icon style={{ fontSize: 26, color: "#545456" }} type="link" />
            </a>
            </Tooltip>

        </Footer>
        );
    }
}

export default MyFooter;