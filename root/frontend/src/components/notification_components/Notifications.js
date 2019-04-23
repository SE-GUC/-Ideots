import React, { Component } from "react";
import NotificationItem from "./NotificationItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";


import "../../App.css";
class Notifications extends Component {
  state = {
    notifications: [],
    count: 7,
    offset: 0,
    hasMore: true
  };
  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications = () => {
    const { count, offset } = this.state;
    this.setState({ offset: offset + count });
   // console.log(this.props.token)
    axios
      .get(`https://lirten-hub-guc.herokuapp.com/api/notifications/${count}/${offset}`, {headers: { Authorization: `Bearer ` + this.props.token }
      })
      .then(res => {
        if (res.data.data.length > 0) {
          this.setState({
            notifications: this.state.notifications.concat(res.data.data)
          });
        } else {
          this.setState({ hasMore: false });
        }
      });
  };

  readNotification = (id, isRead) => {
    this.setState({
      notifications: this.state.notifications.map(notification => {
        if (notification._id === id) notification.isRead = isRead;
        return notification;
      })
    });
  };
  putNotification = id => {
    const isRead = true;
    const params = { isRead: isRead };
    axios
      .put(`https://lirten-hub-guc.herokuapp.com/api/notifications/${id}`,params,  {headers: { Authorization: `Bearer ` + this.props.token }})
      .then(this.readNotification(id, isRead));
  };

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
              backgroundColor: "#fff",
             
            }}
              className="loading"
            >
              No More Notification
            </h3>
          }
          loader={
            <h3
            style={{
              backgroundColor: "#fff",
            }}
              className="loading"
            >
              Loading...
            </h3>
          }
        >
          {this.state.notifications.map(notification => (
            <NotificationItem
              key={notification._id}
              notifications={notification}
              readNotification={this.putNotification}
            />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
export default Notifications;
