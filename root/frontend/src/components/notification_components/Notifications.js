import React, { Component } from 'react'
import NotificationItem from './NotificationItem'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";

class Notifications extends Component {
    state={
        notifications:[],
        count: 7,
        offset: 0,
        hasMore: true
    }
    componentDidMount() {
        this.fetchNotifications();
      }
    
      fetchNotifications= () => {
        const { count, offset } = this.state;
        const user_id='5cae82d478cadf0004c4fdb1';  // get it from authentication
        this.setState({ offset: offset + count });
        // await axios.get(`http://localhost:3000/api/notifications/${user_id}/${count}/${offset}`)
        //             .then(res=>this.setState({notifications:res.data.data}))
        
         axios.get(`http://localhost:3000/api/notifications/${user_id}/${count}/${offset}`)
          .then(res => {
            if (res.data.data.length > 0) {
              this.setState({ notifications: this.state.notifications.concat(res.data.data) });
            } else {
              this.setState({ hasMore: false });
            }
          });
      };


/*

    async componentDidMount(){
        const user_id='5cae82d478cadf0004c4fdb1';  // get it from authentication
        const limit=5
        const offset=0
    
    //    await axios.get('http://localhost:3000/api/notifications').then(res=>this.setState({notifications:res.data.data}))
    // await axios.patch(`http://localhost:3000/api/notifications/${user_id}`).then(res=>this.setState({notifications:res.data.data}))
        
        await axios.get(`http://localhost:3000/api/notifications/${user_id}/${limit}/${offset}`)
                    .then(res=>this.setState({notifications:res.data.data}))
        
    }

*/



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
/*
    render2() {
      return (
          this.state.notifications.map(notification=>(
          <NotificationItem key={notification._id} notifications={notification} readNotification={this.putNotification}/>            
      )))
  }
  */
  render() {
    return (
      <div>
        <InfiniteScroll
          hasMore={this.state.hasMore}
          dataLength={this.state.notifications.length}
          next={this.fetchNotifications}
          endMessage={
            <h3
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#ccc",
                lineHeight: "50px",
                textAlign: "center",
                fontSize: "20px",
                marginBottom: "5px"
              }}
            >
              No More Event
            </h3>
          }
          loader={
            <h3
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#ccc",
                lineHeight: "50px",
                textAlign: "center",
                fontSize: "20px",
                marginBottom: "5px"
              }}
            >
              Loading...
            </h3>
          }
        >
          {this.state.notifications.map(notification => (
              <NotificationItem key={notification._id} notifications={notification} readNotification={this.putNotification}/>            
          ))}
        </InfiniteScroll>
      </div>
    );
  }



}


export default Notifications