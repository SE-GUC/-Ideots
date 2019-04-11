import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/eventList" style={{ margin: "10px", textAlign: "center" }}>
        Events
      </Link>
    </div>
  );
}
