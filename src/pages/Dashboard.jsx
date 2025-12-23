import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/authContext";
import api from "../api/axios";
import { Link } from "react-router-dom";
import AddApplicationDialog from "../components/AddApplicationDialog";
import ApplicationTable from "../components/ApplicationTable";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
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
      console.error("DELETE ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Delete failed");
    }

  };
  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/applications/${id}`, { status });

      setApplications(
        applications.map((app) => (app._id === id ? res.data : app))
      );
    } catch (err) {
      console.error("UPDATE ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Update failed");
    }

  };
  const addApplication = async (companyName, role, status,appliedDate) => {

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

 if (loading) {
   return (
     <div className="flex h-screen items-center justify-center">Loading...</div>
   );
 }

 if (error) {
   return (
     <div className="flex h-screen items-center justify-center text-red-600">
       {error}
     </div>
   );
 }

    return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
        <DashboardHeader total={applications.length} onLogout={logout} />

        <div className="mx-auto max-w-6xl p-6 space-y-6">
          <AddApplicationDialog onAdd={addApplication} />

          {applications.length > 0 && (
            <StatsCards applications={applications} />
          )}

          {applications.length === 0 ? (
            <div className="rounded-lg bg-white dark:bg-gray-800 p-6 text-center text-gray-500 dark:text-gray-400">
              No applications yet. Add your first one.
            </div>
          ) : (
            <ApplicationTable
              applications={applications}
              onDelete={handleDelete}
              onStatusChange={updateStatus}
            />
          )}
        </div>
      </div>
    );

}

export default Dashboard;
