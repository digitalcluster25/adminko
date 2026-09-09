"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
  Flame,
  BadgeRussianRuble,
  FileText,
  Newspaper,
  Cog,
  Menu,
  House,
  Images,
  ShoppingCart,
  History,
  Tags,
  Users,
  Percent,
  type LucideIcon,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: LucideIcon };
type NavGroup = { title: string; items: NavItem[] };

const UNGROUPED: NavItem[] = [
  { href: "/", label: "Панель управления", icon: LayoutDashboard },
];

// Структура меню — по решениям, зафиксированным в ТЗ "Админко 2.0" и
// "Экранных спецификациях" (2026-09-08–09):
// - группа "Парсинг и обработка" удалена целиком (ТЗ п.1);
// - "Фильтры" как отдельный пункт убран (видимость фильтра — тумблер на Атрибуте);
// - новая группа "Магазин" — Оплата/Доставка (перенесена из "Контента") +
//   Ценообразование (перенесено из "Администрирования"), решение 2026-09-09;
// - "Пользователи" — новый пункт в "Администрировании" (раздел про пользователей).
const NAV_GROUPS: NavGroup[] = [
  {
    title: "Каталоги",
    items: [
      { href: "/catalog", label: "Каталог", icon: Package },
      { href: "/catalog-views", label: "Страница каталога", icon: Package },
      { href: "/posts", label: "Публикации", icon: Newspaper },
    ],
  },
  {
    title: "Таксономия",
    items: [
      { href: "/categories", label: "Категории", icon: FolderTree },
      { href: "/brands", label: "Бренды", icon: BadgeRussianRuble },
      { href: "/attributes", label: "Атрибуты", icon: Tags },
      { href: "/product-settings", label: "Товар", icon: Settings },
    ],
  },
  {
    title: "Контент",
    items: [
      { href: "/pages", label: "Страницы", icon: FileText },
      { href: "/menus", label: "Меню", icon: Menu },
      { href: "/homepage", label: "Главная страница", icon: House },
      { href: "/brand-pages", label: "Страницы брендов", icon: BadgeRussianRuble },
      { href: "/media", label: "Медиа", icon: Images },
    ],
  },
  {
    title: "Магазин",
    items: [
      { href: "/commerce", label: "Оплата / Доставка", icon: ShoppingCart },
      { href: "/pricing", label: "Ценообразование", icon: Percent },
    ],
  },
  {
    title: "Администрирование",
    items: [
      { href: "/users", label: "Пользователи", icon: Users },
      { href: "/settings", label: "Настройки", icon: Cog },
      { href: "/history", label: "История", icon: History },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <Flame className="h-4 w-4" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-none">
            <span className="text-sm font-semibold">HWS Adminko</span>
            <span className="text-xs text-muted-foreground">v2 (мок-данные)</span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {UNGROUPED.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {NAV_GROUPS.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarMenu>
              {group.items.map((item) => (
                <NavLink key={item.href} item={item} pathname={pathname} />
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const { collapsed } = useSidebar();
  const isActive = pathname === item.href;
  const Icon = item.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link href={item.href} title={collapsed ? item.label : undefined}>
          <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
