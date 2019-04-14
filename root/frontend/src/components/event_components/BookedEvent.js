import React from "react";
import { Button } from "reactstrap";
export default function BookedEvent(props) {
  return (
    <div>
      <Button
        color="secondary"
        style={{
          position: "absolute",
          left: "87%",
          marginTop: "10px",
          width: 150,
          height: 100
        }}
        onClick={props.onClick.bind(this,"BookedEvent")}
      >
        Booked
      </Button>{" "}
      ;
    </div>
  );
}
