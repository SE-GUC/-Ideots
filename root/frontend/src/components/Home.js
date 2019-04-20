import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>


      <Link to="/eventRequests" style={{ margin: "10px", textAlign: "center" }}>
        Event Request</Link>



      <Link to="/requests" style={{ margin: "10px", textAlign: "center" }}>
        Requests
      </Link>

      <Link to="/UserRequests" style={{ margin: "10px", textAlign: "center" }}>
        RequestsAsUser
      </Link>


      <Link to="/Main" style={{ margin: "10px", textAlign: "center" }}>
        Main
      </Link>

      <Link to="/EventList" style={{ margin: "10px", textAlign: "center" }}>
        Events
      </Link>
    </div>
  );
}
