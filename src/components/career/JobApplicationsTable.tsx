
import React from "react";
import { JobApplication } from "@/services/career";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, parseISO } from "date-fns";
import JobApplicationStatusBadge from "./JobApplicationStatusBadge";
import JobApplicationActions from "./JobApplicationActions";

interface JobApplicationsTableProps {
  applications: JobApplication[];
  onEditApplication: (application: JobApplication) => void;
  onDeleteApplication: (id: string) => void;
}

const JobApplicationsTable: React.FC<JobApplicationsTableProps> = ({
  applications,
  onEditApplication,
  onDeleteApplication,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next Steps</TableHead>
            <TableHead className="w-[60px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell className="font-medium">{application.company_name}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>
                {format(parseISO(application.application_date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <JobApplicationStatusBadge status={application.status} />
              </TableCell>
              <TableCell>{application.next_steps || "-"}</TableCell>
              <TableCell>
                <JobApplicationActions 
                  application={application}
                  onEdit={onEditApplication}
                  onDelete={onDeleteApplication}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobApplicationsTable;
