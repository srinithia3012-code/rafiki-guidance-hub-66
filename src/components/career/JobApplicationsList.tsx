
import React, { useState } from "react";
import { JobApplication, deleteJobApplication } from "@/services/career";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format, parseISO } from "date-fns";
import { Edit, MoreVertical, Trash2, Plus } from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface JobApplicationsListProps {
  userId: string;
  applications: JobApplication[];
  onApplicationChange: () => void;
}

const JobApplicationsList: React.FC<JobApplicationsListProps> = ({
  userId,
  applications,
  onApplicationChange,
}) => {
  const { toast } = useToast();
  const [isNewApplicationDialogOpen, setIsNewApplicationDialogOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<JobApplication | null>(null);
  const [deletingApplicationId, setDeletingApplicationId] = useState<string | null>(null);

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

  const handleDeleteApplication = async (id: string) => {
    try {
      await deleteJobApplication(id);
      onApplicationChange();
      setDeletingApplicationId(null);
    } catch (error) {
      console.error("Error deleting application:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete application",
        description: "Please try again later.",
      });
    }
  };

  const handleApplicationSuccess = () => {
    setIsNewApplicationDialogOpen(false);
    setEditingApplication(null);
    onApplicationChange();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Job Applications</h3>
        <Dialog open={isNewApplicationDialogOpen} onOpenChange={setIsNewApplicationDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Job Application</DialogTitle>
            </DialogHeader>
            <JobApplicationForm 
              userId={userId} 
              onSuccess={handleApplicationSuccess}
              onCancel={() => setIsNewApplicationDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-gray-500">No job applications yet. Add your first one!</p>
        </div>
      ) : (
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
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(application.status)}`}>
                      {application.status}
                    </span>
                  </TableCell>
                  <TableCell>{application.next_steps || "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Dialog open={!!editingApplication} onOpenChange={(open) => !open && setEditingApplication(null)}>
                          <DialogTrigger asChild>
                            <DropdownMenuItem 
                              onSelect={(e) => {
                                e.preventDefault();
                                setEditingApplication(application);
                              }}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Edit Job Application</DialogTitle>
                            </DialogHeader>
                            {editingApplication && (
                              <JobApplicationForm 
                                userId={userId} 
                                existingApplication={editingApplication}
                                onSuccess={handleApplicationSuccess}
                                onCancel={() => setEditingApplication(null)}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onSelect={(e) => {
                            e.preventDefault();
                            setDeletingApplicationId(application.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog 
        open={!!deletingApplicationId} 
        onOpenChange={(open) => !open && setDeletingApplicationId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job application record. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deletingApplicationId && handleDeleteApplication(deletingApplicationId)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingApplication} onOpenChange={(open) => !open && setEditingApplication(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Job Application</DialogTitle>
          </DialogHeader>
          {editingApplication && (
            <JobApplicationForm 
              userId={userId} 
              existingApplication={editingApplication}
              onSuccess={handleApplicationSuccess}
              onCancel={() => setEditingApplication(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobApplicationsList;
