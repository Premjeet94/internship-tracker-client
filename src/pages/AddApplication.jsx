import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddApplication = () => {
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/applications", { companyName, role, appliedDate });
      navigate("/");
    } catch (err) {
      seterror("Failed to add application");
    }
  };
  return (
    <div>
      <h2>Add Applications</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <input
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="date"
          value={appliedDate}
          onChange={(e) => setAppliedDate(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddApplication;
