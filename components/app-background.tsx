"use client";

import * as React from "react";
import { useAdminAppearance } from "@/hooks/use-admin-appearance";
import { hexToRgba } from "@/lib/utils";

// Фон всей админки. По умолчанию — мягкий градиент на токенах темы (работает
// одинаково в светлой и тёмной теме без ручной настройки). Если в "Настройки
// админко" выбрано изображение и/или цвет — используются они. Настройки
// живут в localStorage (см. lib/appearance-store.ts) — при подключении
// реального бэкенда этот компонент менять не придётся, поменяется только
// источник данных внутри useAdminAppearance.
export function AppBackground({ children }: { children: React.ReactNode }) {
  const { appearance, hydrated } = useAdminAppearance();

  const layerStyle: React.CSSProperties = React.useMemo(() => {
    if (appearance.backgroundImage) {
      return {
        backgroundImage: `url(${appearance.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    if (appearance.backgroundColor) {
      const soft = hexToRgba(appearance.backgroundColor, 0.28);
      return {
        // background-image принимает только <image> (градиенты/url), а не
        // цвет напрямую — поэтому var(--background) идёт отдельным свойством
        // backgroundColor, а не третьим элементом списка градиентов (иначе
        // браузер отбрасывает всё значение как невалидное).
        backgroundImage: `radial-gradient(ellipse 120% 80% at 100% 0%, ${soft ?? appearance.backgroundColor}, transparent 60%)`,
        backgroundColor: "var(--background)",
      };
    }

    // По умолчанию (без настроек пользователя) — двухцветный мягкий градиент
    // на chart-токенах темы: они единственные в базовой neutral-палитре
    // shadcn несут цвет (chart-1..5), поэтому градиент заметен и в светлой,
    // и в тёмной теме без какой-либо ручной настройки.
    return {
      backgroundImage:
        "radial-gradient(ellipse 90% 60% at 100% 0%, color-mix(in oklch, var(--chart-1) 16%, transparent), transparent 60%), " +
        "radial-gradient(ellipse 90% 70% at 0% 100%, color-mix(in oklch, var(--chart-2) 14%, transparent), transparent 60%)",
      backgroundColor: "var(--background)",
    };
  }, [appearance.backgroundImage, appearance.backgroundColor]);

  return (
    <div className="relative flex min-h-svh flex-1 flex-col">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-300"
        style={{ ...layerStyle, opacity: hydrated ? 1 : 0 }}
      />
      {children}
    </div>
  );
}
