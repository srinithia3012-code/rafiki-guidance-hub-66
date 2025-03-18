
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { JOB_APPLICATION_STATUSES, JobApplication, createJobApplication, updateJobApplication } from "@/services/career";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  application_date: z.date({ required_error: "Application date is required" }),
  status: z.string().min(1, "Status is required"),
  next_steps: z.string().optional(),
  notes: z.string().optional(),
});

interface JobApplicationFormProps {
  userId: string;
  existingApplication?: JobApplication;
  onSuccess?: (application: JobApplication) => void;
  onCancel?: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({
  userId,
  existingApplication,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const isEditing = !!existingApplication;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: existingApplication?.company_name || "",
      position: existingApplication?.position || "",
      application_date: existingApplication?.application_date 
        ? new Date(existingApplication.application_date) 
        : new Date(),
      status: existingApplication?.status || JOB_APPLICATION_STATUSES[0],
      next_steps: existingApplication?.next_steps || "",
      notes: existingApplication?.notes || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const applicationData = {
        company_name: values.company_name,
        position: values.position,
        application_date: format(values.application_date, "yyyy-MM-dd"),
        status: values.status,
        next_steps: values.next_steps,
        notes: values.notes,
      };
      
      let application;
      
      if (isEditing && existingApplication) {
        application = await updateJobApplication(existingApplication.id, applicationData);
      } else {
        application = await createJobApplication(userId, applicationData);
      }
      
      if (application && onSuccess) {
        onSuccess(application);
      }
    } catch (error) {
      console.error("Error submitting job application:", error);
      toast({
        variant: "destructive",
        title: "Failed to save application",
        description: "Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Enter job position" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="application_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Application Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select application status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {JOB_APPLICATION_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="next_steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Next Steps</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Follow up by July 15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Additional notes about the application" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit">
            {isEditing ? "Update Application" : "Save Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default JobApplicationForm;
