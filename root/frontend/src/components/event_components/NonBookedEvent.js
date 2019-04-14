import React from "react";
import { Button } from "reactstrap";

export default function NonBookedEvent(props) {
  return (
    <div>
      <Button
        color="success"
        style={{
          position: "absolute",
          left: "87%",
          marginTop: "10px",
          width: 150,
          height: 100
        }}
        onClick={props.onClick.bind(this,"NonBookedEvent")}

      >
        Book
      </Button>{" "}
      ;
    </div>
  );
}
