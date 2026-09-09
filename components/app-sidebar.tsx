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
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Settings,
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
  Palette,
  type LucideIcon,
} from "lucide-react";

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
// - "Пользователи" — новый пункт в "Администрировании".
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
  {
    // Отдельная группа — оформление самой панели Админко (localStorage-мок),
    // не путать с "Настройки" выше (настройки магазина).
    title: "Админко",
    items: [
      { href: "/admin-settings", label: "Настройки админко", icon: Palette },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="h-full">
      <SidebarHeader>
        {/* Текстовый логотип, не кнопка: без ссылки, ховера и фона.
            18px = 14px базового текста сайдбара +30%. В свёрнутом
            состоянии скрыт, чтобы не обрезался. */}
        <div className="px-2 py-2 text-[18px] leading-none font-bold group-data-[collapsible=icon]:hidden">
          Adminko V2
        </div>
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
      <SidebarRail />
    </Sidebar>
  );
}

function NavLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const isActive = pathname === item.href;
  const Icon = item.icon;
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
        <Link href={item.href}>
          <Icon />
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
