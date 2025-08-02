import { Button } from "~/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const defaultIcons: Record<string, LucideIcon> = {
  Editar: Edit,
  Eliminar: Trash2,
};

export interface TableAction<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: LucideIcon;
  variant?: "default" | "outline" | "ghost" | "destructive";
}

interface DataTableActionsProps<T> {
  item: T;
  actions: TableAction<T>[];
}

export function DataTableActions<T>({ item, actions }: DataTableActionsProps<T>) {
  return (
    <div className="flex justify-end space-x-2">
      {actions.map(({ label, icon, onClick, variant = "outline" }) => {
        const Icon = icon ?? defaultIcons[label];
        return (
          <Button
            key={label}
            size="sm"
            variant={variant}
            onClick={() => onClick(item)}
            className="flex items-center gap-1"
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span className="sr-only">{label}</span>
          </Button>
        );
      })}
    </div>
  );
}
