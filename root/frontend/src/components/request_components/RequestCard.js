import React from "react";
import Card from "@material-ui/core/Card";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
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
    const { request } = this.props;
    const date = new Date(request.date);
    const day = date.toLocaleDateString("en-us", { weekday: "long" });
    const monthName = date.toString().split(" ")[1];
    const month = date.getMonth();
    const year = date.getFullYear();
    const accept = request.accepted;
    return (
      <Card
        style={{
          border: "1px solid blue",
          background:
            accept === 1 ? "#159f5c" : accept === -1 ? "#dd5246" : "#4a8af4",
            margin: "2%",marginLeft:"10%",marginRight:"15%"
        }}
        
      >
        <ThemeProvider theme={theme}>
          <div
            style={{
              opacity: ".8",
              textAlign: "center"
            }}
          >
            <h4
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {request.description}
            </h4>
            <h5>{day + ", " + monthName + " " + month + ", " + year}</h5>
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
