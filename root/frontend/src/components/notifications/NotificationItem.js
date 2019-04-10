import React, { Component } from 'react'

class NotificationItem extends Component {
  readNotification=()=>{

  }
  notificationStyle=()=>{
        return {
            margin:"5px",
            display:"flex",
            backgroundColor:this.props.notifications.isRead?"#90CAF9":"#f4f4f4"
        }
  }
    render() {
        // console.log(this.props.notifications)
        const {content,date,_id,notifierId,recieverId,isRead}=this.props.notifications
        return (
        <div style={this.notificationStyle()} onClick={this.props.readNotification.bind(this,_id)}>
            
                <p style={{flex:1}}> {'Content: '}{content}</p>
                <p style={{flex:1}}> {'Date: '}{date}</p>
                <p style={{flex:1}}> {'NotifierId: '}{notifierId}</p>
                <p style={{flex:1}}> {'RecieverId: '}{recieverId}</p>
                <p style={{flex:1}}> {'IsRead: '}{isRead?"Yes":"No"}</p>
                
        </div>
         )
    }
}


export default NotificationItem;
