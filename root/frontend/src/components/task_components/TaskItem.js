import React from "react";
import Card from "@material-ui/core/Card";
import Skills from "../skill_components/Skill";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createMuiTheme({ typography: { useNextVariants: true } });

class EventCard extends React.Component {
  render() {
    const { task } = this.props;
    console.log(task);
    return (
      <Card
        style={{
          border: "1px solid blue",
          margin: "10px"
        }}
      >
        <ThemeProvider theme={theme}>
          <Skills skills={task.requiredSkills} />
        </ThemeProvider>
      </Card>
    );
  }
}

export default EventCard;
