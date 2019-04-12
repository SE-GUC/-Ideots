import React, { Component } from "react";
import Task from "./TaskItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

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
    console.log(55);
    const { count, offset } = this.state;
    this.setState({ offset: offset + count });
    axios
      .get("http://localhost:3000/api/tasks/" + count + "/" + offset)
      .then(res => {
        console.log(56465);
        console.log(res.data.data);
        this.setState({ tasks: this.state.tasks.concat(res.data.data) });
        console.log(this.state);
      });
    console.log(this.state);
  };

  render() {
    return (
      <div>
        {this.state.tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    );
  }
}

export default TaskList;
