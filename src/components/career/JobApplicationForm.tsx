import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { JOB_APPLICATION_STATUSES, JobApplication, createJobApplication, updateJobApplication } from "@/services/career";
import { Form } from "@/components/ui/form";
import { format } from "date-fns";
import FormTextInput from "./FormTextInput";
import FormDatePicker from "./FormDatePicker";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import FormActions from "./FormActions";

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
        <FormTextInput 
          form={form}
          name="company_name"
          label="Company Name"
          placeholder="Enter company name"
        />

        <FormTextInput 
          form={form}
          name="position"
          label="Position"
          placeholder="Enter job position"
        />

        <FormDatePicker 
          form={form}
          name="application_date"
          label="Application Date"
        />

        <FormSelect 
          form={form}
          name="status"
          label="Status"
          placeholder="Select application status"
          options={JOB_APPLICATION_STATUSES}
        />

        <FormTextInput 
          form={form}
          name="next_steps"
          label="Next Steps"
          placeholder="E.g., Follow up by July 15"
        />

        <FormTextarea 
          form={form}
          name="notes"
          label="Notes"
          placeholder="Additional notes about the application"
          className="min-h-[100px]"
        />

        <FormActions 
          isEditing={isEditing}
          onCancel={onCancel}
          submitText={isEditing ? "Update Application" : "Save Application"}
        />
      </form>
    </Form>
  );
};

export default JobApplicationForm;
