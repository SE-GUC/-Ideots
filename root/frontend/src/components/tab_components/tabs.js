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

function TabContainer(props) {
  return <Typography component="div">{props.children}</Typography>;
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
    //   backgroundColor: theme.palette.background.paper
  }
}));

function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Notifications" />
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
