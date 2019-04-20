import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
// import EventList from "../event_components/EventList";
import TaskList from "../task_components/TaskList";
import NotificationList from "../notification_components/Notifications";
// import {Link} from 'react-router-dom'
import MyTask from "../task_components/MyTaskList";
import MyEvent from "../event_components/MyEventList";
import Request from "../request_components/RequestList";
import RequestAsUser from "../userRequest_components/RequestAsUser";
import Request2 from "../userRequest_components/Request";

import { withStyles } from '@material-ui/core/styles';

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //   backgroundColor: theme.palette.background.paper
    // backgroundColor:"#757575",
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 50,
    border: 50,
    color: 'white',
    marginBottom: '0.5%',
    marginTop: '-7%',
    padding: '10 10px',
    // boxShadow: '0 50px 100px 10px rgba(0, 0, 204, .7)',
    boxShadow: '0 3px 5px 2px rgba(0, 0, 204, .7)',
  },
  rootGradient: {
    // flexGrow: 15,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 15,
    border: 10,
    color: 'white',
    marginBottom: '0.5%',
    marginTop: '-7%',
    // padding: '10 10px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  rootBlue: {
    flexGrow: 1,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    borderRadius: 50,
    border: 50,
    color: 'white',
    marginBottom: '0.5%',
    marginTop: '-5%',
    // paddingTop: '2%',
    padding: '10 10px',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  },
  indicator: {
    backgroundColor: "#FFFF00"
  },
  flexContainer:{
    backgroundColor:"#000",
  },
  
  
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  var coloring=classes.root;

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <div className={value===0?classes.rootGradient:classes.root}>
      <AppBar position="static" >
        <Tabs  classes={{ indicator: classes.indicator 
                          }} 
                value={value} onChange={handleChange}>
          <Tab indicatorColor={"#000"} label="Notifications" />
          <Tab label="Tasks" />
          <Tab label="MyTasks" />
          <Tab label="MyEvents" />
          <Tab label="Requests" />
          <Tab label="RequestAsUser" />
          <Tab label="RequestsAsAdmin" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <NotificationList token={props.token} />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <TaskList token={props.token} />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <MyTask token={props.token} />
        </TabContainer>
      )}
      {value === 3 && (
        <TabContainer>
          <MyEvent token={props.token} />
        </TabContainer>
      )}
      {value === 4 && (
        <TabContainer>
          <Request token={props.token} />
        </TabContainer>
      )}
       {value === 5 && (
        <TabContainer>
          <RequestAsUser token={props.token} />
        </TabContainer>
      )}
       {value === 6 && (
        <TabContainer>
          <Request2 token={props.token} />
        </TabContainer>
      )}
    </div>
  );
}
export default SimpleTabs;
