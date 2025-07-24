import { Loader2 } from "lucide-react";

interface SpinnerOverlayProps {
  height?: number | string;
  className?: string;
  message?: string;
}

export function SpinnerOverlay({
  height = 200,
  className = "",
   message,
}: SpinnerOverlayProps) {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ height }}
    >
      <div className="absolute inset-0 bg-white/70 dark:bg-background/80 z-10" />
      
      <div className="z-20 flex flex-row items-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
}
