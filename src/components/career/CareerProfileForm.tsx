
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { CareerProfile, createCareerProfile, updateCareerProfile } from "@/services/career";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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

const formSchema = z.object({
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  skills: z.array(z.string()).min(1, "Select at least one skill"),
  education_level: z.string().min(1, "Select your education level"),
  preferred_industries: z.array(z.string()).min(1, "Select at least one industry"),
});

interface CareerProfileFormProps {
  userId: string;
  existingProfile?: CareerProfile | null;
  onSuccess?: (profile: CareerProfile) => void;
}

const INTERESTS_OPTIONS = [
  "Data Analysis",
  "Programming",
  "Design",
  "Research",
  "Writing",
  "Marketing",
  "Management",
  "Teaching",
  "Healthcare",
  "Finance",
];

const SKILLS_OPTIONS = [
  "Python",
  "JavaScript",
  "Data Visualization",
  "Statistical Analysis",
  "UX/UI Design",
  "Project Management",
  "Communication",
  "Problem Solving",
  "Leadership",
  "Teamwork",
];

const EDUCATION_LEVELS = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certification",
];

const INDUSTRY_OPTIONS = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Media",
  "Government",
  "Nonprofit",
  "Consulting",
];

const CareerProfileForm: React.FC<CareerProfileFormProps> = ({
  userId,
  existingProfile,
  onSuccess,
}) => {
  const { toast } = useToast();
  const isEditing = !!existingProfile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interests: existingProfile?.interests || [],
      skills: existingProfile?.skills || [],
      education_level: existingProfile?.education_level || "",
      preferred_industries: existingProfile?.preferred_industries || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      let profile;
      
      if (isEditing && existingProfile) {
        profile = await updateCareerProfile(existingProfile.id, values);
      } else {
        profile = await createCareerProfile(userId, values);
      }
      
      if (profile && onSuccess) {
        onSuccess(profile);
      }
    } catch (error) {
      console.error("Error submitting career profile:", error);
      toast({
        variant: "destructive",
        title: "Failed to save profile",
        description: "Please try again later.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="education_level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Education Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your education level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EDUCATION_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="interests"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Interests</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {INTERESTS_OPTIONS.map((interest) => (
                  <FormField
                    key={interest}
                    control={form.control}
                    name="interests"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={interest}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(interest)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, interest])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== interest
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {interest}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="skills"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Skills</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {SKILLS_OPTIONS.map((skill) => (
                  <FormField
                    key={skill}
                    control={form.control}
                    name="skills"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={skill}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(skill)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, skill])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== skill
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {skill}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferred_industries"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Preferred Industries</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRY_OPTIONS.map((industry) => (
                  <FormField
                    key={industry}
                    control={form.control}
                    name="preferred_industries"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={industry}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(industry)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, industry])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== industry
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">
                            {industry}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isEditing ? "Update Profile" : "Create Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default CareerProfileForm;
