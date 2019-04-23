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
    if(type==="consultancy_agency"){

  var reports=[];
  if(props.info.reports)
  reports=props.info.reports
  console.log("taaaaaaaaaasks")  
  console.log(reports)
  
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h2">
          Reports
        </Typography>
        <div>
        {reports.map(report=>(
            <li>{report}</li>
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
