
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NoResultsFound: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Assessment Results</CardTitle>
        <CardDescription>
          You haven't completed any assessments yet
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center py-6">
        <p className="mb-4">
          Take some assessments to get personalized guidance from Rafiki AI
        </p>
        <Button asChild>
          <a href="/assessments">Take an Assessment</a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoResultsFound;
