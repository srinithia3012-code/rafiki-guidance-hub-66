import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn, FieldValues } from "react-hook-form";

interface FormSelectProps<TFieldValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFieldValues>;
  name: keyof TFieldValues | string;
  label: string;
  placeholder?: string;
  options: string[];
}

const FormSelect = <TFieldValues extends FieldValues = FieldValues>({ form, name, label, placeholder, options }: FormSelectProps<TFieldValues>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>{option}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
