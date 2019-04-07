import React, { Component } from "react";

export class TaskItem extends Component {
  //style function
  getStyle = () => {
    return {
      backgroundColor: "#f3f3f3"
    };
  };

  render() {
    return (
      <div style={this.getStyle()}>
        <h4>
          <p>
            {"category : "}
            {this.props.task.category}
          </p>
          <p>
            {"payment : "}
            {this.props.task.payment}
          </p>
          <p>
            {"required exp : "}
            {this.props.task.yearsOfExperience}
          </p>
          <p>{this.props.task.description}</p>
        </h4>
      </div>
    );
  }
}

export default TaskItem;
