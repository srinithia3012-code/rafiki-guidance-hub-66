
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ResultsLoading: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Assessment Results</CardTitle>
        <CardDescription>Loading your assessment results...</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rafiki-600"></div>
      </CardContent>
    </Card>
  );
};

export default ResultsLoading;
