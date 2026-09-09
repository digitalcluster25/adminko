"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      <div className="flex min-h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  return (
    <button
      type="button"
      onClick={() => {
        setCollapsed(!collapsed);
        setMobileOpen(!mobileOpen);
      }}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        className
      )}
      aria-label="Переключить боковую панель"
    >
      <PanelLeft className="h-4 w-4" />
    </button>
  );
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { collapsed, mobileOpen, setMobileOpen } = useSidebar();
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={cn(
          "z-50 flex h-screen flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear",
          "fixed inset-y-0 left-0 md:sticky md:top-0",
          collapsed ? "w-[64px]" : "w-[260px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        data-collapsed={collapsed}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex h-14 items-center gap-2 border-b border-border px-3">{children}</div>;
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 overflow-y-auto overflow-x-hidden py-2">{children}</div>;
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5">{children}</div>;
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  const { collapsed } = useSidebar();
  if (collapsed) return null;
  return (
    <div className="px-2 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {children}
    </div>
  );
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <ul className="flex flex-col gap-0.5">{children}</ul>;
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function SidebarMenuButton({
  asChild,
  isActive,
  children,
  className,
}: {
  asChild?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const { collapsed } = useSidebar();
  const cls = cn(
    "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-colors",
    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    isActive && "bg-sidebar-accent font-medium text-sidebar-accent-foreground",
    collapsed && "justify-center px-0",
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string }>,
      { className: cn((children.props as { className?: string }).className, cls) }
    );
  }

  return <div className={cls}>{children}</div>;
}

export function SidebarRail() {
  return null;
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen flex-1 flex-col bg-background">{children}</div>;
}

export { useSidebar };
