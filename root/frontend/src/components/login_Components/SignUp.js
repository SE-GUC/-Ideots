import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as ReactBootstrap from 'react-bootstrap';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { DropdownButton } from 'react-bootstrap';
import Dropdown from 'react-bootstrap';
const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});
let x;
let y;
let no3="";

const SignUp = props => {
  const { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <div>
          {/* <form className={classes.form}> */}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => {
                // console.log(e.target.value)
                props.mail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password1"
              autoComplete="current-password"
              onChange={e => {
                props.pass(e.target.value);
                y=e.target.value
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input
              name="password"
              type="password"
              id="password2"
              autoComplete="current-password"
              onChange={e => {
                x=(e.target.value);
              }}
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
          <DropdownButton id="dropdown-basic-button" title="Type">
         
              <ReactBootstrap.Dropdown.Item as="button" onClick={()=>no3="member"}>Member</ReactBootstrap.Dropdown.Item>
              <ReactBootstrap.Dropdown.Item as="button" onClick={()=>no3="partner"}>Partner</ReactBootstrap.Dropdown.Item>
              <ReactBootstrap.Dropdown.Item as="button" onClick={()=>no3="consultancy_agency"}>consultancy Agency</ReactBootstrap.Dropdown.Item>
            </DropdownButton>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => props.signUpMethod(x,y,no3)}
          >
            Sign up
          </Button>
          {/* </form> */}
        </div>
      </Paper>
    </main>
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);
