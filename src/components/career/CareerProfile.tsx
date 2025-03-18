
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CareerProfile } from "@/services/career";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CareerProfileForm from "@/components/career/CareerProfileForm";
import { Skeleton } from "@/components/ui/skeleton";

interface CareerProfileSectionProps {
  isCheckingAuth: boolean;
  isLoading: boolean;
  user: any;
  careerProfile: CareerProfile | null;
  isProfileFormOpen: boolean;
  setIsProfileFormOpen: (open: boolean) => void;
  handleProfileSuccess: () => void;
}

const CareerProfileSection: React.FC<CareerProfileSectionProps> = ({
  isCheckingAuth,
  isLoading,
  user,
  careerProfile,
  isProfileFormOpen,
  setIsProfileFormOpen,
  handleProfileSuccess,
}) => {
  if (isCheckingAuth || isLoading) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!careerProfile) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Complete Your Career Profile</CardTitle>
          <CardDescription>
            Set up your profile to get personalized career recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Your career profile helps us tailor job recommendations and learning resources to your interests and skills.</p>
          <Button onClick={() => setIsProfileFormOpen(true)}>Create Profile</Button>
          
          <Dialog open={isProfileFormOpen} onOpenChange={setIsProfileFormOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Your Career Profile</DialogTitle>
              </DialogHeader>
              {user && (
                <CareerProfileForm 
                  userId={user.id} 
                  onSuccess={handleProfileSuccess}
                />
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Your Career Profile</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setIsProfileFormOpen(true)}>Edit Profile</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Education Level</h3>
            <p>{careerProfile.education_level || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Interests</h3>
            <div className="flex flex-wrap gap-1">
              {careerProfile.interests.length > 0 ? (
                careerProfile.interests.map((interest) => (
                  <span key={interest} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {interest}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No interests specified</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-1">
              {careerProfile.skills.length > 0 ? (
                careerProfile.skills.map((skill) => (
                  <span key={skill} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills specified</span>
              )}
            </div>
          </div>
        </div>
        
        <Dialog open={isProfileFormOpen} onOpenChange={setIsProfileFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Your Career Profile</DialogTitle>
            </DialogHeader>
            {user && (
              <CareerProfileForm 
                userId={user.id}
                existingProfile={careerProfile}
                onSuccess={handleProfileSuccess}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CareerProfileSection;
