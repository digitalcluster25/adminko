import { AppTopbar } from "@/components/app-topbar";

export function ScreenPlaceholder({
  title,
  status,
  note,
}: {
  title: string;
  status?: string;
  note?: string;
}) {
  return (
    <>
      <AppTopbar title={title} />
      <main className="flex flex-1 flex-col items-start gap-3 p-6">
        <div className="rounded-lg border border-dashed border-border bg-card px-5 py-8 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{title} — экран в сборке</p>
          {status && <p className="mt-1">{status}</p>}
          {note && <p className="mt-3 max-w-xl">{note}</p>}
          <p className="mt-3 text-xs">
            Спецификация — в Outline, документ «HWS Adminko — Экранные спецификации».
          </p>
        </div>
      </main>
    </>
  );
}
