import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import EventList from "../event_components/EventList";

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

function SimpleTabs() {
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
          <Tab label="Events" />
          <Tab label="Tasks" />
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>Item One</TabContainer>}
      {value === 1 && (
        <TabContainer>
          <EventList />
        </TabContainer>
      )}
      {value === 2 && <TabContainer>Item Three</TabContainer>}
    </div>
  );
}

export default SimpleTabs;
