import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});

class Skill extends React.Component {
  state = {
    chipData: []
  };
  componentDidMount() {
    const skill = this.props.skills;
    let allskills = [];
    for (let i = 0; i < skill.length; i++) {
      allskills = allskills.concat([{ key: i, label: skill[i] }]);
    }
    this.setState({ chipData: allskills });
  }
  render() {
    const { classes } = this.props;

    return (
      <div style={{ borderTop: "1px solid #ccc", padding: "5px" }}>
        <Typography component="h5" style={{ textAlign: "center" }}>
          Needed Skills :
        </Typography>
        <div className={classes.root}>
          {this.state.chipData.map(data => {
            let icon = null;
            return (
              <Chip
                style={{ background: "#3f51b5", color: "white" }}
                key={data.key}
                icon={icon}
                label={data.label}
                className={classes.chip}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

Skill.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Skill);
