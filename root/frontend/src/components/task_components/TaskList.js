import React, { Component } from "react";
import Task from "./TaskItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import "../../App.css";
export class TaskList extends Component {
  state = {
    tasks: [],
    count: 2,
    offset: 0,
    hasMore: true
  };
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    const { count, offset } = this.state;
    this.setState({ offset: offset + count });
    axios
      .get(
        "https://lirten-hub-guc.herokuapp.com/api/tasks/WithRange/" + count + "/" + offset,
        {
          headers: { Authorization: `Bearer ` + this.props.token }
        }
      )
      .then(res => {
        if (res.data.data.length > 0) {
          this.setState({ tasks: this.state.tasks.concat(res.data.data) });
        } else {
          this.setState({ hasMore: false });
        }
      });
  };

  render() {
    return (
      <div>
        <InfiniteScroll
          hasMore={this.state.hasMore}
          dataLength={this.state.tasks.length}
          next={this.fetchTasks}
          endMessage={
            <h3
              className="loading"
            >
              No More Task
            </h3>
          }
          loader={
            <h3
            className="loading"
            >
              Loading...
            </h3>
          }
        >
          {this.state.tasks.map(task => (
            <Task key={task._id} task={task} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}
 
export default TaskList;
