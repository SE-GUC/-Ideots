import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <Link to="/requests" style={{ margin: "10px", textAlign: "center" }}>
        Requests
      </Link>

      <Link to="/UserRequests" style={{ margin: "10px", textAlign: "center" }}>
        RequestsAsUser
      </Link>
    </div>

    
    
  );
}
