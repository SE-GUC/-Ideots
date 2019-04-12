import React, { Component } from "react";
import Task from "./TaskItem";
import axios from "axios";

export class MyTaskList extends Component {
  state = {
    tasks: [],
    id: this.props.id
  };
  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    const { id } = this.state;
    axios.get("http://localhost:3000/api/tasks/Partner/" + id).then(res => {
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
          No More Task
        </h3>
      </div>
    );
  }
}

export default MyTaskList;
