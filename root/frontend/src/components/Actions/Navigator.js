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
import Avatar from "./Avatar";

const categories = [
  {
    id: 'Member',
    children: [
      { id: 'View Tasks', icon: <SettingsInputComponentIcon/> },
      { id: 'Submit final product', icon: <DnsRoundedIcon /> },
      { id: 'View Events', icon: <PermMediaOutlinedIcon /> },
      { id: 'Notifications', icon: <PublicIcon /> },
      { id: 'My Profile', icon: <PeopleIcon /> },
     
    ],
  },
  {
    id: 'Partner',
    children: [
      { id: 'Create New Task', icon: <PhonelinkSetupIcon /> },
      { id: 'My Tasks', icon: <SettingsInputComponentIcon /> },
      { id: 'My Products', icon: <DnsRoundedIcon /> },
      { id: 'Review Consultancy', icon: <PhonelinkSetupIcon /> },
      { id: 'Create New Request', icon: <PhonelinkSetupIcon /> },
      { id: 'Notifications', icon: <PublicIcon /> },
      { id: 'Feedbacks', icon: <PublicIcon  /> },
      { id: 'My Profile', icon: <PeopleIcon /> },
    ],
  },

  {
    id: 'Consultancy',
    children: [
      { id: 'My Descriptions', icon: <PermMediaOutlinedIcon /> },
      { id: 'My Created Tasks', icon: <PermMediaOutlinedIcon/> },
      { id: 'Notifications', icon: <PublicIcon  /> },
      { id: 'My Profile', icon: <PeopleIcon  /> },
      
    ],
  },
];

const styles = theme => ({
  categoryHeader: {
    paddingTop: 16,
    paddingBottom: 16,
    
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 4,
    paddingBottom: 4,
    color: 'rgba(255, 255, 255, 0.7)',
    
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: 16,
    paddingBottom: 16,
    
  },
  firebase: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.common.white,
    marginTop: '175px',
    
  },
  itemActionable: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    color: 'inherit',
    fontSize: theme.typography.fontSize,
    '&$textDense': {
      fontSize: theme.typography.fontSize,
      
    },
  },
  textDense: {},
  divider: {
    marginTop: theme.spacing.unit * 2,
  },
});

function Navigator(props) {
  const { classes, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
          <Avatar/>
        </ListItem>
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
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem
                button
                dense
                key={childId}
                className={classNames(
                  classes.item,
                  classes.itemActionable,
                  active && classes.itemActiveItem,
                )}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                    textDense: classes.textDense,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);