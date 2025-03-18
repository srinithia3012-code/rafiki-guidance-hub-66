
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickAccessCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  content: string;
  linkTo: string;
  linkText: string;
}

const QuickAccessCard = ({
  icon: Icon,
  iconColor,
  title,
  description,
  content,
  linkTo,
  linkText,
}: QuickAccessCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <Icon className={`mr-2 h-5 w-5 ${iconColor}`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{content}</p>
        <Button asChild className="w-full">
          <Link to={linkTo}>{linkText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickAccessCard;
