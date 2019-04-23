import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
// import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
// import MoreIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { ModalHeader, FormGroup, Modal, ModalBody } from "reactstrap";
import Searchcontent from "./searchContent";
import Divider from "@material-ui/core/Divider";
const styles = theme => ({
  root: {
    width: "100%",
    height: "3%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 30,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 5,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "90%",
    justifyContent: "center"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit * 60,
    paddingBottom: theme.spacing.unit,
    // paddingLeft: theme.spacing.unit * 10,
    paddingLeft: theme.spacing.unit * 60,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },

  Select: {
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    color: "#FFFFFF",
    width: 125,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    borderRadius: theme.shape.borderRadius
  }
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    searchText: "",
    searchModel: false,
    category: [],
    assignedPerson: [],
    experience: [],
    payment: [],
    event: []
  };

  toggleSearchModal() {
    this.setState({
      searchModel: !this.state.searchModel
    });
  }
  //----------------------------Added Methods-------------------------
  onChange = async e => this.setState({ [e.target.name]: e.target.value });
  keyPress = async e => {
    if (e.keyCode === 13) {
      console.log(this.props.token);
      console.log(1);
      const res = await axios.get(
        "https://lirten-hub-guc.herokuapp.com/api/tasks/search/category=" +
          this.state.searchText,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      );
      console.log(1);
      const res1 = await axios.get(
        "https://lirten-hub-guc.herokuapp.com/api/tasks/search/assignedPerson=" +
          this.state.searchText,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      );
      console.log(1);
      const res2 = await axios.get(
        "https://lirten-hub-guc.herokuapp.com/api/tasks/search/experience=" +
          this.state.searchText,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      );
      console.log(1);
      const res3 = await axios.get(
        "https://lirten-hub-guc.herokuapp.com/api/tasks/search/payment=" +
          this.state.searchText,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      );
      const res4 = await axios.get(
        "https://lirten-hub-guc.herokuapp.com/api/events/search/" + this.state.searchText,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      );
      this.setState({
        category: res.data.data,
        assignedPerson: res1.data.data,
        experience: res2.data.data,
        payment: res3.data.data,
        event: res4.data.data
      });
      console.log(res.data.data);
      {
        this.toggleSearchModal();
      }
      console.log(this.state.searchModel);
    }
  };

  //------------------------END OF Added Methods-------------------------

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.props.logOut.bind(this)}>LogOut</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: "#18202c" }}>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              Lirten-Hub
            </Typography>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              {"                  "}
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…" ////////////////////////////////////////////////////////////////////////////////
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                name="searchText"
                value={this.state.searchText}
                onChange={this.onChange}
                onKeyDown={this.keyPress}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                {/* <MoreIcon /> */}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        <Modal
          isOpen={this.state.searchModel}
          toggle={this.toggleSearchModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleSearchModal.bind(this)}>
            Search Content
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <h6>Category</h6>
              <Searchcontent tasks={this.state.category} searchBy="category" />
            </FormGroup>
            <Divider />
            <FormGroup>
              <h6>Assigned Person</h6>
              <Searchcontent
                tasks={this.state.assignedPerson}
                searchBy="assignedPerson"
              />
            </FormGroup>
            <Divider />
            <FormGroup>
              <h6>Experience</h6>
              <Searchcontent
                tasks={this.state.experience}
                searchBy="experience"
              />
            </FormGroup>
            <Divider />
            <FormGroup>
              <h6>Payment</h6>
              <Searchcontent tasks={this.state.payment} searchBy="payment" />
            </FormGroup>
            <Divider />
            <FormGroup>
              <h6>Events</h6>
              <Searchcontent tasks={this.state.event} searchBy="eventType" />
            </FormGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PrimarySearchAppBar);
