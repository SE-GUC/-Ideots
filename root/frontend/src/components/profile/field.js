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
    console.log("pppppppppppppppppppppppppppppppppppppppppppppppppppp")
    console.log(type)
  
    const { classes } = props;
    if(type==="member"){
  var field=[];
  if(props.info.field)
  field=props.info.field
  console.log("experienceiiiiiiii")  
  console.log(field)
  
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h2">
           user fields
        </Typography>
        <div>
        {field.map(fieldd=>(
            <li>{fieldd}</li>
        )
)}
        </div>
  
      </Paper>
    </div>
  );}
  else if(type==="partner"){
    var fieldOfWork=[];
  if(props.info.fieldOfWork)
  fieldOfWork=props.info.fieldOfWork
  console.log("experienceiiiiiiii000000000000000000000000000000000000")  
  console.log(fieldOfWork)
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h2">
            fields of work
        </Typography>
        <div>
        {fieldOfWork.map(fieldOfWorkk=>(
            <li>{fieldOfWorkk}</li>
        )
)}
        </div>
  
      </Paper>
    </div>
  );
  }
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
