import React, { Component } from 'react'
import NotificationItem from './NotificationItem'


class Notifications extends Component {
  render() {
      return (this.props.notifications.map(notification=>(
            <NotificationItem key={notification.id} notifications={notification} readNotification={this.props.readNotification}/>            
      )))
  }
}


export default Notifications