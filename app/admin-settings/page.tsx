"use client";

import * as React from "react";
import { AppTopbar } from "@/components/app-topbar";
import { useAdminAppearance } from "@/hooks/use-admin-appearance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Image as ImageIcon, Trash2 } from "lucide-react";

// Настройки внешнего вида самой панели Админко (фон и акцентный цвет) —
// не настройки магазина. Сейчас данные живут в localStorage
// (lib/appearance-store.ts), позже переедут на реальный бэкенд без смены
// интерфейса этой страницы.
export default function AdminSettingsPage() {
  const { appearance, hydrated, update, reset } = useAdminAppearance();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        update({ backgroundImage: reader.result });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <>
      <AppTopbar title="Настройки админко" />
      <main className="flex flex-1 flex-col gap-4 p-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Фоновое изображение</CardTitle>
              <CardDescription>
                Загрузите картинку — она станет фоном всей панели управления.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon />
                  Загрузить изображение
                </Button>
                {appearance.backgroundImage && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => update({ backgroundImage: null })}
                  >
                    <Trash2 />
                    Убрать изображение
                  </Button>
                )}
              </div>

              {appearance.backgroundImage && (
                <div className="overflow-hidden rounded-lg border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element -- превью data-URL из localStorage, next/image тут не нужен */}
                  <img
                    src={appearance.backgroundImage}
                    alt="Фон панели управления"
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Акцентный цвет</CardTitle>
              <CardDescription>
                Используется для мягкого градиента на фоне, если изображение
                не выбрано.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Label htmlFor="accent-color" className="sr-only">
                  Цвет фона
                </Label>
                <input
                  id="accent-color"
                  type="color"
                  value={appearance.backgroundColor ?? "#6366f1"}
                  onChange={(e) => update({ backgroundColor: e.target.value })}
                  className="size-9 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
                />
                <Input
                  value={appearance.backgroundColor ?? ""}
                  placeholder="Не задан — используется цвет темы"
                  onChange={(e) => {
                    const v = e.target.value.trim();
                    update({ backgroundColor: v.length ? v : null });
                  }}
                  className="max-w-40"
                />
                {appearance.backgroundColor && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => update({ backgroundColor: null })}
                  >
                    <Trash2 />
                    Сбросить
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Сброс оформления</CardTitle>
            <CardDescription>
              Вернуть фон панели к значению по умолчанию (изображение и цвет
              будут удалены).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button type="button" variant="outline" onClick={reset}>
              Сбросить к умолчаниям
            </Button>
          </CardContent>
        </Card>

        <div className="rounded-lg border border-dashed border-border bg-card p-4 text-xs text-muted-foreground">
          {hydrated
            ? "Настройки хранятся в localStorage браузера (мок). При подключении бэкенда эта страница переключится на реальный API без изменения интерфейса."
            : "Загрузка сохранённых настроек…"}
        </div>
      </main>
    </>
  );
}
