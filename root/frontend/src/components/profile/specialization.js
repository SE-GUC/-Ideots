import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function PaperSheet(props) {
    const type=props.info.type;
    console.log("Specializationfasfalksfjalksjk")
    console.log(type)
  
    const { classes } = props;
    if(type==="consultancy_agency"){

  var specialization=[];
  if(props.info.specialization)
  specialization=props.info.specialization
  console.log("taaaaaaaaaasks")  
  console.log(specialization)
  
  return (

    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h2">
        Specialization
        </Typography>
        <div>
        {specialization.map(specializationn=>(
            <li>{specializationn}</li>
        )
)}
        </div>
       
        
       
      </Paper>
    </div>
  );}
  else{
    return (
        <div>
          
        </div>
      );
  }
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
