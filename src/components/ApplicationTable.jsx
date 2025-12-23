import { Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

const STATUSES = ["applied", "interview", "offer", "rejected"];

const ApplicationTable = ({ applications, onStatusChange, onDelete }) => {
  if (applications.length === 0) {
    return (
      <div className="rounded-lg bg-white p-8 text-center text-gray-500">
        No applications yet. Add your first one.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg bg-white dark:bg-gray-800 dark:text-white shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Company
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Status
            </th>
            <th className="px-4 py-3 text-right text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="border">
          {applications.map((app) => (
            <tr key={app._id} className="border-t hover:bg-gray-700 transition">
              <td className="px-4 py-3 font-medium">{app.companyName}</td>

              <td className="px-4 py-3 text-gray-600">{app.role}</td>

              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <StatusBadge status={app.status} />

                  <select
                    value={app.status}
                    onChange={(e) => onStatusChange(app._id, e.target.value)}
                    className="rounded-md border px-2 py-1 text-sm"
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </td>

              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => onDelete(app._id)}
                  className="rounded p-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
