import React, { Component } from "react"
import { withStyles } from "@material-ui/core/styles"
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MaskedInput from 'react-text-mask'
import { Typography, Grid, Button, Fab } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'
import amber from '@material-ui/core/colors/amber';
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
        margin: theme.spacing(1),
        bottom: 0
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

function WhitelistedTextInput(props) {
    const { inputRef, ...other } = props
    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null)
            }}
            mask={value => Array(value.length).fill(/[\d.]/)}
            pipe={value => {
                if (value === '.' || value.startsWith('0') || value.endsWith('..')) return false
                const parts = value.split('.')
                if (parts.length > 4 || parts.some(part => part === '00' || part.startsWith('0') || part < 0 || part > 255)) {
                    return false
                }
                
                return value
            }}
            guide={false}
            placeholderChar={'\u2000'}
            keepCharPositions={true}
            showMask
        />
    )
}

WhitelistedTextInput.propTypes = {
    inputRef: PropTypes.func.isRequired
}

class IncomingSftpForm extends Component {


    constructor(props) {
        super(props)
        this.state = {
            values: {
                clientName: '',
                sshKey: '',
                sshUsername: '',
                whitelistedIp: '',
            },
            updatedValues: {
                clientName: '',
                sshKey: '',
                sshUsername: '',
                whitelistedIp: '',
            },
            loading: false,
            success: false
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
                                    label="Whitelisted IP"
                                    value={this.state.updatedValues.whitelistedIp}
                                    onChange={this.handleClientUpdate('whitelistedIp')}
                                    className={classes.textField}
                                    margin="normal"
                                    variant={fieldVarient}
                                    InputProps={{
                                        inputComponent: WhitelistedTextInput
                                    }}
                                />
                                <TextField
                                    id="outlined-uncontrolled"
                                    label="SSH Username"
                                    value={this.state.updatedValues.sshUsername}
                                    onChange={this.handleClientUpdate('sshUsername')}
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
                                        Upload SSH Key
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

IncomingSftpForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IncomingSftpForm)