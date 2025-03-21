import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        position,
      });
      alert("Employee registered!");
      fetchEmployees();
    } catch (error) {
      console.error("Error registering employee", error);
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Employee Registration</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            maxWidth: "300px",
          }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>

        <h2>Employee List</h2>
        <ul>
          {employees.map((emp) => (
            <li key={emp._id}>
              {emp.name} - {emp.email} - {emp.position}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Register;
