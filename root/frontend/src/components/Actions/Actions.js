import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import StarBorder from '@material-ui/icons/StarBorder';
import Avatar from "./Avatar";

const styles = theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      
    },

  });
  

export class Actions extends Component {
  
    constructor(props){
        super(props)
         this.state = {
            selectedIndex: 1
        }
    }

    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
      };
    
  
    render() {
        const { classes } = this.props;
        
    return (
        
        <div className={classes.root}>

           <Avatar/>
        <List component="nav">
          <ListItem
           // button
           // selected={this.state.selectedIndex === 0}
           // onClick={event => this.handleListItemClick(event, 0)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Member" />
          </ListItem>
        </List>

        <Divider />

        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 2}
            onClick={event => this.handleListItemClick(event, 2)}
          >
            <ListItemText primary="View Tasks" />
          </ListItem>


          <ListItem
            button
            selected={this.state.selectedIndex === 3}
            onClick={event => this.handleListItemClick(event, 3)}
          >
            <ListItemText primary="Submit final product" />
          </ListItem>


          <ListItem
            button
            selected={this.state.selectedIndex === 4}
            onClick={event => this.handleListItemClick(event, 4)}
          >
            <ListItemText primary="View Events" />
          </ListItem>

          <ListItem
            button
            selected={this.state.selectedIndex === 5}
            onClick={event => this.handleListItemClick(event, 5)}
          >
            <ListItemText primary="Notifications" />
          </ListItem>

          <ListItem
            button
            selected={this.state.selectedIndex === 6}
            onClick={event => this.handleListItemClick(event, 6)}
          >
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>

        <Divider />
      

        <List component="nav">
          <ListItem
          //  button
            //selected={this.state.selectedIndex === 7}
            //onClick={event => this.handleListItemClick(event, 7)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Partner" />
          </ListItem>
        </List>
        <Divider />

        
        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 7}
            onClick={event => this.handleListItemClick(event, 7)}
          >
            <ListItemText primary="Create New Task" />
          </ListItem>
          

          <ListItem
            button
            selected={this.state.selectedIndex === 8}
            onClick={event => this.handleListItemClick(event, 8)}
          >
            <ListItemText primary="My Tasks" />
          </ListItem>

          <ListItem
            button
            selected={this.state.selectedIndex === 9}
            onClick={event => this.handleListItemClick(event, 9)}
          >
            <ListItemText primary="My Products" />
          </ListItem>
          
          <ListItem
            button
            selected={this.state.selectedIndex === 10}
            onClick={event => this.handleListItemClick(event, 10)}
          >
            <ListItemText primary="Review Consultancy" />
          </ListItem>

          <ListItem
            button
            selected={this.state.selectedIndex === 11}
            onClick={event => this.handleListItemClick(event, 11)}
          >
            <ListItemText primary="Create New Request" />
          </ListItem>
          
          <ListItem
            button
            selected={this.state.selectedIndex === 12}
            onClick={event => this.handleListItemClick(event, 12)}
          >
            <ListItemText primary="Notifications" />
          </ListItem>
          

          <ListItem
            button
            selected={this.state.selectedIndex === 13}
            onClick={event => this.handleListItemClick(event, 13)}
          >
            <ListItemText primary="Feedbacks" />
          </ListItem>
          

          <ListItem
            button
            selected={this.state.selectedIndex === 14}
            onClick={event => this.handleListItemClick(event, 14)}
          >
            <ListItemText primary="My Profile" />
          </ListItem>
          
          </List>

          <Divider />
      
          <List component="nav">
          <ListItem
          //  button
            //selected={this.state.selectedIndex === 7}
            //onClick={event => this.handleListItemClick(event, 7)}
          >
            <ListItemIcon>
              <StarBorder/>
            </ListItemIcon>
            <ListItemText primary="Consultancy" />
          </ListItem>
        </List>
        <Divider />


  
        <List component="nav">
          <ListItem
            button
            selected={this.state.selectedIndex === 15}
            onClick={event => this.handleListItemClick(event, 15)}
          >
            <ListItemText primary="My Descriptions" />
          </ListItem>

          <ListItem
            button
            selected={this.state.selectedIndex === 16}
            onClick={event => this.handleListItemClick(event, 16)}
          >
            <ListItemText primary="My Created Tasks" />
            </ListItem>

            <ListItem
            button
            selected={this.state.selectedIndex === 17}
            onClick={event => this.handleListItemClick(event, 17)}
          >
            <ListItemText primary="Notifications" />

          </ListItem>

        
          <ListItem
            button
            selected={this.state.selectedIndex === 17}
            onClick={event => this.handleListItemClick(event, 17)}
          >
            <ListItemText primary="My Profile" />

          </ListItem>

          </List>

      </div>
    
    )
  }

}
Actions.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(Actions);
