import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Request2 from "../userRequest_components/Request";
import EventRequest from "./EventRequest";
import { makeStyles } from "@material-ui/styles";

const lightColor = "rgba(255, 255, 255, 0.7)";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    //   backgroundColor: theme.palette.background.paper
    // backgroundColor:"#757575",
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 25,
    border: 50,
    color: "white",
    marginBottom: "0.5%",
    marginTop: "-7%",
    // marginLeft: '0.5%',
    // marginRight: '0.5%',
    padding: "10 10px",
    // boxShadow: '0 50px 100px 10px rgba(0, 0, 204, .7)',
    boxShadow: "0 5px 5px 2px rgba(0, 0, 204, .7)"
  },
  rootGradient: {
    // flexGrow: 15,
    // background: 'linear-gradient(45deg, #130030 , #172f63 , #130030 )',
    // background: 'linear-gradient(45deg, #01579B 30%, #84FFFF 90%)',      //blue
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 50%)',      //red
    borderRadius: 15,
    border: 10,
    color: "white",
    marginBottom: "0.5%",
    marginTop: "-7%"
    // padding: '10 10px',
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  rootBlue: {
    flexGrow: 1,
    background: "linear-gradient(45deg, #FF6F00 30%, #FFFF00 90%)",
    borderRadius: 50,
    border: 50,
    color: "white",
    marginBottom: "0.5%",
    marginTop: "-7%",
    // paddingTop: '2%',
    padding: "10 10px",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)"
  },
  indicator: {
    // backgroundColor: "#FFFF00",
    background: "linear-gradient(45deg, #FF6F00 30%, #FFFF00 90%)", //red
    height: "4px"
  },
  flexContainer: {
    backgroundColor: "#000"
  }
}));

function Header(props) {
  const classes = useStyles();
  const { onDrawerToggle } = props;
  const [value, setValue] = React.useState(props.value);
  //   var coloring = classes.root;

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={8}>
            <Grid item xs>
              <Typography color="inherit" variant="h5">
                Authentication
              </Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="outlined"
                color="inherit"
                size="small"
              >
                Web setup
              </Button>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs
          value={0}
          textColor="inherit"
          value={value}
          onChange={handleChange}
        >
          <Tab textColor="inherit" label="Task Requests" />
          <Tab textColor="inherit" label="Event Requests" />
          <Tab textColor="inherit" label="Templates" />
          <Tab textColor="inherit" label="Usage" />
        </Tabs>

        {value === 0 && (
          <Request2
            token={
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYjBmYjY0ZjljNjhlNDEyZDE3ZGM0NyIsImlhdCI6MTU1NTk2OTk5NH0.-mixyq65Ln0OelO9USWj_WRbRQfW6aRKBwtXDrlh4IY"
            }
          />
        )}
        {value === 1 && (
          <EventRequest
            token={
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYjBmYjY0ZjljNjhlNDEyZDE3ZGM0NyIsImlhdCI6MTU1NTk2OTk5NH0.-mixyq65Ln0OelO9USWj_WRbRQfW6aRKBwtXDrlh4IY"
            }
          />
        )}
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default Header;
