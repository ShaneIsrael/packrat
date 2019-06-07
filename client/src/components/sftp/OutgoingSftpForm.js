import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { Paper, Grid, Typography, Button, Fab } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'
import CheckIcon from '@material-ui/icons/Check';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
    formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    title: {
        fontWeight: 'bold'
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
    buttonIcon: {
        margin: theme.spacing(1)
    },
    leftIcon: {
        marginRight: theme.spacing(1)
    },
    rightIcon: {
        marginLeft: theme.spacing(1)
    },
    iconSmall: {
        fontSize: 20,
    },
    grid: {
        margin: theme.spacing(2),
        height: "100%"
    },
    uploadInput: {
        display: 'none'
    },
    uploadButton: {
        margin: theme.spacing(2)
    },
    saveWrapper: {
        margin: theme.spacing(1),
        position: 'relative'
    }
})


class OutgoingSftpForm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            values: {
                clientName: '',
                publicPGPKey: '',
                sftpPort: '',
                sftpHost: '',
                sftpUsername: '',
                sftpUploadPath: ''
            },
            updatedValues: {
                clientName: '',
                publicPGPKey: '',
                sftpPort: '',
                sftpHost: '',
                sftpUsername: '',
                sftpUploadPath: ''
            }
        }

        this.timer = {}

    }
    
    componentDidMount() {
        clearTimeout(this.timer.current)
    }
    
    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState({loading: true, success: false})
            this.timer.current = setTimeout(() => {
                this.setState({loading: false, success: true})
            }, 2000)
        }
    }

    handleClientSelect = name => event => {
        // this.setState({ values: {...this.state.values}, [name]: event.target.value })
        this.setState({values:{[name]: event.target.value}})
        for(let client of this.props.clients) {
            if (client.value === event.target.value) {
                this.setState({ updatedValues:{...client}})
                break
            }
        }
        
    }

    handleClientUpdate = name => event => {
        let value = event.target.value
        this.setState(prevState => ({
            updatedValues: {
                ...prevState.updatedValues, 
                [name]: value
            }
        }))
    }

    render () {
        const { classes, clients, fieldVarient, title } = this.props;
        return (
            <Grid className={classes.grid} item>
                <Paper className={classes.paper} elevation={3}>
                    <Grid container>
                        <Typography className={classes.title}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid container>
                        <form className={classes.formContainer} noValidate autoComplete="off">
                            <TextField
                                id="outlined-select-client"
                                select
                                label="Select Client"
                                className={classes.textField}
                                value={this.state.values.clientName}
                                onChange={this.handleClientSelect('clientName')}
                                SelectProps={{
                                    MenuProps: {
                                    className: classes.menu,
                                    },
                                }}
                                helperText="Please select the client you want to update"
                                margin="normal"
                                variant="outlined"
                                >
                                {clients.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Grid container>
                                <TextField
                                    id="outlined-name"
                                    label="Client Name"
                                    className={classes.textField}
                                    value={this.state.updatedValues.clientName}
                                    onChange={this.handleClientUpdate('clientName')}
                                    margin="normal"
                                    variant={fieldVarient}
                                />
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="SFTP Host"
                                    value={this.state.updatedValues.sftpHost}
                                    onChange={this.handleClientUpdate('sftpHost')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant={fieldVarient}
                                />
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="SFTP Port"
                                    value={this.state.updatedValues.sftpPort}
                                    onChange={this.handleClientUpdate('sftpPort')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant={fieldVarient}
                                />
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="SFTP Username"
                                    value={this.state.updatedValues.sftpUsername}
                                    onChange={this.handleClientUpdate('sftpUsername')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant={fieldVarient}
                                />
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="SFTP Upload Path"
                                    value={this.state.updatedValues.sftpUploadPath}
                                    onChange={this.handleClientUpdate('sftpUploadPath')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant={fieldVarient}
                                />
                            </Grid>
                            <Grid container>
                                <input
                                    accept="*.key"
                                    className={classes.uploadInput}
                                    id="contained-upload-file"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="contained-upload-file">
                                    <Button variant="contained" component="span" className={classes.uploadButton}>
                                        Upload PGP Key
                                        <CloudUploadIcon className={classes.rightIcon} />
                                    </Button>
                                </label>
                            </Grid>

                        </form>
                    </Grid>
                    <Grid container direction="column" alignItems="flex-end" >
                        <div className={classes.saveWrapper}>
                            {!this.state.loading &&
                                <Fab color="primary" disabled={this.state.success} onClick={this.handleButtonClick}>
                                    {(this.state.success ? <CheckIcon /> : <SaveIcon />)}
                                </Fab>
                            }
                        </div>
                    </Grid>
                    {this.state.loading && <LinearProgress variant="query" />}
                </Paper>
            </Grid>


        )
    }
}

OutgoingSftpForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OutgoingSftpForm)