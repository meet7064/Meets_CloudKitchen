import React from "react";
import { CSVLink } from "react-csv";

const ExportCSV = ({ admins }) => {
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];

  return (
    <div className="mt-6">
      <CSVLink
        data={admins}
        headers={headers}
        filename={"admin-activity-log.csv"}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        📥 Export CSV
      </CSVLink>
    </div>
  );
};

export default ExportCSV;
