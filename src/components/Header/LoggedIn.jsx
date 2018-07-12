import React from 'react';
import Hidden from "@material-ui/core/Hidden";
import Person from "@material-ui/icons/Person";
import Exit from "@material-ui/icons/ExitToApp";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import CustomInput from "../CustomInput/CustomInput.jsx";
import Button from "../CustomButtons/Button.jsx";
import { connect } from 'react-redux'
import {USER_LOGGED_OUT} from '../../actions/index';
import withStyles from "@material-ui/core/styles/withStyles";
import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class  LoggedIn extends React.Component {

  render() {
    const { classes } = this.props;
    return(
    <div>
    <div className={classes.searchWrapper}>
    <CustomInput
      formControlProps={{
        className: classes.margin + " " + classes.search
      }}
      inputProps={{
        placeholder: "Search",
        inputProps: {
          "aria-label": "Search"
        }
      }}
    />
    <Button color="white" aria-label="edit" justIcon round>
      <Search />
    </Button>
  </div>
    <Button
      color={window.innerWidth > 959 ? "transparent" : "white"}
      justIcon={window.innerWidth > 959}
      simple={!(window.innerWidth > 959)}
      aria-label="Dashboard"
      className={classes.buttonLink}
    >
      <Dashboard className={classes.icons} />
      <Hidden mdUp>
        <p className={classes.linkText}>Dashboard</p>
      </Hidden>
    </Button>
    <Button
      color={window.innerWidth > 959 ? "transparent" : "white"}
      justIcon={window.innerWidth > 959}
      simple={!(window.innerWidth > 959)}
      aria-label="Person"
      className={classes.buttonLink}
    >
      <Person className={classes.icons} />
      <Hidden mdUp>
        <p className={classes.linkText}>Profile</p>
      </Hidden>
    </Button> 
    <Button
      color={window.innerWidth > 959 ? "transparent" : "white"}
      justIcon={window.innerWidth > 959}
      simple={!(window.innerWidth > 959)}
      aria-label="Person"
      className={classes.buttonLink}
      onClick={this.props.Logout}
    >
      <Exit className={classes.icons} />
      <Hidden mdUp>
        <p className={classes.linkText}>Logout</p>
      </Hidden>
    </Button> 
    </div>
)}
}

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => dispatch({type:USER_LOGGED_OUT})
  }
}
export default connect(null, mapDispatchToProps)(withStyles(headerLinksStyle)(LoggedIn));