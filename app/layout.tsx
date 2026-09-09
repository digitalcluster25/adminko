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
        <SidebarProvider>
          <AppSidebar />
          {/* bg-transparent: у SidebarInset по умолчанию непрозрачный
              bg-background, который перекрывает fixed-слой градиента
              AppBackground (позиционированный потомок с z-index:-10
              всё равно красится ПОСЛЕ собственного фона позиционированного
              предка без своего stacking context — поэтому предок обязан
              быть прозрачным). */}
          <SidebarInset className="bg-transparent">
            <AppBackground>{children}</AppBackground>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
