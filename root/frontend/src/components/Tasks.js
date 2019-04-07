import React, { Component } from "react";
import TaskItem from "./TaskItem";

class Tasks extends Component {
  render() {
    return this.props.tasks.map(task => (
      <TaskItem key={task._id} task={task} />
    ));
  }
}

export default Tasks;
