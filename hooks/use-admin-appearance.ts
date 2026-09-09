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

  const update = React.useCallback((patch: Partial<AdminAppearance>) => {
    setAppearance((prev) => {
      const next = { ...prev, ...patch };
      writeAppearance(next);
      return next;
    });
  }, []);

  const reset = React.useCallback(() => {
    writeAppearance(DEFAULT_APPEARANCE);
    setAppearance(DEFAULT_APPEARANCE);
  }, []);

  return { appearance, hydrated, update, reset };
}
