import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
// import Avatar from "@material-ui/core/Avatar";

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
    const color=isRead?"#41c300":"#E65100";//"#9C27B0":"#4a26fd"  ;"#FF9100";"#58c6ff";"#75e900";"#76FF03"
    const notificationDate = new Date(date);
    const day = notificationDate.toLocaleDateString("en-us", { weekday: "long" });
    const monthName = notificationDate.toString().split(" ")[1];
    const month = notificationDate.getMonth();
    const year = notificationDate.getFullYear();
    const { classes } = this.props;
    return (
     

     <Card style={{backgroundColor: "#f1f2f9", border: `1px solid ${color}`, margin: "2%",marginLeft:"25%",marginRight:"25%",borderRadius: 15}} 
           onClick={this.props.readNotification.bind(this, _id)} >
       
     <CardContent>
       <Typography component="p" style={{fontSize:"30px",paddingTop:"0 px"}}>{`${content}`}</Typography>
     </CardContent>
    
     <div style={{ display: "flex", position: "relative" }}>
       <h1> </h1>
       <div
         style={{
           position: "absolute",
           bottom: "0px",
           width: "60%",
           height: "70%",
           backgroundColor:color,
           opacity: ".8",
           lineHeight: "40px",
           textAlign: "right",
           fontSize: "20px",
           marginBottom: "5px",
           marginLeft:"20%",
           marginRight:"20%",
         }}
       >
       </div>
       <div
         style={{
           position: "absolute",
           bottom: "0px",
           textAlign: "right",
           fontSize: "12px",
           color:"#757575",
           marginBottom: "5px",
           marginLeft:"86%",
         }}
       >
       {day + ", " + monthName + ", " + year}
         
       </div>
       
     </div>
     {/* <CardHeader
          style={{paddingLeft:"80%",paddingTop:"-2%",fontSize:"100px"}}
          subheader={
             day + ", " + monthName + ", " + year
          }
        /> */}
    
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
