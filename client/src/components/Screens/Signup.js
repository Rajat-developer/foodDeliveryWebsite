import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });

    const json = await response.json();
    if (json.success) {
      navigate("/login");
    } else {
      alert("Enter valid credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="m-5">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-6">
          <div className="rounded p-4" style={{ backgroundColor: "#f8f9fa" }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="geolocation" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="geolocation"
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={onChange}
                />
              </div>
              <button type="submit" className="btn btn-success">
                SignUp
              </button>
              <Link to="/login" className="btn btn-danger ms-2">
                Login
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
