import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-center py-3 my-4 border-top">
      <div>
        <Link to="/" className="text-muted text-decoration-none">
          {/* Content for Link */}
        </Link>
      </div>
      <div className="text-muted">© 2024 TastyTrail, Inc</div>
    </footer>
  );
}
