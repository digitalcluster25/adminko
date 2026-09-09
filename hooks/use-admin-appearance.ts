"use client";

import * as React from "react";
import {
  type AdminAppearance,
  DEFAULT_APPEARANCE,
  readAppearance,
  writeAppearance,
  STORAGE_EVENT,
} from "@/lib/appearance-store";

/**
 * Мок-хранилище внешнего вида админки на localStorage. Интерфейс хука
 * рассчитан на прямую замену на запрос к реальному API позже — компоненты,
 * которые его используют, менять не придётся.
 *
 * Поток данных однонаправленный: update/reset только ПИШУТ в хранилище, а
 * локальное состояние всех подписчиков обновляется из события хранилища.
 * Побочных эффектов внутри апдейтера setState нет — иначе React ругается
 * "Cannot update a component while rendering a different component", потому
 * что апдейтер выполняется в фазе рендера, а запись синхронно уведомляет
 * другие компоненты (AppBackground).
 */
export function useAdminAppearance() {
  const [appearance, setAppearance] = React.useState<AdminAppearance>(DEFAULT_APPEARANCE);
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    // Значение появляется только в браузере (localStorage) — обычная
    // гидратация после маунта, как в use-mobile.ts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAppearance(readAppearance());
    setHydrated(true);

    const onChange = () => setAppearance(readAppearance());
    window.addEventListener(STORAGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(STORAGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  // Источник правды — само хранилище, поэтому читаем актуальное значение
  // перед записью, а не полагаемся на состояние из замыкания.
  const update = React.useCallback((patch: Partial<AdminAppearance>) => {
    writeAppearance({ ...readAppearance(), ...patch });
  }, []);

  const reset = React.useCallback(() => {
    writeAppearance(DEFAULT_APPEARANCE);
  }, []);

  return { appearance, hydrated, update, reset };
}
