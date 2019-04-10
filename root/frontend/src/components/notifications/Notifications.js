import React, { Component } from 'react'
import NotificationItem from './NotificationItem'
import axios from 'axios'

class Notifications extends Component {
    state={
        notifications:[]
    }

    componentDidMount(){
        axios.get('http://localhost:3000/api/notifications').then(res=>this.setState({notifications:res.data.data}))
        // axios.get('http://localhost:3000/api/notifications').then(res=>console.log(res.data.data))
        // console.log(this.state.notifications)
    }

    readNotification=(id)=>{
        this.setState({notifications:this.state.notifications.map(notification=>{
          if(notification._id===id)
            notification.isRead=true;
           return notification 
        })});
      
    }
    render() {
      return (this.state.notifications.map(notification=>(
          console.log('1',notification),
          <NotificationItem key={notification._id} notifications={notification} readNotification={this.readNotification}/>            
      )))
  }
}


export default Notifications