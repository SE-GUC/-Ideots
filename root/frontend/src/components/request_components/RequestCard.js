import React from "react";
import Card from "@material-ui/core/Card";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
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

class RequestCard extends React.Component {
  render() {
    const { classes } = this.props;
    const { request } = this.props;
    const date = new Date(request.date);
    const day = date.toLocaleDateString("en-us", { weekday: "long" });
    const monthName = date.toString().split(" ")[1];
    const month = date.getMonth();
    const year = date.getFullYear();
    const accept = request.accepted;
    const color = accept === 0 ? "blue" : accept === -1 ? "red" : "green";

    return (
      <Card
        style={{
          border: "1px solid blue",
          margin: "10px"
        }}
      >
        <ThemeProvider theme={theme}>
          <div
            style={{
              background: { color },
              width: "70%",
              opacity: ".8",
              textAlign: "center"
            }}
          >
            <Typography
              component="p"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {request.description}
            </Typography>
            <h4>{day + ", " + monthName + " " + month + ", " + year}</h4>
          </div>
        </ThemeProvider>
      </Card>
    );
  }
}

RequestCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestCard);
