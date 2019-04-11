import React from "react";
import { makeStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing.unit / 2
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
}));

function ChipsArray() {
  const skills = this.props.skills;
  const addskills = [];
  for (let i = 0; i < skills.length; i++) {
    addskills.concat({ key: i, label: skills[i] });
  }
  const classes = useStyles();
  const [chipData, setChipData] = React.useState(addskills);

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        let icon = null;
        return (
          <Chip
            key={data.key}
            icon={icon}
            label={data.label}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}

export default ChipsArray;
