import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import api from "../api/axios";
import { Link } from "react-router-dom";
import AddApplicationDialog from "../components/AddApplicationDialog";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState("");
  const { logout } = useAuth();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get("/applications");
        setApplications(res.data);
      } catch (err) {
        seterror("Failed to load Applications");
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      setApplications(applications.filter((app) => app._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };
  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/applications/${id}`, { status });

      setApplications(
        applications.map((app) => (app._id === id ? res.data : app))
      );
    } catch (err) {
      alert("Update failed");
    }
  };
  const addApplication = async (companyName, role, status,appliedDate) => {
    console.log({
      companyName,
      role,
      status,
      appliedDate,
    });

    try {
      const res = await api.post("/applications", {
        companyName,
        role,
        status,
        appliedDate,
      });

      // add new application at top
      setApplications([res.data, ...applications]);
    }catch (err) {
  console.error("ADD ERROR:", err.response?.data || err);
  alert(err.response?.data?.message || "Failed to add application");
}

  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>My Applications</h2>
      <button onClick={logout}>Logout</button>
      <AddApplicationDialog onAdd={addApplication} />
      {applications.length === 0 ? (
        <p>No Applications Yet</p>
      ) : (
        <ul>
          {applications.map((app) => {
            return (
              <li key={app._id}>
                <strong>{app.companyName}</strong>-{app.role}- {app.status}{" "}
                <select
                  value={app.status}
                  onChange={(e) => updateStatus(app._id, e.target.value)}
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button onClick={() => handleDelete(app._id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
