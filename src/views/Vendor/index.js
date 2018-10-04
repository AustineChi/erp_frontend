import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";
import Dvr from "@material-ui/icons/Dvr";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import GridContainer from "components/Grid/GridContainer.jsx";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import Table from "../../components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import Approve from "@material-ui/icons/ThumbUp";
import View from "@material-ui/icons/Pageview";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import * as vendorActions from '../../actions/vendor';
import { Redirect } from 'react-router'
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";

import {connect} from 'react-redux';

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
class Index extends React.Component {

  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this);
    this.state = { 
      redirectTo:false
    };
  }
 

handler(type, id){
}


componentDidMount(){
   vendorActions.findAllVendors(this.props);
    /* else if(this.props.match.params.type){
    vendorActions.findAllVendors(this.props, this.props.match.params.type);
  } */
}

componentDidUpdate(prevProps) {
  if (this.props.match.params.type !== prevProps.match.params.type) {
    vendorActions.findAllVendors(this.props, this.props.match.params.type);
  }
}
processJson(responseJson){
  let datas = [];
  responseJson.map((row)=>{
    if(typeof row.general_info !== "undefined"){
        let arry = [];
        arry.push(row._id, row.general_info.company_name, row.general_info.contact_name, row.general_info.contact_phone,
        row.general_info.contact_email, row.status, row.classes);
        datas.push(arry);
      }
  });
  const dataTable = {
    headerRow: ["Class","Company Name", "Contact Person", "Contact Telephone", "Contact Email", "Actions"],
    footerRow: ["Class","Company Name", "Contact Person", "Contact Telephone", "Contact Email", "Actions"],
    dataRows: datas}
  return dataTable;
}

render(){
    const { classes } = this.props;
    let vendors = {"dataRows":[]};
    if(this.props.data.length> 0){
      vendors = this.processJson(this.props.data);
    }
    let data = vendors.dataRows.map((prop, key) => {
        return {
          id: key,
          class: prop[6],
          companyname: prop[1],
          contactperson: prop[2],
          contacttelephone: prop[3],
          contactemail: prop[4],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              {/* <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = this.state.data.find(o => o.id === key);

                }}
                color="info"
                className="like"
              >
                <Approve />
              </Button>{""} */}
              <Button
                justIcon
                round
                simple
                onClick={() => {
                  let obj = data.find(o => o.id === key);
                  this.setState({redirectTo:vendors.dataRows[[obj.id]][0]})
                  }}
                color="warning"
                className="edit"
              >
                 <Dvr />
              </Button>
              {/* use this button to remove the data row */}
            { (this.props.user.role === "procurement")? "": <Button
                justIcon
                round
                simple
                onClick={() => {
                 let data = this.props.data[key];
                 vendorActions.deleteVendor(this.props, data.user)
                }}
                color="danger"
                className="remove"
              >
                <Close />
              </Button>}
            </div>
          )
        };
      });
    if(this.props.loader.loading){
      return (
        <div>
          <Grid container>
            <GridItem xs={12} sm={6} md={3} style={{ margin:'20% auto'}}>
              <CircularProgress className={classes.progress} size={70} style={{ color: purple[500]}} thickness={10} />
            </GridItem>
          </Grid>
        </div>)
    }else if(this.state.redirectTo){
      return (<Redirect to={"/vendor/view/"+this.state.redirectTo}  />)
    }else{
    return (
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>Vendors</h4>
            </CardHeader>
            <CardBody>
              <ReactTable
                data={data}
                filterable
                columns={[
                  {
                    Header: "Class",
                    accessor: "class"
                  },
                  {
                    Header: "Company Name",
                    accessor: "companyname"
                  },
                  {
                    Header: "Contact Person",
                    accessor: "contactperson"
                  },
                  {
                    Header: "Contact Telephone",
                    accessor: "contacttelephone"
                  },
                  {
                    Header: "Contact Email",
                    accessor: "contactemail"
                  },
                  {
                    Header: "Actions",
                    accessor: "actions",
                    sortable: false,
                    filterable: false
                  }
                ]}
                defaultPageSize={10}
                showPaginationTop
                showPaginationBottom={false}
                className="-striped -highlight"
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
  }
}

Index.propTypes = {
  vendorActions:PropTypes.object,
  data: PropTypes.object
}

Index.defaultProps = {
  data: {"dataRows":{}}
}
function mapStateToProps(state) {
  return {
    data: state.vendors,
    loader: state.loader,
    user: state.auth.user,
  };
}


export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(Index));
