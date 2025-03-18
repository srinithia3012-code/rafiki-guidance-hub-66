
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

interface FormActionsProps {
  isEditing?: boolean;
  onCancel?: () => void;
  submitText?: string;
  cancelText?: string;
  className?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  isEditing = false,
  onCancel,
  submitText,
  cancelText = "Cancel",
  className = "flex justify-end space-x-2 pt-2",
}) => {
  return (
    <div className={className}>
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="mr-2 h-4 w-4" />
          {cancelText}
        </Button>
      )}
      <Button type="submit">
        <Check className="mr-2 h-4 w-4" />
        {submitText || (isEditing ? "Update" : "Save")}
      </Button>
    </div>
  );
};

export default FormActions;
