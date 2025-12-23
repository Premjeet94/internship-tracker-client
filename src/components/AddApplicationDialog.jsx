import { useState } from "react";
import { Plus, X } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "offer", label: "Offer" },
  { value: "rejected", label: "Rejected" },
];

const AddApplicationDialog = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("applied");
  const [appliedDate, setAppliedDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!companyName.trim() || !role.trim()) return;

    onAdd(companyName.trim(), role.trim(), status,appliedDate);

    setCompanyName("");
    setRole("");
    setStatus("applied");
    setOpen(false);
    setAppliedDate('')
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        <Plus className="h-4 w-4" />
        Add Application
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Application</h2>
              <button onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Company Name
                </label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Google"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Role</label>
                <input
                  className="mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Software Engineer Intern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Applied Date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  value={appliedDate}
                  onChange={(e) => setAppliedDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-md border px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddApplicationDialog;
