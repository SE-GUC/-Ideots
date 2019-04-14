import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import logo from '../../logo.svg';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

function PermanentDrawerLeft(props) {
  const style={height:200 }
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit"  noWrap >
            ADMIN HOME PAGE
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
      
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img src={logo} className="App-logo" alt="logo" height="10px" style={style} />
        <div className={classes.toolbar} />
        <Divider />
        
        <List>
          {['taskReques','Event request'].map((text) => (
            <ListItem button key={text}>
              
              <ListItemText primary={text} />
            </ListItem>
            
          )
          )}
        </List>
        <Divider />
        
      </Drawer>
      <main className={classes.content}>
     
      
        <div className={classes.toolbar} />
        
      </main>
      
    </div>
  );
}

PermanentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermanentDrawerLeft);
