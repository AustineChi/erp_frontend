import React from 'react';
import Button from "../../components/CustomButtons/Button.jsx";
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GridItem from "../../components/Grid/GridItem.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
import { Link } from 'react-router-dom';
import CardFooter from '../../components/Card/CardFooter.jsx';
import {USER_LOGGED_IN} from '../../actions/index';
import AclAuth from '../../actions/auth';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import LockOutline from "@material-ui/icons/LockOutline";
import classNames from 'classnames';
import logo from "../../assets/img/erplogo.png";
import bg from "assets/img/bg-image.png";
import logo2 from "../../assets/img/footerbar.png";
import { withStyles } from '@material-ui/core/styles';
import Progress from "components/Progress/Progress.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import StateLoader from "middleware/stateLoader";
const stateLoader = new StateLoader();

class LoginInfo extends React.Component {

  state = {
    data: {username:'', password:''},
	 card: {
    minWidth:12,
	 }
  }
  handleChange = event => {
    let data = this.state.data;
    data[[event.target.id]] = event.target.value; 
    this.setState({ 
      data : data,
    });
  };
  componentDidMount(){
    stateLoader.unsetState();
  }

  login = (e) => {
    {{debugger}}
    e.preventDefault();
    this.setState({loading:true});
    AclAuth.authenticate(this.state.data.username, this.state.data.password, (err,user,token) => {
      this.setState({loading:false});
      if(err) {
        this.setState({showError:true});
      return;
      }
      let u = user;
      u.token = token;
      this.props.dispatch({type: USER_LOGGED_IN, user: u});
    })
  }

  render() {
	  const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' }}
    if (this.props.redirectToReferrer === true) {
      //console.log(from);
      return <Redirect to="/dashboard" />
    }
      return (
        <div className={classes.content} style={{backgroundColor:'#082356', backgroundImage:"url(" + bg + ")", backgroundRepeat:"no-repeat"}}>
        <div className={classes.container}>
		      <GridContainer justify="center">
            <GridItem xs={12} sm={8} md={4}>
            <form onSubmit={this.login}>
            <Progress loading={this.state.loading}/>
    {(this.state.showError)?<SnackbarContent
                message={
                  'Invalid username and password, please try again'
                }
                close
                color="danger"
              /> : ""}
              <Card>
                <CardHeader color="primary" style={{background: "linear-gradient(60deg, #000, #000)"}}>
                   <center><img src={logo} /></center>
		           </CardHeader>
              <CardBody>
              <Grid container>
		            <GridItem xs={12} sm={12} md={12}>
                  <CustomInput labelText="Username" id="username" required formControlProps={{
                        fullWidth: true
                              }} inputProps={{
		                      endAdornment: (
                              <InputAdornment position="end">
                              <Face />
                              </InputAdornment>
                               ),
		                      onChange: this.handleChange,
		                          }}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                      <CustomInput labelText="Password"  id="password" required formControlProps={{
                             fullWidth: true
                              }}
                            inputProps={{
						    endAdornment: (
                              <InputAdornment position="end">
                              <LockOutline />
                              </InputAdornment>
                               ),
                            type:"password",
                            onChange: this.handleChange,
                                }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={6} md={12}>
                          <Button type="submit" color="primary" onClick={this.login}>Login</Button>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                          <Link to="/register">Are you a new Vendor? Click to create and account </Link>
                        </GridItem>
						        </Grid>
                  </CardBody>
                  <Progress loading={this.state.loading}/>
					        <img src={logo2} />
					        <CardFooter>
                    <Grid>
                      <GridItem>
				                <Link to="">Forgot Password?</Link>
                      </GridItem>
						        </Grid>
					        </CardFooter>
				        </Card>
            </form>
          </GridItem>
        </GridContainer>
        </div>
        </div>
      );
    }
}


const style = {
 margin: 15,
};

function mapStateToProps(state) {
  return {
    redirectToReferrer: state.auth.redirectToReferrer
  };
}
export default connect(mapStateToProps, null)(withStyles(loginPageStyle)(LoginInfo));
