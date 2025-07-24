import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { useEffect } from "react";

type SnackbarProps = {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  description?: string;
  duration?: number;
};

export function Snackbar({
  open,
  onClose,
  type,
  title,
  description,
  duration = 5000,
}: SnackbarProps) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // limpieza
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 max-w-sm"
      role="alert"
      onClick={onClose}
    >
      <Alert
        variant={type === "error" ? "destructive" : "success"}
        className="cursor-pointer shadow-lg"
      >
        {type === "success" ? (
          <CheckCircle2Icon className="h-5 w-5" />
        ) : (
          <AlertCircleIcon className="h-5 w-5" />
        )}
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    </div>
  );
}
