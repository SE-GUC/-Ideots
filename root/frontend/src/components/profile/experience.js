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
  var experience=[];
  if(props.info.experience)
  experience=props.info.experience
  console.log("experienceiiiiiiii")  
  console.log(experience)
  
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h2">
           user experience
        </Typography>
        <div>
        {experience.map(experienc=>(
            <li>{experienc}</li>
        )
)}
        </div>
  
      </Paper>
    </div>
  );}
  else {return(<div></div>)}
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
