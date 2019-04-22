import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: theme.palette.background.paper
  }
});

function ListDividers(props) {
  const { classes, searchBy, tasks } = props;
  return (
    <List component="nav" className={classes.root}>
      {tasks.map(task => (
        <div>
          <ListItem button>
            <ListItemText
              primary={event.searchBy}
              secondary={event.description}
            />
          </ListItem>
          <Divider />
        </div>
      ))}
    </List>
  );
}

ListDividers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListDividers);
