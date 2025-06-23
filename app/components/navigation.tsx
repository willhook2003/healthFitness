import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { cn } from "~/lib/utils";

export function MainNavigation() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavigationMenu className="max-w-none w-full">
      <NavigationMenuList className="space-x-4">
        <NavigationMenuItem>
          <Link
            to="/tecnicos"
            className={cn(
              navigationMenuTriggerStyle(),
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/tecnicos")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            Técnicos
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            to="/transportes"
            className={cn(
              navigationMenuTriggerStyle(),
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/transportes")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            Transportes
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            to="/partes"
            className={cn(
              navigationMenuTriggerStyle(),
              "text-sm font-medium transition-colors hover:text-primary",
              isActive("/partes")
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            )}
          >
            Partes
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
