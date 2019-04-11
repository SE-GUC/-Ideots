import React, { Component } from 'react'
import NotificationItem from './NotificationItem'
import axios from 'axios'

class Notifications extends Component {
    state={
        notifications:[]
    }

    async componentDidMount(){
        const user_id='5cae82d478cadf0004c4fdb1';  // get it from authentication
        const limit=5
        const offset=0
    
    //    await axios.get('http://localhost:3000/api/notifications').then(res=>this.setState({notifications:res.data.data}))
    // await axios.patch(`http://localhost:3000/api/notifications/${user_id}`).then(res=>this.setState({notifications:res.data.data}))
        
        await axios.get(`http://localhost:3000/api/notifications/${user_id}/${limit}/${offset}`)
                    .then(res=>this.setState({notifications:res.data.data}))
        
    }

    readNotification=(id,isRead)=>{
        this.setState({notifications:this.state.notifications.map(notification=>{
          if(notification._id===id)
            notification.isRead=isRead;
           return notification 
        })}); 
    }
    putNotification=(id)=>{
        // axios.put(`http://localhost:3000/api/notifications${id}`).then(res=>this.setState({notifications:res.data.data}))
        const isRead=true;
        const params = {"isRead": isRead}  
        axios.put(`http://localhost:3000/api/notifications/${id}`, params).then(this.readNotification(id,isRead));
        
    }

    render() {
      return (
          this.state.notifications.map(notification=>(
          <NotificationItem key={notification._id} notifications={notification} readNotification={this.putNotification}/>            
      )))
  }
}


export default Notifications