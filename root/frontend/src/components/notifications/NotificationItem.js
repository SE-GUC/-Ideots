import React, { Component } from 'react'

class NotificationItem extends Component {
  readNotification=()=>{

  }
  notificationStyle=()=>{
        return {
            margin:"5px",
            backgroundColor:this.props.notifications.isRead?"#90CAF9":"#f4f4f4"
        }
  }
    render() {
    return (
      <div style={this.notificationStyle()} onClick={this.props.readNotification}>
        
        <p > {'Content: '}{this.props.notifications.content}</p>
        <p> {'Date: '}{this.props.notifications.date}</p>
        <p> {'NotifierId: '}{this.props.notifications.notifierId}</p>
        <p> {'RecieverId: '}{this.props.notifications.recieverId}</p>
        <p> {'IsRead: '}{this.props.notifications.isRead?"Yes":"No"}</p>
        <hr/>
      </div>
    )
  }
}


export default NotificationItem;
