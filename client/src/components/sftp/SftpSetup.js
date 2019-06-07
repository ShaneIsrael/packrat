import React, { Component } from "react"
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"


import IncomingSftpForm from './IncomingSftpForm'
import OutgoingSftpForm from './OutgoingSftpForm'


const styles = theme => ({
    title: {
        fontSize: 18,
        fontWeight: 600
    }
})

const clientData = [
    {
        value: 'newclient',
        label: 'New Client',
        clientName: '',
        sshKey: '',
        sshUsername: '',
        whitelistedIp: '',
        publicPGPKey: '',
        sftpPort: '',
        sftpHost: '',
        sftpUsername: '',
        sftpUploadPath: ''
    },
    {
        value: '',
        label: '',
        clientName: '',
        sshKey: '',
        sshUsername: '',
        whitelistedIp: '',
        publicPGPKey: '',
        sftpPort: '22',
        sftpHost: '',
        sftpUsername: '',
        sftpUploadPath: '/uploads/'
    },
    {
        value: '',
        label: '',
        clientName: '',
        sshKey: '',
        sshUsername: '',
        whitelistedIp: '',
        publicPGPKey: '',
        sftpPort: '',
        sftpHost: '',
        sftpUsername: '',
        sftpUploadPath: ''
    }       
]
/**
 * TODO: 
 *  Ability to add multiple whitelisted ip's
 *  Ability to add multiple uploads paths     
 */
class SftpSetup extends Component {
    render() {
        let { gridSize,  fieldVarient, gridDirection } = this.props;

        return (
            <Grid container direction={gridDirection}>
                <Grid item xs="auto" sm="auto" lg={gridSize} md={gridSize}>
                    <IncomingSftpForm title="Incoming File Transmission" fieldVarient={fieldVarient} clients={clientData}/>
                </Grid>
                <Grid item xs="auto" sm="auto" lg={gridSize} md={gridSize}>
                    <OutgoingSftpForm title="Outgoing File Transmission" fieldVarient={fieldVarient} clients={clientData}/>
                </Grid>
            </Grid>

        )
    }
}
SftpSetup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SftpSetup);
