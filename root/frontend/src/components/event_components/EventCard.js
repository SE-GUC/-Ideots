import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

class EventCard extends React.Component {
  render() {
    const { event } = this.props;
    const remainSeat = event.numberOfSpaces - event.numberOfRegisterations;
    const date = new Date(event.dateTime);
    const day = date.toLocaleDateString("en-us", { weekday: "long" });
    const monthName = date.toString().split(" ")[1];
    const month = date.getMonth();
    const year = date.getFullYear();
    return (
      <Card
        style={{
          marginBottom: "10px",
          border: "1px solid blue"
        }}
      >
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" style={{ background: "#20d86a" }}>
              {event.type.substring(0, 1)}
            </Avatar>
          }
          style={{ background: "#58c6ff" }}
          title={event.type + " in " + event.topics + " with " + event.speakers}
          subheader={day + ", " + monthName + " " + month + ", " + year}
        />
        <CardContent>
          <Typography component="p">{event.description}</Typography>
        </CardContent>
        <div style={{ display: "flex", position: "relative" }}>
          <h1> </h1>
          <div
            style={{
              position: "absolute",
              width: "70%",
              height: "60px",
              backgroundColor: "#58c6ff",
              opacity: ".8",
              lineHeight: "40px",
              textAlign: "center",
              fontSize: "20px",
              marginBottom: "5px"
            }}
          >
            {remainSeat + " Remaining Seat"}
          </div>
          <div
            style={{
              position: "absolute",
              right: "0px",
              width: "30%",
              height: "60px",
              backgroundColor: "#58c6ff",
              opacity: ".8",
              lineHeight: "40px",
              textAlign: "center",
              fontSize: "30px",
              marginBottom: "5px",
              border: "1px solid blue"
            }}
          >
            {event.registrationPrice}
          </div>
        </div>
      </Card>
    );
  }
}

export default EventCard;