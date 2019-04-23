import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  }
  
});

let id = 0;
function createData(name, calories) {
  id += 1;
  return { id, name, calories };
}



function SimpleTable(props) {
  
   
  
 
    const type=props.info.type;
    console.log("typpeeeeeeinfooooooooooooo")
    console.log(props.info.type)

    var rows=[]

    
     if(type==="member"){
      const location=props.info.location
      var city=""
      var area=""
      var street=""
      
      if(location){
        city=props.info.location.city
        area=props.info.location.Area
        street= props.info.location.street
      }
      const otherContacts=props.info.otherContacts
      var contactstring=""
      if(otherContacts){
        otherContacts.forEach(function(element, i) {
          contactstring+=" "+element;
        });
        console.log(contactstring)
      }
      
      rows = [
        createData('user name', props.info.name?props.info.name:"none"),
        
        createData('type', props.info.type?props.info.type:"none"),
        createData('email',  props.info.email?props.info.email:"none" ),
        createData('rate', props.info.rate?props.info.rate:"none"),
        createData('birthDate', props.info.birthDate?props.info.birthDate:"none"),
        createData('city', city),
        createData('Area', area),
        createData('street', street),
        createData('contactstring', contactstring),
        // createData('phoneNumber', props.info.phoneNumber?props.info.phoneNumber:"none"),
        // createData('website',props.info.website?props.info.website:"none"),
        // createData('fax',props.info.fax?props.info.fax:"none"),
        // createData('address',props.info.address?props.info.address:"none"),
        // createData('fieldOfWork',props.info.fieldOfWork?props.info.fieldOfWork:"none"),
        // createData('description',props.info.description?props.info.description:"none")
      ];
    }
    else if(type==="partner"){
      const basicBussinesInformation=props.info.basicBussinesInformation
      var contactstring=""
      if(basicBussinesInformation){
        basicBussinesInformation.forEach(function(element, i) {
          contactstring+=" "+element;
        });
        console.log(contactstring)
      }
      const otherContacts=props.info.otherContacts
      var contactstringg=""
      if(otherContacts){
        otherContacts.forEach(function(element, i) {
          contactstringg+=" "+element;
        });
        console.log(contactstring)
      }
      rows = [
       createData('user name', props.info.name?props.info.name:"none"),
       createData('type', props.info.type?props.info.type:"none"),
       createData('email',  props.info.email?props.info.email:"none" ),
       createData('rate', props.info.rate?props.info.rate:"none"),
       createData('basicBussinesInformation', contactstring==""?"none":contactstring),
       createData('otherContacts', contactstringg==""?"none":contactstringg)
       
      //  createData('phoneNumber', props.info.phoneNumber?props.info.phoneNumber:"none"),
      //  createData('website',props.info.website?props.info.website:"none"),
      //  createData('fax',props.info.fax?props.info.fax:"none"),
      //  createData('address',props.info.address?props.info.address:"none"),
      //  createData('fieldOfWork',props.info.fieldOfWork?props.info.fieldOfWork:"none"),
      //  createData('description',props.info.description?props.info.description:"none")
     ];
   }
   else if(type === "consultancy_agency"){
    rows = [
     createData('user name', props.info.name?props.info.name:"none"),
     createData('type', props.info.type?props.info.type:"none"),
     createData('email',  props.info.email?props.info.email:"none" ),
     createData('rate', props.info.rate?props.info.rate:"none"),
     createData('description',props.info.description?props.info.description:"none"),
     createData('fax',props.info.fax?props.info.fax:"none"),
     createData('website',props.info.website?props.info.website:"none")
     
    //  createData('phoneNumber', props.info.phoneNumber?props.info.phoneNumber:"none"),
    //  createData('address',props.info.address?props.info.address:"none"),
    //  createData('fieldOfWork',props.info.fieldOfWork?props.info.fieldOfWork:"none"),
   ];
 }







    
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="auto">{row.calories}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  
  
};

export default withStyles(styles)(SimpleTable);
