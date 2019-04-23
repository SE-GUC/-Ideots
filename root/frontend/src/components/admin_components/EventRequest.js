import React, { Component } from "react";
import axios from "axios";
import {
  Input,
  FormGroup,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Button
} from "reactstrap";
class EventRequest extends Component {
  state = {
    requests: [],

    editRequestData: {
      id: "",
      acceptenceState: ""
    },
    newRequestModal: false,
    editRequestModal: false
  };

  toggleEditRequestModal() {
    this.setState({
      editRequestModal: !this.state.editRequestModal
    });
  }

  getRequests = async () => {
    const res = await axios.get("http://localhost:3000/api/eventrequests/");
    this.setState({ requests: res.data.data });
  };

  updateRequest = async () => {
    let { acceptenceState } = this.state.editRequestData;
    try {
      await axios
        .put(
          "http://localhost:3000/api/eventrequests/" +
            this.state.editRequestData.id,
          {
            acceptenceState
          }
        )
        .then(response => {
          this.getRequests();
          this.setState({
            editRequestModal: false,
            editRequestData: { id: "", acceptenceState: "" }
          });
        });
    } catch (error) {
      alert("Something went wrong");
    }
  };
  editRequest(id, acceptenceState) {
    this.setState({
      editRequestData: { id, acceptenceState },
      editRequestModal: !this.state.editRequestModal
    });
  }
  deleteRequest(id) {
    axios
      .delete("http://localhost:3000/api/eventrequests/" + id)
      .then(response => {
        this.getRequests();
      });
  }

  render() {
    this.getRequests();

    let requests = this.state.requests
      ? this.state.requests.map(request => {
          const acceptance =
            request.acceptenceState === undefined ||
            request.acceptenceState === 0
              ? "pending"
              : request.acceptenceState === 1
              ? "Accepted"
              : "Rejected";
          return (
            <tr key={request.id}>
              <td style={{ color: "#fff", flex: 1, flexWrap: "wrap" }}>
                {request.description}
              </td>

              <td style={{ color: "#fff" }}>{acceptance}</td>
              <td style={{ color: "#fff" }}>{request.dateTime}</td>
              <td>
                <Button
                  color="success"
                  size="sm"
                  className="mr-2"
                  onClick={this.editRequest.bind(
                    this,
                    request["_id"],
                    request.acceptenceState
                  )}
                >
                  Edit
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={this.deleteRequest.bind(this, request["_id"])}
                >
                  Delete
                </Button>
              </td>
            </tr>
          );
        })
      : "";
    return (
      <div className="App container">
        <h1 style={{ color: "#fff" }}>Requests</h1>

        <Modal
          isOpen={this.state.editRequestModal}
          toggle={this.toggleEditRequestModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditRequestModal.bind(this)}>
            Edit a new Request
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="acceptenceState">acceptenceState</Label>
              <Input
                id="acceptenceState"
                value={this.state.editRequestData.acceptenceState}
                onChange={e => {
                  let { editRequestData } = this.state;

                  editRequestData.acceptenceState = e.target.value;

                  this.setState({ editRequestData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateRequest.bind(this)}>
              Update Request
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditRequestModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead style={{ flex: 1, flexWrap: "wrap" }}>
            <tr>
              <th style={{ color: "#fff", flexDirection: "column", flex: 0.8 }}>
                Description
              </th>

              <th style={{ color: "#fff" }}>acceptenceState</th>
              <th style={{ color: "#fff" }}>Date</th>
              <th style={{ color: "#fff" }}>Actions</th>
            </tr>
          </thead>

          <tbody>{requests}</tbody>
        </Table>
      </div>
    );
  }
}
export default EventRequest;
