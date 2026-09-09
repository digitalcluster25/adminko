// Хранилище внешнего вида админки — сейчас localStorage (мок), позже
// переедет на реальный бэкенд/БД (см. "Настройки админко"). Ключи и форма
// данных намеренно простые, чтобы миграция на API была прямой заменой
// реализации без изменения интерфейса хука/компонентов.

export type AdminAppearance = {
  backgroundImage: string | null; // data URL
  backgroundColor: string | null; // hex, например "#f4f4f5"
};

const STORAGE_KEY = "hws-adminko:appearance";

export const DEFAULT_APPEARANCE: AdminAppearance = {
  backgroundImage: null,
  backgroundColor: null,
};

export function readAppearance(): AdminAppearance {
  if (typeof window === "undefined") return DEFAULT_APPEARANCE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_APPEARANCE;
    const parsed = JSON.parse(raw);
    return {
      backgroundImage: typeof parsed.backgroundImage === "string" ? parsed.backgroundImage : null,
      backgroundColor: typeof parsed.backgroundColor === "string" ? parsed.backgroundColor : null,
    };
  } catch {
    return DEFAULT_APPEARANCE;
  }
}

export function writeAppearance(appearance: AdminAppearance) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appearance));
  window.dispatchEvent(new CustomEvent(STORAGE_EVENT));
}

export const STORAGE_EVENT = "hws-adminko:appearance-change";
