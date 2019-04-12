import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      <Link to="/eventRequests" style={{ margin: "10px", textAlign: "center" }}>
        Event Request
      </Link>
    </div>

    
    
  );
}