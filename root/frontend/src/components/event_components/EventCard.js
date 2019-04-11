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
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe">{event.type.substring(0, 1)}</Avatar>
          }
          title={event.type + " in " + event.topics + " with " + event.speakers}
          subheader={day + ", " + monthName + " " + month + ", " + year}
        />
        <CardContent>
          <Typography component="p">{event.description}</Typography>
        </CardContent>
        <div>
          <h1> </h1>
          <div>{remainSeat + " Remaining Seat"}</div>
          <div>{event.registrationPrice}</div>
        </div>
      </Card>
    );
  }
}

export default EventCard;
