import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
// import mohanad from "../../assets/DSC_1062.jpg"
import mohanad from "../../assets/download.png"

const styles = {
  avatar: {
    margin: 1,
  },
  bigAvatar: {
    margin: 1,
    width: 150,
    height: 150,
    
  },
};

function ImageAvatars(props) {
  const { classes } = props;
  return (
    <Grid container justify="center" alignItems="center">
      <Avatar alt="MOHANAD" src={mohanad} className={classes.bigAvatar} />
    </Grid>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);