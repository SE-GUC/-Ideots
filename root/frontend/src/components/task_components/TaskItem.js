import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Skills from "../skill_components/Skill";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import "../../App.css";

const theme = createMuiTheme({});

const styles = theme => ({
  headder: {
    boxShadow: "1px 1px 5px black"
  },
  footer: {
    borderTop: "1px solid #000",
    background: "#f4f4f4",
    display: "flex",
    position: "relative"
  },
  title: {},
  subheader: {}
});

class TaskCard extends React.Component {
  render() {
    const { classes } = this.props;
    const { task } = this.props;
    const date = new Date(task.timeLine);
    const day = date.toLocaleDateString("en-us", { weekday: "long" });
    const monthName = date.toString().split(" ")[1];
    const month = date.getMonth();
    const year = date.getFullYear();
    const applyCount = task.applicants.length;

    return (
      <Card
      //#adaeb5
        style={{  backgroundColor: "#f1f2f9",border: `1px solid #130030`, margin: "2%",marginLeft:"25%",marginRight:"25%",borderRadius: 15}}       
      >
        <CardHeader
          classes={{
            root: classes.headder,
            title: classes.title,
            subheader: classes.subheader
          }}
          title={task.category + " Task"}
          subheader={
            "To Be End In " + day + ", " + monthName + " " + month + ", " + year
          }
        />
        <ThemeProvider theme={theme}>
          <CardContent>
            <Typography
              component="p"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {task.description}
            </Typography>
          </CardContent>
          <Skills skills={task.requiredSkills} />
          <div style={{ display: "flex", position: "relative" }}>
            <h1> </h1>
            <Typography
              component="p"
              style={{
                width: "70%",
                backgroundColor: "#010c73",
                opacity: ".8",
                textAlign: "center",
                fontSize: "20px",
                border: "1px solid #ccc",
                color:"#fff"
              }}
            >
              {"$ " + task.payment}
            </Typography>
            <Typography
              component="p"
              style={{
                width: "70%",
                backgroundColor: "#010c73",
                opacity: ".8",
                textAlign: "center",
                fontSize: "20px",
                border: "1px solid #ccc",
                color:"#fff"
              }}
            >
              {"Year of Experience needed " + task.yearsOfExperience}
            </Typography>
            <Typography
              component="p"
              style={{
                width: "70%",
                backgroundColor: "#010c73",
                opacity: ".8",
                textAlign: "center",
                fontSize: "20px",
                border: "1px solid #ccc",
                color:"#fff"
              }}
            >
              {applyCount + " applications"}
            </Typography>
          </div>
        </ThemeProvider>
      </Card>
    );
  }
}

TaskCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TaskCard);
