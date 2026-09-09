"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppTopbar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="h-5 w-px bg-border" />
      <h1 className="text-sm font-medium text-foreground">{title ?? "HWS Adminko"}</h1>
      <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
        Мок-данные · boss
      </div>
    </header>
  );
}
