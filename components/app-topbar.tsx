import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <h1 className="text-sm font-medium text-foreground">{title ?? "HWS Adminko"}</h1>
      <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
        Мок-данные · boss
      </div>
    </header>
  );
}
