import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

class NotificationItem extends Component {
  readNotification = () => {};
  notificationStyle = () => {
    return {
      margin: "5px",
      display: "flex",
      backgroundColor: this.props.notifications.isRead ? "#90CAF9" : "#f4f4f4"
    };
  };
  render() {
    const { content, date, _id, notifierId, isRead } = this.props.notifications;
    const color=isRead?"#FF9100":"#4a26fd";
    return (
     

     <Card style={{ border: "1px solid blue", margin: "2%",marginLeft:"25%",marginRight:"25%"}}  onClick={this.props.readNotification.bind(this, _id)} >
     
     <CardContent>
       <Typography component="p">{`${content}`}</Typography>
     </CardContent>
     <div style={{ display: "flex", position: "relative" }}>
       <h1> </h1>
       <div
         style={{
           position: "absolute",
           width: "60%",
           height: "100px",
           //backgroundColor: "#FF9100",//58c6ff,//4a26fd
           backgroundColor:color,
           opacity: ".8",
           lineHeight: "40px",
           textAlign: "center",
           fontSize: "20px",
           marginBottom: "5px",
           marginLeft:"20%",
           marginRight:"20%",
         }}
       >
         {'L51'}
       </div>
    
     </div>
   </Card>

    );
  }
}
/*
{
<div
  style={this.notificationStyle()}
  onClick={this.props.readNotification.bind(this, _id)}
>
  <p style={{ flex: 1 }}>
    {" "}
    {"Content: "}
    {content}
  </p>
  <p style={{ flex: 1 }}>
    {" "}
    {"Notifier_Id: "}
    {notifierId}
  </p>
  <p style={{ flex: 1 }}>
    {" "}
    {"Date: "}
    {date}
  </p>
  <p style={{ flex: 1 }}>
    {" "}
    {"Seen: "}
    {isRead ? "Yes" : "No"}
  </p>
</div>

}
 */


export default NotificationItem;
