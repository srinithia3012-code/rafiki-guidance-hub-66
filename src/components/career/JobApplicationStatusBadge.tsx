
import React from "react";

interface JobApplicationStatusBadgeProps {
  status: string;
}

const JobApplicationStatusBadge: React.FC<JobApplicationStatusBadgeProps> = ({ status }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Application Submitted":
        return "bg-blue-100 text-blue-800";
      case "Interview Scheduled":
      case "Interview Completed":
      case "Technical Interview":
      case "Final Interview":
        return "bg-amber-100 text-amber-800";
      case "Assessment":
        return "bg-purple-100 text-purple-800";
      case "Offer Received":
      case "Negotiation":
        return "bg-pink-100 text-pink-800";
      case "Accepted":
        return "bg-green-100 text-green-800";
      case "Rejected":
      case "Withdrawn":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(status)}`}>
      {status}
    </span>
  );
};

export default JobApplicationStatusBadge;
