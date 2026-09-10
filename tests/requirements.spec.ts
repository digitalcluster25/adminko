import { test, expect } from "@playwright/test";

// Каждый тест — дословное требование, которое Andy сформулировал.
// Ломать их нельзя: если правка ломает тест — правка неверная, а не тест.

test.describe("Отступ 25px от края экрана", () => {
  test("панель отступает на 25px со всех четырёх сторон, включая сайдбар", async ({ page }) => {
    await page.goto("/");
    const box = await page.evaluate(() => {
      const sidebar = document.querySelector('[data-slot="sidebar-container"]')!.getBoundingClientRect();
      const inset = document.querySelector('[data-slot="sidebar-inset"]')!.getBoundingClientRect();
      return {
        left: sidebar.left,
        top: sidebar.top,
        bottom: window.innerHeight - sidebar.bottom,
        right: window.innerWidth - inset.right,
        gapSidebarToContent: inset.left - sidebar.right,
      };
    });
    // 25px отступ + 1px рамка панели.
    expect(box.left).toBeGreaterThanOrEqual(25);
    expect(box.left).toBeLessThanOrEqual(26);
    expect(box.top).toBeGreaterThanOrEqual(25);
    expect(box.top).toBeLessThanOrEqual(26);
    expect(box.bottom).toBeGreaterThanOrEqual(25);
    expect(box.bottom).toBeLessThanOrEqual(26);
    expect(box.right).toBeGreaterThanOrEqual(25);
    expect(box.right).toBeLessThanOrEqual(26);
    // Щели между сайдбаром и контентом быть не должно.
    expect(box.gapSidebarToContent).toBe(0);
  });
});

test.describe("Логотип в сайдбаре", () => {
  test("текст 'Adminko V2' одной строкой, без иконок", async ({ page }) => {
    await page.goto("/");
    const header = page.locator('[data-slot="sidebar-header"]');
    await expect(header).toHaveText("Adminko V2");
    expect(await header.locator("svg").count()).toBe(0);
  });

  test("вес 700 и размер 18px", async ({ page }) => {
    await page.goto("/");
    const logo = page.locator('[data-slot="sidebar-header"] a');
    await expect(logo).toHaveCSS("font-weight", "700");
    await expect(logo).toHaveCSS("font-size", "18px");
  });

  test("не кнопка: без фона и без обёртки sidebar-menu-button", async ({ page }) => {
    await page.goto("/");
    const header = page.locator('[data-slot="sidebar-header"]');
    expect(await header.locator('[data-slot="sidebar-menu-button"]').count()).toBe(0);
    await expect(header.locator("a")).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("ведёт на дашборд", async ({ page }) => {
    await page.goto("/admin-settings");
    await page.locator('[data-slot="sidebar-header"] a').click();
    await expect(page).toHaveURL("http://localhost:3010/");
  });
});

test.describe("Фон", () => {
  test("поверх фонового изображения нет дополнительных слоёв", async ({ page }) => {
    await page.goto("/admin-settings");
    await page.evaluate(() => {
      const png =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
      localStorage.setItem(
        "hws-adminko:appearance",
        JSON.stringify({ backgroundImage: png, backgroundColor: null })
      );
    });
    await page.reload();

    // Ждём, пока картинка реально применится (гидратация из localStorage),
    // иначе замер попадает на дефолтный градиент.
    await expect
      .poll(() =>
        page.evaluate(
          () => getComputedStyle(document.querySelector("div[aria-hidden]")!).backgroundImage
        )
      )
      .toContain("url(");

    const layers = await page.evaluate(() =>
      [...document.querySelectorAll("div[aria-hidden]")].map((d) => {
        const cs = getComputedStyle(d);
        return { bg: cs.backgroundColor, filter: cs.backdropFilter };
      })
    );
    // Ровно один слой — сам фон, без подложки и без блюра.
    expect(layers).toHaveLength(1);
    expect(layers[0].bg).toBe("rgba(0, 0, 0, 0)");
    expect(layers[0].filter).toBe("none");
  });

  test("на карточках и на самой панели нет теней (flat-стиль)", async ({ page }) => {
    for (const url of ["/", "/admin-settings"]) {
      await page.goto(url);
      const shadows = await page.evaluate(() => {
        // Видимая тень = есть цвет с ненулевой альфой и ненулевые смещение/размытие.
        const visible = (v: string) =>
          v !== "none" &&
          /rgba?\((?:[^)]*?,\s*(?:0?\.\d+|[1-9][\d.]*)\))\s+(?!0px 0px 0px 0px)/.test(v);
        const targets = [
          ...document.querySelectorAll('[data-slot="card"]'),
          ...document.querySelectorAll('[data-slot="sidebar-wrapper"]'),
        ];
        return targets
          .map((el) => ({ slot: el.getAttribute("data-slot"), shadow: getComputedStyle(el).boxShadow }))
          .filter((x) => visible(x.shadow));
      });
      expect(shadows, `тени на ${url}`).toEqual([]);
    }
  });
});

test.describe("Настройки админко (localStorage-мок)", () => {
  test("цвет применяется, переживает переход и сбрасывается", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    await page.goto("/admin-settings");
    await page.locator('input[placeholder*="Не задан"]').fill("#e11d48");
    const bg = () =>
      page.evaluate(
        () => getComputedStyle(document.querySelector("div[aria-hidden]")!).backgroundImage
      );
    await expect.poll(bg).toContain("rgba(225, 29, 72");

    await page.goto("/");
    await expect.poll(bg).toContain("rgba(225, 29, 72");

    await page.goto("/admin-settings");
    await page.getByText("Сбросить к умолчаниям").click();
    await expect.poll(bg).toContain("oklch");

    expect(errors).toEqual([]);
  });
});
