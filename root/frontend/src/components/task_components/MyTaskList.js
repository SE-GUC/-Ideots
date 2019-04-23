import React, { Component } from "react";
import Task from "./TaskItem";
import axios from "axios";
import "../../App.css";
export class MyTaskList extends Component {
  state = {
    tasks: []
  };
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    axios
      .get("https://lirten-hub-guc.herokuapp.com/api/tasks/partner/partner", {
        headers: { Authorization: `Bearer ` + this.props.token }
      })
      .then(res => {
        this.setState({ tasks: res.data.task });
      });
  };

  render() {
    return (
      <div>
        {this.state.tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
        <h3
          
           className="loading"
        >
          No More Task
        </h3>
      </div>
    );
  }
}

export default MyTaskList;
