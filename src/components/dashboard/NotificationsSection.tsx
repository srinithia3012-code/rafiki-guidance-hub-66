
import React from "react";
import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  read: boolean;
}

interface NotificationsSectionProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
}

const NotificationsSection = ({ notifications, onMarkAsRead }: NotificationsSectionProps) => {
  return (
    <Card className="mb-10">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5 text-yellow-500" />
          Notifications
        </CardTitle>
        <CardDescription>Stay updated with the latest information</CardDescription>
      </CardHeader>
      <CardContent>
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-gray-50" : "bg-blue-50 border-blue-100"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{notification.date}</p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onMarkAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-4">No new notifications</p>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsSection;
