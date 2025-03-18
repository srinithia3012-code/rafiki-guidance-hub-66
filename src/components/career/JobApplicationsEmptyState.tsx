
import React from "react";

const JobApplicationsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-8 border rounded-lg">
      <p className="text-gray-500">No job applications yet. Add your first one!</p>
    </div>
  );
};

export default JobApplicationsEmptyState;
