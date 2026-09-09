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
        {/* Отступ 25px от реального края экрана со всех сторон.
            transform на внутреннем контейнере обязателен: сайдбар shadcn —
            position:fixed, и без своего containing block он позиционируется
            относительно окна, то есть прилипает к краю экрана и игнорирует
            отступ (а контент при этом уезжает внутрь, давая щель между
            сайдбаром и контентом). Элемент с transform становится containing
            block для fixed-потомков, поэтому сайдбар встаёт ровно в границы
            панели. */}
        <AppBackground>
          <div className="box-border h-svh w-full p-[25px]">
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-sidebar [transform:translateZ(0)]">
              <SidebarProvider className="h-full min-h-0 w-full">
                <AppSidebar />
                <SidebarInset className="h-full min-h-0 overflow-y-auto">
                  {children}
                </SidebarInset>
              </SidebarProvider>
            </div>
          </div>
        </AppBackground>
      </body>
    </html>
  );
}
