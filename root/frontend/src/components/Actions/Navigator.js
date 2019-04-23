import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
import Avatar from './Avatar';
import { Link, LinearProgress } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import EventList from '../event_components/EventList';
import Tabs from '../tab_components/tabs';
import MyEventList from '../event_components/MyEventList';

const categories = [
  {
    id: 'Member',
    children: [
      { id: 'Notifications', icon: <PublicIcon />, link: '/Main/Notifications' },
      { id: 'View Tasks', icon: <SettingsInputComponentIcon />, link: '/Main/Tasks'  },
      // { id: 'Submit final product', icon: <DnsRoundedIcon /> },
      {id: 'View Events',icon: <PermMediaOutlinedIcon />,link: '/Main/MyEvents'},
      { id: 'My Profile', icon: <PeopleIcon />, link: '/profile' }
    ]
  },
  {
    id: 'Partner',
    children: [
      { id: 'Notifications', icon: <PublicIcon />,link: '/Main/Notifications' },
      { id: 'My Tasks', icon: <SettingsInputComponentIcon /> , link: '/Main/Tasks' },
      { id: 'Create New Task', icon: <PhonelinkSetupIcon /> ,link: '/Main/Tasks'},
      // { id: 'My Products', icon: <DnsRoundedIcon /> },
      // { id: 'Review Consultancy', icon: <PhonelinkSetupIcon /> },
      // { id: 'Create New Request', icon: <PhonelinkSetupIcon /> },
      // { id: 'Feedbacks', icon: <PublicIcon /> },
      { id: 'My Profile', icon: <PeopleIcon /> , link: '/profile'}
    ]
  },

  {
    id: 'Consultancy',
    children: [
      { id: 'Notifications', icon: <PublicIcon />,link: '/Main/Notifications' },
      { id: 'My Created Tasks', icon: <PermMediaOutlinedIcon/> , link: '/Main/Tasks'},
      { id: 'My Descriptions', icon: <PermMediaOutlinedIcon /> , link: '/Main/Tasks'},
      { id: 'My Profile', icon: <PeopleIcon /> , link: '/profile'}
    ]
  }
];

function reload() {
  return window.setTimeout(refresh, 300);
}

function refresh() {
  return window.location.reload();
}

const styles = theme => ({
  categoryHeader: {
    paddingTop: 14,
    paddingBottom: 14
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    marginTop: '1 px',
    backgroundColor: "#18202c",   //background under photo
    
  },
  itemActionableMember: {
    '&:hover': {
      backgroundColor:'#B3E5FC', //'#FFFF00',
      color:"#000"
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActionablePartner: {
    '&:hover': {
      backgroundColor:'#03A9F4',// '#FE6B8B',
      color:"#000"
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActionableConsultancy: {
    '&:hover': {
      backgroundColor:'#01579B', //'#FF8E53',
      color:"#fff"
      // backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7'
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize
    }
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2
  }
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant='permanent' {...other}>
      <List disablePadding>
        <Router>
        <h1 style={{color:"white",textAlign: "center"}}>
          Lirten-Hub
        </h1>
              
          <ListItem
            className={classNames(
              classes.firebase,
              classes.item,
              classes.itemCategory
            )}
          >
            <Avatar />
          </ListItem>
          {/*
          <ListItem className={classNames(classes.item, classes.itemCategory)}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              classes={{
                primary: classes.itemPrimary,
              }}
            >
              Tools & Actions
            </ListItemText>
          </ListItem>
            */}
          {categories.map(({ id, children }) => (
            <React.Fragment key={id}>
              <ListItem className={classes.categoryHeader}>
                <ListItemText
                  classes={{
                    primary: classes.categoryHeaderPrimary
                  }}
                >
                  {id}
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, link , active}) => (
                <ListItem
                  onClick={reload}
                  component={RouterLink}
                  to={link}
                  props= {{
                    value:1
                  }}
                  button
                  dense
                  key={childId}
                  className={classNames(
                    classes.item,
                     classes.itemActionable,
                     id==='Member'?classes.itemActionableMember:id==='Partner'?classes.itemActionablePartner:classes.itemActionableConsultancy,
                     active && classes.itemActiveItem,
                     )}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    classes={{
                      primary: classes.itemPrimary,
                      textDense: classes.textDense
                    }}
                  >
                    {childId}
                  </ListItemText>
                </ListItem>
              ))}
              <Divider className={classes.divider} />
            </React.Fragment>
          ))}
        </Router>
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navigator);

// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';

// const drawerWidth = 240;

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   menuButton: {
//     marginLeft: 12,
//     marginRight: 36,
//   },
//   hide: {
//     display: 'none',
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerClose: {
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     width: theme.spacing.unit * 7 + 1,
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing.unit * 9 + 1,
//     },
//   },
//   toolbar: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     padding: '0 8px',
//     ...theme.mixins.toolbar,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing.unit * 3,
//   },
// });

// class MiniDrawer extends React.Component {
//   state = {
//     open: false,
//   };

//   handleDrawerOpen = () => {
//     this.setState({ open: true });
//   };

//   handleDrawerClose = () => {
//     this.setState({ open: false });
//   };

//   render() {
//     const { classes, theme } = this.props;

//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         <AppBar
//           position='fixed'
//           className={classNames(classes.appBar, {
//             [classes.appBarShift]: this.state.open,
//           })}
//         >
//           <Toolbar disableGutters={!this.state.open}>
//             <IconButton
//               color='inherit'
//               aria-label='Open drawer'
//               onClick={this.handleDrawerOpen}
//               className={classNames(classes.menuButton, {
//                 [classes.hide]: this.state.open,
//               })}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant='h6' color='inherit' noWrap>

//             </Typography>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           variant='permanent'
//           className={classNames(classes.drawer, {
//             [classes.drawerOpen]: this.state.open,
//             [classes.drawerClose]: !this.state.open,
//           })}
//           classes={{
//             paper: classNames({
//               [classes.drawerOpen]: this.state.open,
//               [classes.drawerClose]: !this.state.open,
//             }),
//           }}
//           open={this.state.open}
//         >
//           <div className={classes.toolbar}>
//             <IconButton onClick={this.handleDrawerClose}>
//               {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//             </IconButton>
//           </div>
//           <Divider />
//           <List>
//             {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
//               <ListItem button key={text}>
//                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//           <Divider />
//           <List>
//             {['All mail', 'Trash', 'Spam'].map((text, index) => (
//               <ListItem button key={text}>
//                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Drawer>

//       </div>
//     );
//   }
// }

// MiniDrawer.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

// export default withStyles(styles, { withTheme: true })(MiniDrawer);
