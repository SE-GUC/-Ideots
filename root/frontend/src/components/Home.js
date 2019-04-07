import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Link to="/search" style={{ margin: "10px", textAlign: "center" }}>
        Search Tasks By Category
      </Link><Link to="/search" style={{ margin: "10px", textAlign: "center" }}>
        Search Tasks By Experience
      </Link>
      <Link to="/requests" style={{ margin: "10px", textAlign: "center" }}>
        Requests
      </Link>
    </div>
  );
}
