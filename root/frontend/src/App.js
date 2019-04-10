import React, { Component } from 'react';
import './App.css';
import Notification from './components/notifications/Notifications'

class App extends Component {
  state={
    notifications:[
        {
            isRead: false,
            id: "5caafe2ea826e000046aa9c9",
            content: "a new task is posted",
            recieverId: "54759eb3c090d83494e2d804",
            notifierId: "54759eb3c090d83494e2d803",
            date: "2019-04-08T07:54:22.480Z",
            
        },
        {
            isRead: false,
            id: "5caaffc8a826e000046aa9e7",
            content: "A new applicant applied on the task",
            recieverId: "54759eb3c090d83494e2d804",
            notifierId: "54759eb3c090d83494e2d803",
            date: "2019-04-08T08:01:12.871Z",
            
        },
        {
            isRead: false,
            id: "5cad19f7e6f0480004560139",
            content: "Request is accepted",
            recieverId: "54759eb3c090d83494e2d804",
            notifierId: "54759eb3c090d83494e2d803",
            date: "2019-04-09T22:17:27.304Z",
            
        }
    ]
}
readNotification=(id)=>{
  console.log(id)
  this.setState({notifications:this.state.notifications.map(notification=>{
    if(notification.id===id)
      notification.isRead=true;
     return notification 
  })});

}
  render() {
    return (
      <div className="App">
          <Notification  notifications={this.state.notifications} readNotification={this.readNotification}/>
      </div>
    );
  }
}

export default App;
