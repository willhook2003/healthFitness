import { Button } from "~/components/ui/button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
}

export function ErrorState({
  message = "Ocurrió un error al cargar los datos.",
  onRetry,
  onBack,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
      <p className="text-sm text-muted-foreground">{message}</p>
      <div className="flex gap-2">
        {onRetry && (
          <Button variant="default" onClick={onRetry}>
            Reintentar
          </Button>
        )}
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            Volver
          </Button>
        )}
      </div>
    </div>
  );
}
