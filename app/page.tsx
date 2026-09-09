import { AppTopbar } from "@/components/app-topbar";
import { dashboardStats } from "@/lib/mock/data";

const TILES = [
  { label: "Товаров всего", value: dashboardStats.productsTotal },
  { label: "Опубликовано", value: dashboardStats.productsPublished },
  { label: "Категорий", value: dashboardStats.categoriesTotal },
  { label: "Брендов", value: dashboardStats.brandsTotal },
  { label: "Пользователей", value: dashboardStats.usersTotal },
];

export default function DashboardPage() {
  return (
    <>
      <AppTopbar title="Панель управления" />
      <main className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {TILES.map((tile) => (
            <div key={tile.label} className="rounded-lg border border-border bg-card p-4">
              <div className="text-2xl font-semibold text-foreground">{tile.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{tile.label}</div>
            </div>
          ))}
        </div>

        <div className="rounded-lg border border-dashed border-border bg-card p-5 text-sm text-muted-foreground">
          Каркас Админко 2.0: сайдбар и группы меню собраны по решениям из ТЗ
          («Магазин» вместо разрозненных пунктов, «Пользователи» в
          «Администрировании», без группы «Парсинг и обработка»). Данные на
          этой и остальных страницах — мок (<code>lib/mock/data.ts</code>),
          готовы к замене на реальные API-вызовы.
        </div>
      </main>
    </>
  );
}
