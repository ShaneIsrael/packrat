import React, { Component } from "react"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from "@material-ui/core/Link"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import { amber, blue, blueGrey, brown, cyan, deepPurple, green, grey, indigo, lightGreen, lime, orange, teal, yellow, red, lightBlue, deepOrange,  pink} from "@material-ui/core/colors"
import Cookies from 'universal-cookie'
import Navbar from "../components/navigation/Navbar"
import SftpSetup from "../components/sftp/SftpSetup"
import Grid from "@material-ui/core/Grid"

const pcolors = [amber, blue, blueGrey, brown, cyan, deepPurple, green, grey, indigo, lightGreen, lime, orange, teal, yellow, red, lightBlue, deepOrange,  pink]
const scolors = [amber, blue, blueGrey, brown, cyan, deepPurple, green, grey, indigo, lightGreen, lime, orange, teal, yellow, red, lightBlue, deepOrange,  pink]



const pcolIndex = Math.floor(Math.random() * pcolors.length)
const scolIndex = Math.floor(Math.random() * pcolors.length)

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: pcolors[pcolIndex],
    secondary: scolors[scolIndex]
  }
});

const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: pcolors[pcolIndex],
      secondary: scolors[scolIndex]
    }
});


const cookies = new Cookies()

class Dashboard extends Component {

    constructor() {
        super()
        let darkThemeCookie = cookies.get('darkThemeEnabled')
        this.state = {
            darkTheme: darkThemeCookie === 'true'
        }
    }
    toggleDarkTheme = () => {
        cookies.set('darkThemeEnabled', !this.state.darkTheme)
        this.setState({darkTheme: !this.state.darkTheme})
    }
    isDarkTheme = () => {
        return this.state.darkTheme
    }
    render() {
        return (
            <MuiThemeProvider theme={this.state.darkTheme ? darkTheme : lightTheme}>
                <CssBaseline/>
                <Navbar toggleDarkTheme={this.toggleDarkTheme} isDarkTheme={this.isDarkTheme} />
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <SftpSetup fieldVarient="standard" gridSize={5} gridDirection="column" />
                    </Grid>
                </Container>
                <Typography variant="body2" color="textSecondary" align="center">
                    {"Built with love by the "}
                    <Link color="inherit" href="https://material-ui.com/">Material-UI</Link>
                    {" team."}
                </Typography>
            </MuiThemeProvider>
        );
    }
}

export default Dashboard;
