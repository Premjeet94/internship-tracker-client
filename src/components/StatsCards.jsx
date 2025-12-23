const STAT_CONFIG = [
  { status: "applied", label: "Applied", color: "bg-blue-500" },
  { status: "interview", label: "Interviews", color: "bg-purple-500" },
  { status: "offer", label: "Offers", color: "bg-green-500" },
  { status: "rejected", label: "Rejected", color: "bg-red-500" },
];

const StatsCards = ({ applications }) => {
  const getCount = (status) =>
    applications.filter((app) => app.status === status).length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {STAT_CONFIG.map(({ status, label, color }) => (
        <div
          key={status}
          className="rounded-lg bg-white dark:bg-gray-800 dark:text-white p-4 shadow-sm"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            <span className="text-sm text-gray-600">{label}</span>
          </div>
          <p className="text-2xl font-semibold">{getCount(status)}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
