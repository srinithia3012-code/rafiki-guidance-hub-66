
import React, { useState } from "react";
import { JobApplication, deleteJobApplication } from "@/services/career";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";
import JobApplicationsTable from "./JobApplicationsTable";
import JobApplicationsEmptyState from "./JobApplicationsEmptyState";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

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
        <JobApplicationsEmptyState />
      ) : (
        <JobApplicationsTable 
          applications={applications}
          onEditApplication={setEditingApplication}
          onDeleteApplication={setDeletingApplicationId}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog 
        isOpen={!!deletingApplicationId} 
        onOpenChange={(open) => !open && setDeletingApplicationId(null)}
        onConfirm={() => deletingApplicationId && handleDeleteApplication(deletingApplicationId)}
        title="Are you sure?"
        description="This will permanently delete this job application record. This action cannot be undone."
      />

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
