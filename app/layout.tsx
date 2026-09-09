import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AppBackground } from "@/components/app-background";

export const metadata: Metadata = {
  title: "HWS Adminko 2.0",
  description: "Новая админка HWS Store — каркас с мок-данными",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="antialiased">
      <body className="font-sans">
        {/* AppBackground — фон на весь физический экран (fixed, вне зависимости
            от вложенности). Внутри — отступ 25px от РЕАЛЬНОГО края экрана со
            всех 4 сторон, в котором сама панель (сайдбар+контент) плавает
            единой карточкой поверх градиента. */}
        <AppBackground>
          <div className="box-border flex h-svh w-full p-[25px]">
            <SidebarProvider className="h-full min-h-0 w-full overflow-hidden rounded-xl border border-border bg-sidebar shadow-sm">
              <AppSidebar />
              <SidebarInset className="h-full min-h-0 overflow-y-auto">
                {children}
              </SidebarInset>
            </SidebarProvider>
          </div>
        </AppBackground>
      </body>
    </html>
  );
}
