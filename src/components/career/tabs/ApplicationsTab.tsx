
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { JobApplication } from "@/services/career";
import JobApplicationsList from "@/components/career/JobApplicationsList";

interface ApplicationsTabProps {
  isCheckingAuth: boolean;
  isLoading: boolean;
  user: any | null;
  jobApplications: JobApplication[];
  refreshData: () => void;
}

const ApplicationsTab: React.FC<ApplicationsTabProps> = ({
  isCheckingAuth,
  isLoading,
  user,
  jobApplications,
  refreshData,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Application Tracker</CardTitle>
          <CardDescription>
            Keep track of your job applications, interviews, and follow-ups
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCheckingAuth || isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : !user ? (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Sign in to track your job applications</p>
              <Button asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
            </div>
          ) : (
            <JobApplicationsList 
              userId={user.id}
              applications={jobApplications}
              onApplicationChange={refreshData}
            />
          )}
          
          {user && jobApplications.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-3">Application Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Total Applications</div>
                  <div className="text-2xl font-bold">{jobApplications.length}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Interviews Scheduled</div>
                  <div className="text-2xl font-bold">
                    {jobApplications.filter(app => 
                      ["Interview Scheduled", "Interview Completed", "Technical Interview", "Final Interview"].includes(app.status)
                    ).length}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">Response Rate</div>
                  <div className="text-2xl font-bold">
                    {jobApplications.length === 0 ? "0%" : 
                      `${Math.round((jobApplications.filter(app => 
                        !["Application Submitted"].includes(app.status)
                      ).length / jobApplications.length) * 100)}%`
                    }
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsTab;
