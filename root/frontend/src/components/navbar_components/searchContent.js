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
              primary={
                searchBy == "category"
                  ? task.category
                  : searchBy == "payment"
                  ? task.payment
                  : searchBy == "experience"
                  ? task.yearsOfExperience
                  : searchBy == "eventType"
                  ? task.type
                  : task.requiredSkills
              }
              secondary={task.description}
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
